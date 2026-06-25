import { Mail, ShieldCheck } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Mail,
    title: "Email Verification",
    description: "Passwordless email login link, no credentials to manage.",
  },
  {
    icon: SiDiscord,
    title: "Safe Discord Linking",
    description: "Discord linking never accesses or stores your Discord email.",
  },
  {
    icon: ShieldCheck,
    title: "Auto-Expiring Data",
    description:
      "All verification data is automatically purged every 24 hours.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">
          Key features
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
                    <Icon className="size-6" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
