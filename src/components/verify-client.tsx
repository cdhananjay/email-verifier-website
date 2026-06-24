"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export default function VerifyClient() {
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkingDiscord, setLinkingDiscord] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [discordStatus, setDiscordStatus] = useState<{
    linked: boolean;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get("error");
    const errorDescription = params.get("error_description");
    if (errorCode) {
      setLinkError(
        errorDescription ||
          "Failed to link Discord account. Make sure your Discord account has a verified email.",
      );
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      url.searchParams.delete("error_description");
      window.history.replaceState({}, "", url);
    }
  }, []);

  useEffect(() => {
    if (session?.user.emailVerified && discordStatus === null) {
      fetch("/api/user/discord-status")
        .then((res) => res.json())
        .then((data) => setDiscordStatus(data))
        .catch(() => setDiscordStatus({ linked: false }));
    }
  }, [session, discordStatus]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const { error: signInError } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/verify",
      });

      if (signInError) {
        setError(signInError.message ?? "Failed to send login link.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleLinkDiscord = async () => {
    setLinkingDiscord(true);
    setLinkError(null);

    try {
      const { error: linkSocialError } = await authClient.linkSocial({
        provider: "discord",
        callbackURL: "/verify",
        errorCallbackURL: "/verify",
      });

      if (linkSocialError) {
        setLinkError(
          linkSocialError.message ??
            "Failed to link Discord. Make sure your Discord account has a verified email.",
        );
      }
    } catch {
      setLinkError("Something went wrong. Please try again.");
    } finally {
      setLinkingDiscord(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!session || !session.user.emailVerified) {
    if (sent) {
      return (
        <Card className="w-full rounded-3xl">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription className="max-w-sm">
              We sent a login link to{" "}
              <strong className="text-foreground">{email}</strong>. <br /> If
              you don't see it, check your spam folder or try later.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Card className="w-full rounded-3xl">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-xl">Verify your email</CardTitle>
          <CardDescription>
            Enter your email to receive a login link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLink} className="space-y-4 text-left">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={sending}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={sending}
              className="w-full rounded-2xl"
            >
              {sending ? <Spinner /> : null}
              {sending ? "Sending..." : "Send login link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (discordStatus === null) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!discordStatus.linked) {
    return (
      <Card className="w-full rounded-3xl">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-xl">Link Discord</CardTitle>
          <CardDescription>
            Your email is verified. You can link your Discord now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-primary" />
            <span className="truncate">{session.user.email}</span>
          </div>
          <Button
            onClick={handleLinkDiscord}
            disabled={linkingDiscord}
            className="w-full rounded-2xl"
          >
            {linkingDiscord ? <Spinner /> : null}
            {linkingDiscord ? "Connecting..." : "Link Discord"}
          </Button>
          {linkError && <p className="text-sm text-destructive">{linkError}</p>}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-3xl">
      <CardHeader className="items-center text-center">
        <CardTitle className="text-xl">You&apos;re verified</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
          <p className="text-sm font-medium">
            Return back to Discord and run /verify
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild className="w-full rounded-2xl">
            <a
              href="https://discord.com/app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Return to Discord
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button variant="outline" className="w-full rounded-2xl" asChild>
            <Link href="/">
              <ShieldCheck className="size-4" />
              Learn more about the bot
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
