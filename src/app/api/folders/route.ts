import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.folder.findMany({
      where: { userId: body.userId },
      include: { note: true },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      title: "ERROR",
      status: 500,
    });
  }
}
