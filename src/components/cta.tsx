import { ArrowRight} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cta() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="rounded-3xl border-border/50 text-center transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Ready to make your server secure?
            </CardTitle>
          </CardHeader>
          <CardContent>
           <Button size="lg" className="rounded-2xl w-full sm:w-auto h-12 px-8 text-base gap-3" asChild>
            <a
              href={process.env.DISCORD_BOT_INVITE_URL ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to your server
              <ArrowRight className="size-4" />
            </a>
          </Button> 
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
