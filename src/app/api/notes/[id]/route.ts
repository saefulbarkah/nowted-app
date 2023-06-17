import prisma from '@/lib/db';
import { notesSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await notesSchema.validate({ id: body.id });
    const data = await prisma.notes.findUnique({
      where: { id: body.id },
    });
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 400 });
  }
}
