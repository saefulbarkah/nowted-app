import prisma from '@/lib/db';
import { notesSchema } from '@/schema';
import { notes } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { ValidationError } from 'yup';

export async function POST(req: Request) {
   const body: notes = await req.json();
   const { user_id, folder_id } = body;
   try {
      await notesSchema.validate({ user_id, folder_id }, { abortEarly: false });
   } catch (error: any) {
      return NextResponse.json(error.errors);
   }

   // const data = await prisma.notes.findMany({
   //    where: {
   //       user_id: body.user_id,
   //       folder_id: body.folder_id,
   //       deleted_at: null,
   //       archives: {
   //          none: {}
   //       },
   //       trashes: {
   //          none: {}
   //       }
   //    }
   // });
   // return NextResponse.json('test');
}
