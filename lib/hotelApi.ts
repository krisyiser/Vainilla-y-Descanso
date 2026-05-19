"use server";

import { getDB, updateDB } from './github-db';

export interface ReservationPayload {
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
}

export async function processReservation(payload: ReservationPayload) {
  try {
    // 1. LEER LA URL ACTIVA DE RECEPCIÓN
    const db = await getDB();
    if (!db || !db.content) {
      throw new Error("No se pudo conectar con la base de datos principal en GitHub.");
    }

    const { webhook_url, reservations = [], guests = [] } = db.content;

    // Registrar también al huésped en la lista general si no existe
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

    // Formatear notas agregándoles información del huésped y origen
    const detailsHeader = `[Huéspedes: ${payload.guests_count || 1} | Tel: ${payload.guest_phone || ''} | Procedencia: ${payload.guest_origin || ''}]`;
    const formattedNotes = payload.notes ? `${detailsHeader} ${payload.notes}` : detailsHeader;

    // 2. INTENTAR ENVIAR EL PAYLOAD AL WEBHOOK SI EXISTE
    if (webhook_url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const webhookPayload = {
          room_id: String(payload.room_id),
          guest_name: String(payload.guest_name),
          check_in: String(payload.check_in),
          check_out: String(payload.check_out),
          total_price: Number(payload.total_price),
          guest_email: payload.guest_email || '',
          guest_phone: payload.guest_phone || '',
          guest_origin: payload.guest_origin || '',
          guests_count: Number(payload.guests_count || 1),
          notes: formattedNotes
        };

        console.log("Enviando reservación al webhook de recepción activa:", webhook_url, webhookPayload);

        const webhookResponse = await fetch(webhook_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'vnl_92E02BD37015561C01F8CAAE1A3CB568'
          },
          body: JSON.stringify(webhookPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        // 3. MANEJO DE RESPUESTA WEBHOOK EXITOSA (HTTP 201 o HTTP 200)
        if (webhookResponse.status === 201 || webhookResponse.ok) {
          const result = await webhookResponse.json().catch(() => ({ status: 'success', reservation_id: `res_${Date.now()}` }));
          
          // Opcional: También guardamos copia local en GitHub como registro sincronizado
          const syncedRes = {
            id: Math.random().toString(36).substring(2, 11),
            reservation_id: result.reservation_id || `res_${Date.now()}`,
            room_id: String(payload.room_id),
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
            sync_status: 'synced_to_tunnel',
            created_at: new Date().toISOString()
          };
          db.content.reservations = [...reservations, syncedRes];
          await updateDB(db.content, db.sha);

          return {
            success: true,
            syncStatus: 'synced_to_tunnel',
            reservation_id: syncedRes.reservation_id,
            message: "¡Reserva confirmada en línea directo con el sistema central del hotel!"
          };
        } else {
          console.warn("Respuesta no exitosa del webhook:", webhookResponse.status);
        }
      } catch (webhookErr) {
        console.warn("Túnel inactivo o falló la conexión al webhook. Guardando en cola de respaldo (GitHub DB fallback).", webhookErr);
      }
    } else {
      console.warn("No hay webhook_url registrado en db.json. Guardando en cola de respaldo (GitHub DB fallback).");
    }

    // FALLBACK / COLA DE SINCRONIZACIÓN: Guardar temporalmente en el array reservations del db.json
    const fallbackReservation = {
      id: Math.random().toString(36).substring(2, 11),
      reservation_id: `res_queue_${Date.now()}`,
      room_id: String(payload.room_id),
      guest_name: String(payload.guest_name),
      guest_email: payload.guest_email || '',
      guest_phone: payload.guest_phone || '',
      guest_origin: payload.guest_origin || '',
      guests_count: Number(payload.guests_count || 1),
      check_in: String(payload.check_in),
      check_out: String(payload.check_out),
      total_price: Number(payload.total_price),
      notes: formattedNotes,
      status: 'pending_sync',
      sync_status: 'queued_in_github',
      created_at: new Date().toISOString()
    };

    db.content.reservations = [...reservations, fallbackReservation];

    const updated = await updateDB(db.content, db.sha);
    if (!updated) {
      throw new Error("No se pudo guardar la reserva en la base de datos de respaldo en GitHub.");
    }

    return {
      success: true,
      syncStatus: 'queued_in_github',
      reservation_id: fallbackReservation.reservation_id,
      message: "Solicitud encolada de forma segura para sincronización automática con recepción."
    };

  } catch (error: any) {
    console.error("Error en processReservation:", error);
    return {
      success: false,
      message: error.message || "Ocurrió un error inesperado al procesar la reserva."
    };
  }
}
