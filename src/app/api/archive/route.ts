import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId) {
      return NextResponse.json({ msg: "Invalid Parameters" });
    }
    const data = await prisma.archive.findMany({
      where: {
        userId: body.userId,
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
