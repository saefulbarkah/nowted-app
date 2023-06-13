import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    const data = await prisma.folder.findMany({
      where: { userId: userId },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      title: "ERROR",
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  await prisma.folder.create({
    data: {
      name: body.name,
      userId: body.userId,
    },
  });
  return NextResponse.json({ response: "Create Success" });
}

export async function PUT(req: Request) {
  const body = await req.json();
  await prisma.folder.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json({ response: "Update Success" });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  await prisma.folder.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ msg: "Delete folder success" });
}
