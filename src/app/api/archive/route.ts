import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId) {
      return NextResponse.json({ msg: "Invalid Parameters" });
    }
    const data = await prisma.archives.findMany({
      where: {
        user_id: body.user_id,
      },
      include: {
        notes: true,
      },
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
