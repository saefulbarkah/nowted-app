import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      await prisma.notes.create({
         data: {
            id: body.id,
            name: body.name,
            content: body.content,
            user_id: body.user_id,
            folder_id: body.folder_id
         }
      });
      return NextResponse.json({ msg: 'Create Note Success' });
   } catch (error) {
      return NextResponse.json({ msg: error, status: 400 });
   }
}
