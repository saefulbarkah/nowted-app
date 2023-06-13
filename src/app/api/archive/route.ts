import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId") as string;
    if (!userId) {
      return NextResponse.json({ msg: "Invalid Parameters" });
    }
    const data = await prisma.archive.findMany({
      where: {
        userId: userId,
      },
      include: {
        note: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
