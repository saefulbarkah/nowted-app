import prisma from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    await prisma.archives.delete({
      where: {
        id: body.id
      }
    });
    return NextResponse.json({ msg: 'Delete archive success' });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
