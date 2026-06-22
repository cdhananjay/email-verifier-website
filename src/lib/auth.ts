import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { resend } from "./email";
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
          subject: "Your login link.",
          text: `login with this link: ${url}`,
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
