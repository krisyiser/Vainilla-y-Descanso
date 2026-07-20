"use server";

import { getDB, updateDB } from './github-db';
import { getCanonicalRoomId } from './roomUtils';

export interface ReservationPayload {
  id?: string;
  room_id: string;
  guest_name: string;
  check_in: string;
  check_out: string;
  total_price: number;
  guest_email?: string;
  guest_phone?: string;
  guest_origin?: string;
  guests_count?: number;
  notes?: string;
  payment_status?: string;
}

export async function sendReservationToCRM(reservationData: {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  room_id: string;
  total_price: number;
  notes?: string;
  payment_status?: string;
}) {
  const crmUrl = process.env.CRM_API_URL || 'http://localhost:3000/api/website/reservations';
  const apiKey = process.env.CRM_API_KEY || 'vd_crm_secret_key_2026';
  const canonicalRoomId = getCanonicalRoomId(reservationData.room_id);
  try {
    const response = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        external_id: reservationData.id,
        guest_name: reservationData.guest_name,
        email: reservationData.email,
        phone: reservationData.phone,
        check_in: reservationData.check_in,
        check_out: reservationData.check_out,
        room_id: canonicalRoomId,
        total_price: reservationData.total_price,
        notes: reservationData.notes || 'Reserva desde Sitio Web Oficial',
        payment_status: reservationData.payment_status || 'paid',
        status: 'Confirmed'
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Error sincronizando con el CRM:', data);
    } else {
      console.log('Reservación enviada exitosamente al CRM:', data);
    }
    return data;
  } catch (error) {
    console.error('Error de red enviando reservación al CRM:', error);
  }
}

export async function processReservation(payload: ReservationPayload) {
  try {
    const reservationId = payload.id || `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const canonicalRoomId = getCanonicalRoomId(payload.room_id);
    const detailsHeader = `[Huéspedes: ${payload.guests_count || 1} | Tel: ${payload.guest_phone || ''} | Procedencia: ${payload.guest_origin || ''}]`;
    const formattedNotes = payload.notes ? `${detailsHeader} ${payload.notes}` : detailsHeader;

    // 1. Enviar reservación al CRM mediante endpoint oficial
    const crmResponse = await sendReservationToCRM({
      id: reservationId,
      guest_name: payload.guest_name,
      email: payload.guest_email || '',
      phone: payload.guest_phone || '',
      check_in: payload.check_in,
      check_out: payload.check_out,
      room_id: canonicalRoomId,
      total_price: Number(payload.total_price),
      notes: formattedNotes,
      payment_status: payload.payment_status || 'paid'
    });

    // 2. Registro local de respaldo (GitHub DB)
    try {
      const db = await getDB();
      if (db && db.content) {
        const { reservations = [], guests = [] } = db.content;

        if (payload.guest_email && !guests.some((g: any) => g.email === payload.guest_email)) {
          guests.push({
            id: Math.random().toString(36).substring(2, 11),
            name: payload.guest_name,
            email: payload.guest_email,
            phone: payload.guest_phone || '',
            origin: payload.guest_origin || '',
            created_at: new Date().toISOString()
          });
          db.content.guests = guests;
        }

        const newRes = {
          id: reservationId,
          reservation_id: reservationId,
          room_id: canonicalRoomId,
          guest_name: String(payload.guest_name),
          guest_email: payload.guest_email || '',
          guest_phone: payload.guest_phone || '',
          guest_origin: payload.guest_origin || '',
          guests_count: Number(payload.guests_count || 1),
          check_in: String(payload.check_in),
          check_out: String(payload.check_out),
          total_price: Number(payload.total_price),
          notes: formattedNotes,
          status: 'confirmed_online',
          sync_status: crmResponse ? 'synced_to_crm' : 'queued_in_github',
          created_at: new Date().toISOString()
        };

        db.content.reservations = [...reservations, newRes];
        await updateDB(db.content, db.sha);
      }
    } catch (dbErr) {
      console.warn('Advertencia actualizando almacenamiento local de respaldo:', dbErr);
    }

    return {
      success: true,
      syncStatus: crmResponse ? 'synced_to_crm' : 'queued_in_github',
      reservation_id: reservationId,
      crmData: crmResponse,
      message: crmResponse ? "¡Reserva enviada exitosamente al CRM del hotel!" : "Solicitud de reserva registrada con éxito."
    };

  } catch (error: any) {
    console.error("Error en processReservation:", error);
    return {
      success: false,
      message: error.message || "Ocurrió un error inesperado al procesar la reserva."
    };
  }
}
