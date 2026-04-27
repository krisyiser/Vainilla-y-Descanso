import { NextResponse } from 'next/server';
import { getDB, updateDB } from '@/lib/github-db';

export async function GET() {
  const db = await getDB();
  if (!db) return NextResponse.json({ error: 'DB not found' }, { status: 404 });
  return NextResponse.json(db.content.rooms);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = await getDB();
    
    if (!db) return NextResponse.json({ error: 'DB not found' }, { status: 404 });

    const roomIndex = db.content.rooms.findIndex((r: any) => r.id === id);
    if (roomIndex === -1) return NextResponse.json({ error: 'Room not found' }, { status: 404 });

    db.content.rooms[roomIndex].status = status;
    
    const success = await updateDB(db.content, db.sha);
    if (!success) throw new Error('Failed to update GitHub');

    return NextResponse.json(db.content.rooms[roomIndex]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
