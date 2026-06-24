import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ linked: false });
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: "discord" },
    select: { id: true },
  });

  return Response.json({ linked: !!account });
}
