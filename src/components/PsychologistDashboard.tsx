import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, LogOut, Eye, Check, X, AlertCircle, Phone, Mail, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Appointment } from '../types/appointment';
import { User } from '../types/auth';

const PsychologistDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load data
  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    setAppointments(allAppointments);
    setPatients(allUsers.filter((u: User) => u.role === 'patient'));
  }, []);

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    if (selectedAppointment?.id === appointmentId) {
      setSelectedAppointment({ ...selectedAppointment, status });
    }

    showSuccessMessage(`Consulta ${getStatusText(status).toLowerCase()} com sucesso!`);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const filteredAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.date + 'T00:00:00');
    
    switch (filter) {
      case 'today':
        return aptDate.toDateString() === today.toDateString();
      case 'week':
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        return aptDate >= today && aptDate <= weekFromNow;
      default:
        return true;
    }
  }).sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time);
    const dateB = new Date(b.date + 'T' + b.time);
    return dateA.getTime() - dateB.getTime();
  });

  const stats = {
    total: appointments.length,
    scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    patients: patients.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-violet-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-violet-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Olá, Dra. {user?.name}</h1>
                <p className="text-sm text-gray-600">Painel de Gerenciamento</p>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total de Consultas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
            <div className="text-2xl font-bold text-yellow-600">{stats.scheduled}</div>
            <div className="text-sm text-gray-600">Agendadas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmadas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
            <div className="text-2xl font-bold text-violet-600">{stats.patients}</div>
            <div className="text-sm text-gray-600">Pacientes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-violet-600" />
                  Consultas
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      filter === 'all' ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilter('today')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      filter === 'today' ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => setFilter('week')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      filter === 'week' ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Esta Semana
                  </button>
                </div>
              </div>
              
              {filteredAppointments.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  Nenhuma consulta encontrada para o filtro selecionado.
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.type}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowAppointmentModal(true);
                            }}
                            className="text-violet-600 hover:text-violet-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(appointment.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </div>
                        {appointment.patientPhone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {appointment.patientPhone}
                          </div>
                        )}
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Observações:</strong> {appointment.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Patients List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-600" />
                Pacientes
              </h2>
              
              {patients.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  Nenhum paciente cadastrado.
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {patients.map((patient) => (
                    <div key={patient.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 text-sm">
                        {patient.name}
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {patient.email}
                        </div>
                        {patient.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Cadastrado em: {new Date(patient.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Detalhes da Consulta
              </h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-violet-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Informações do Paciente</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Nome:</strong> {selectedAppointment.patientName}</div>
                  {selectedAppointment.patientPhone && (
                    <div><strong>Telefone:</strong> {selectedAppointment.patientPhone}</div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Detalhes da Consulta</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Tipo:</strong> {selectedAppointment.type}</div>
                  <div><strong>Data:</strong> {formatDate(selectedAppointment.date)}</div>
                  <div><strong>Horário:</strong> {selectedAppointment.time}</div>
                  <div><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {getStatusText(selectedAppointment.status)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
                  <p className="text-sm text-gray-600">{selectedAppointment.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {selectedAppointment.status === 'scheduled' && (
                  <button
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, 'confirmed')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Confirmar
                  </button>
                )}
                
                {(selectedAppointment.status === 'scheduled' || selectedAppointment.status === 'confirmed') && (
                  <>
                    <button
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Concluir
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
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

export default PsychologistDashboard;