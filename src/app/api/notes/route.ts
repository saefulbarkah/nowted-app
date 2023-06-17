import prisma from '@/lib/db';
import { notesSchema } from '@/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, folder_id } = body;
    await notesSchema.validate({ user_id });
    if (!folder_id) {
      const data = await prisma.notes.findMany({
        where: {
          user_id: user_id,
          AND: {
            folder: {
              can_deleted: false,
            },
          },
        },
        include: {
          folder: {
            select: {
              name: true,
              id: true,
              can_deleted: true,
            },
          },
        },
      });
      return NextResponse.json(data);
    }
    const data = await prisma.notes.findMany({
      where: {
        user_id: user_id,
        folder_id: Number(folder_id),
      },
      include: {
        folder: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ status: 400, response: e });
  }
}
