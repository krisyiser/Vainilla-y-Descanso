export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';
export type ReservationStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export interface Room {
  id: string;
  name: string;
  type: string;
  status: RoomStatus;
  capacity: number;
  price_alta: number;
  price_baja: number;
  price_semana: number;
}

export interface Reservation {
  id: string;
  created_at: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  room_id: string;
  status: ReservationStatus;
  total_price: number;
  room?: Room;
}
