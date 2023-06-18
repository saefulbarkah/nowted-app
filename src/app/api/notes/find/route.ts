import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await prisma.notes.findUnique({
      where: { id: body.id },
      include: {
        folder: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, status: 400 });
  }
}
