import { NextResponse } from 'next/server';
import { getDB } from '@/lib/github-db';
import { processReservation } from '@/lib/hotelApi';

export async function GET() {
  const db = await getDB();
  if (!db) return NextResponse.json({ error: 'DB not found' }, { status: 404 });
  return NextResponse.json(db.content.reservations || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await processReservation(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result, { status: result.syncStatus === 'synced_to_tunnel' ? 201 : 202 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
