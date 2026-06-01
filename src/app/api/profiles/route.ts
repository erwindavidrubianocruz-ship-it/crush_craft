import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const occupation = searchParams.get("occupation")?.trim();
  const region = searchParams.get("region")?.trim();

  const profiles = await prisma.profile.findMany({
    where: {
      userId: { not: session.userId },
      ...(occupation
        ? {
            occupation: {
              contains: occupation,
            },
          }
        : {}),
      ...(region
        ? {
            region: {
              contains: region,
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      age: true,
      occupation: true,
      region: true,
      bio: true,
    },
  });

  return NextResponse.json({ profiles });
}
