import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
  const { id, name, content } = body;
  try {
    await prisma.notes.update({
      where: {
        id: id,
      },
      data: {
        name,
        content,
      },
    });
    return NextResponse.json({
      response: 'Note Succesfully updated',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      response: error,
      status: 400,
    });
  }
};
