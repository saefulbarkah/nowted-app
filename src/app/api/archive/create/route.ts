import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { noteId, userId } = body;
    await prisma.archive.create({
      data: {
        noteId,
        userId,
      },
    });
    return NextResponse.json({ msg: "Save to archive success" });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
