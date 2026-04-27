import { NextResponse } from 'next/server';
import { getDB, updateDB } from '@/lib/github-db';

export async function GET() {
  const db = await getDB();
  if (!db) return NextResponse.json({ error: 'DB not found' }, { status: 404 });
  return NextResponse.json(db.content.reservations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDB();
    
    if (!db) return NextResponse.json({ error: 'DB not found' }, { status: 404 });

    const newReservation = {
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      ...body
    };

    db.content.reservations.push(newReservation);
    
    const success = await updateDB(db.content, db.sha);
    if (!success) throw new Error('Failed to update GitHub');

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
