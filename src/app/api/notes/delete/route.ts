import prisma from '@/lib/db';
import { notes } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
   try {
      const body = await req.json();

      const note: notes = await prisma.notes.update({
         where: { id: body.id },
         data: {
            deleted_at: new Date()
         }
      });
      await prisma.trashes.create({
         data: {
            user_id: body.user_id,
            note_id: note.id
         }
      });
      return NextResponse.json({ msg: 'Delete Success' });
   } catch (error) {
      return NextResponse.json({ msg: error, status: 400 });
   }
}
