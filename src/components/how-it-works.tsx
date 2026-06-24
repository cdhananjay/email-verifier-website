import Image from "next/image";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Verify your email via magic link.",
    image: "/images/step1.gif",
    step: "01",
  },
  {
    title: "Link your Discord account.",
    image: "/images/step2.gif",
    step: "02",
  },
  {
    title: "Join servers and receive verified roles.",
    image: "/images/step3.gif",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">
          How it works
        </h2>

        <div className="space-y-8 md:space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`flex flex-col items-center gap-8 md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <Card className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={800}
                    height={500}
                    className="w-full object-cover"
                  />
                </Card>
              </div>

              <div className="flex-1 space-y-4">
                <span className="text-6xl font-bold text-muted-foreground/20 select-none">
                  {step.step}
                </span>
                <h3 className="text-xl font-medium leading-relaxed">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
