import type { Metadata } from "next";
import VerifyClient from "@/components/verify-client";

export const metadata: Metadata = {
  title: "Verify - Email Verifier Discord Bot",
  description: "Verify your email and link your Discord account.",
};

export default function VerifyPage() {
  return (
    <section className="py-2 flex-1 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <VerifyClient />
      </div>
    </section>
  );
}
