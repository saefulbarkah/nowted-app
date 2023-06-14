import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   const body = await req.json();
   const data = await prisma.trashes.deleteMany({
      where: {
         user_id: {
            in: body.userId
         },
         folder_id: body.folder_id,
         note_id: body.note_id
      }
   });
   return NextResponse.json(data);
}
