import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { emailTemplate, resend } from "./email";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      allowDifferentEmails: true,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async (
        { email, token: _token, url, metadata: _metadata },
        _ctx,
      ) => {
        resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Login link for Email Verifier Discord Bot",
          react: emailTemplate(url),
        });
      },
    }),
  ],
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
});
