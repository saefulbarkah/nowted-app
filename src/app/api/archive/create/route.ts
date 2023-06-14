import prisma from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const { note_id, user_id } = body;
      await prisma.archives.create({
         data: { note_id, user_id }
      });
      return NextResponse.json({ msg: 'Save to archive success' });
   } catch (error) {
      return NextResponse.json({ status: 400 });
   }
}
