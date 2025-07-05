export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  type: 'Primeira Consulta' | 'Sessão Regular' | 'Terapia de Casal' | 'Retorno';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
}

export interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
  appointmentId?: string;
}