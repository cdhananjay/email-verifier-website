import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrambleText from "./scramble-text";

export default function Hero() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-4 text-center">
        <Badge
          variant="outline"
          className="mb-8 rounded-full px-5 py-4 text-xs tracking-wide"
        >
          Discord Bot &middot; Email Verification
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl">
          The discord bot for your <br />
          <ScrambleText words={["college", "school", "institute", "company"]} />
          's server.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Restrict server access to verified institutional email domains without
          exposing anyone's full identity.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button
            size="lg"
            className="rounded-2xl w-full sm:w-auto h-12 px-8 text-base gap-3"
            asChild
          >
            <a
              href={process.env.DISCORD_BOT_INVITE_URL ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to your server
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
