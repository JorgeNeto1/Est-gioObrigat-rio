import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, LogOut, Plus, X, Check, ChevronLeft, ChevronRight, CalendarDays, Edit, Trash2, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Appointment } from '../types/appointment';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ date: '', time: '' });
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [bookingData, setBookingData] = useState({
    type: 'Primeira Consulta' as Appointment['type'],
    notes: ''
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');

  const times = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  // Load appointments
  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const userAppointments = allAppointments.filter((apt: Appointment) => apt.patientId === user?.id);
    setAppointments(userAppointments);
  }, [user?.id]);

  // Initialize with today's date
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
  }, []);

  const handleSlotClick = (time: string) => {
    if (!selectedDate) return;
    
    setSelectedSlot({ 
      date: selectedDate, 
      time 
    });
    setShowBookingModal(true);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: user.id,
      patientName: user.name,
      patientPhone: user.phone || '',
      date: selectedSlot.date,
      time: selectedSlot.time,
      type: bookingData.type,
      status: 'scheduled',
      notes: bookingData.notes,
      createdAt: new Date()
    };

    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    allAppointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(allAppointments));

    setAppointments([...appointments, newAppointment]);
    setShowBookingModal(false);
    setBookingData({ type: 'Primeira Consulta', notes: '' });
    showSuccessMessage('Consulta agendada com sucesso!');
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setSelectedSlot({ date: appointment.date, time: appointment.time });
    setBookingData({ type: appointment.type, notes: appointment.notes || '' });
    setShowEditModal(true);
  };

  const handleUpdateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingAppointment) return;

    const updatedAppointment = {
      ...editingAppointment,
      date: selectedSlot.date,
      time: selectedSlot.time,
      type: bookingData.type,
      notes: bookingData.notes
    };

    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((apt: Appointment) => 
      apt.id === editingAppointment.id ? updatedAppointment : apt
    );
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(appointments.map(apt => 
      apt.id === editingAppointment.id ? updatedAppointment : apt
    ));

    setShowEditModal(false);
    setEditingAppointment(null);
    setBookingData({ type: 'Primeira Consulta', notes: '' });
    showSuccessMessage('Consulta atualizada com sucesso!');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updatedAppointments = allAppointments.map((apt: Appointment) => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      );
      
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      ));

      showSuccessMessage('Consulta cancelada com sucesso!');
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user?.id ? { ...u, ...profileData } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setShowProfileModal(false);
    showSuccessMessage('Perfil atualizado com sucesso!');
    
    // Force page reload to update user context
    window.location.reload();
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const isSlotOccupied = (time: string) => {
    if (!selectedDate) return false;
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return allAppointments.some((apt: Appointment) => 
      apt.date === selectedDate && apt.time === time && apt.status !== 'cancelled'
    );
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'Agendada';
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  };

  const weekDays = getWeekDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-violet-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-violet-500 p-2 rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-violet-600">
                  Olá, {user?.name}
                </h1>
                <p className="text-sm text-gray-600">Painel do Paciente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <UserCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Perfil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <Check className="h-5 w-5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Appointments */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-violet-500 p-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-violet-600">
                  Minhas Consultas
                </h2>
              </div>
              
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-violet-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="h-8 w-8 text-violet-500" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Você ainda não tem consultas agendadas.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Agende sua primeira consulta ao lado!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white border border-violet-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-sm font-semibold text-gray-900">
                          {appointment.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          {appointment.status === 'scheduled' && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditAppointment(appointment)}
                                className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                                title="Editar consulta"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Cancelar consulta"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-violet-500" />
                          <span className="font-medium">{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-violet-500" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                          <div className="text-xs font-medium text-violet-700 mb-1">Observações:</div>
                          <div className="text-sm text-gray-700">{appointment.notes}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-violet-500 p-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-violet-600">
                  Agendar Nova Consulta
                </h2>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Selecione uma Data
                </label>
                
                {/* Week Navigation */}
                <div className="bg-violet-50 rounded-2xl p-6 mb-6 border border-violet-100">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={goToPreviousWeek}
                      className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-violet-100"
                    >
                      <ChevronLeft className="h-5 w-5 text-violet-600" />
                    </button>
                    
                    <div className="flex-1 grid grid-cols-5 gap-3">
                      {weekDays.map((date, index) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        const isPast = isPastDate(date);
                        const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
                        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                        
                        return (
                          <button
                            key={index}
                            onClick={() => !isPast && setSelectedDate(dateStr)}
                            disabled={isPast}
                            className={`p-4 rounded-2xl text-center transition-colors duration-200 ${
                              isSelected
                                ? 'bg-violet-500 text-white shadow-lg'
                                : isPast
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                                : 'bg-white text-violet-700 hover:bg-violet-50 shadow-md border border-violet-100'
                            }`}
                          >
                            <div className="text-xs font-bold mb-1">{dayNames[index]}</div>
                            <div className="text-xl font-bold mb-1">{date.getDate()}</div>
                            <div className="text-xs opacity-80">{monthNames[date.getMonth()]}</div>
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={goToNextWeek}
                      className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-violet-100"
                    >
                      <ChevronRight className="h-5 w-5 text-violet-600" />
                    </button>
                  </div>

                  {/* Custom Date Input */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-violet-200">
                    <span className="text-sm text-gray-600 font-medium">Ou escolha uma data específica:</span>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="px-4 py-2 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Selected Date Display */}
              {selectedDate && (
                <div className="mb-8">
                  <div className="bg-violet-500 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-xl">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Data selecionada</div>
                        <div className="text-xl font-bold">
                          {formatDate(selectedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-violet-600" />
                    Horários Disponíveis
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {times.map((time) => {
                      const isOccupied = isSlotOccupied(time);
                      const selectedDateObj = new Date(selectedDate + 'T00:00:00');
                      const isWeekendDay = isWeekend(selectedDateObj);

                      if (isWeekendDay) {
                        return (
                          <div key={time} className="bg-gray-100 p-4 rounded-2xl border border-gray-200 text-center opacity-50">
                            <div className="text-sm font-medium text-gray-500">{time}</div>
                            <div className="text-xs text-gray-400 mt-1">Indisponível</div>
                          </div>
                        );
                      }

                      return (
                        <div key={time}>
                          {isOccupied ? (
                            <div className="bg-red-100 p-4 rounded-2xl border border-red-200 text-center">
                              <div className="text-sm font-medium text-red-700">{time}</div>
                              <div className="text-xs text-red-500 mt-1">Ocupado</div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSlotClick(time)}
                              className="w-full p-4 bg-white border-2 border-violet-200 rounded-2xl hover:border-violet-400 hover:bg-violet-50 transition-colors duration-200 text-center shadow-sm hover:shadow-md"
                            >
                              <div className="text-sm font-semibold text-gray-700 mb-2">
                                {time}
                              </div>
                              <div className="bg-violet-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                                <Plus className="h-4 w-4 text-white" />
                              </div>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-100 rounded border border-red-200"></div>
                        <span className="text-gray-600 font-medium">Horário Ocupado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded border-2 border-violet-200"></div>
                        <span className="text-gray-600 font-medium">Horário Disponível</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-100 rounded border border-gray-200"></div>
                        <span className="text-gray-600 font-medium">Indisponível (Fins de Semana)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-violet-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-violet-500 p-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-violet-600">
                  Agendar Consulta
                </h3>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-xl hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 p-6 bg-violet-50 rounded-2xl border border-violet-100">
              <div className="flex items-center gap-3 text-violet-700 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">
                  {formatDate(selectedSlot.date)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-violet-700">
                <Clock className="h-5 w-5" />
                <span className="font-semibold text-lg">{selectedSlot.time}</span>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Sessão
                </label>
                <select
                  value={bookingData.type}
                  onChange={(e) => setBookingData({ ...bookingData, type: e.target.value as Appointment['type'] })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                >
                  <option value="Primeira Consulta">Primeira Consulta</option>
                  <option value="Sessão Regular">Sessão Regular</option>
                  <option value="Terapia de Casal">Terapia de Casal</option>
                  <option value="Retorno">Retorno</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Observações (opcional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={3}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none bg-white"
                  placeholder="Alguma informação adicional que gostaria de compartilhar..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-violet-500 text-white rounded-2xl hover:bg-violet-600 transition-colors duration-200 font-medium shadow-lg"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-violet-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-xl">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-600">
                  Editar Consulta
                </h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-xl hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateAppointment} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Data
                </label>
                <input
                  type="date"
                  value={selectedSlot.date}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Horário
                </label>
                <select
                  value={selectedSlot.time}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot, time: e.target.value })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                >
                  {times.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Sessão
                </label>
                <select
                  value={bookingData.type}
                  onChange={(e) => setBookingData({ ...bookingData, type: e.target.value as Appointment['type'] })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                >
                  <option value="Primeira Consulta">Primeira Consulta</option>
                  <option value="Sessão Regular">Sessão Regular</option>
                  <option value="Terapia de Casal">Terapia de Casal</option>
                  <option value="Retorno">Retorno</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Observações (opcional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={3}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none bg-white"
                  placeholder="Alguma informação adicional que gostaria de compartilhar..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors duration-200 font-medium shadow-lg"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-violet-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-xl">
                  <UserCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-600">
                  Meu Perfil
                </h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-xl hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  E-mail
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-4 border border-violet-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors duration-200 font-medium shadow-lg"
                >
                  Salvar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;