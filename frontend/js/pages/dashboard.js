// Dashboard page
function createDashboardPage() {
    const user = auth.getCurrentUser();
    
    if (!user) {
        router.navigate('/login');
        return '';
    }

    if (user.role === 'psychologist') {
        return createPsychologistDashboard();
    } else {
        return createPatientDashboard();
    }
}

function createPatientDashboard() {
    const user = auth.getCurrentUser();
    
    return `
        <div class="dashboard">
            <!-- Header -->
            <div class="dashboard-header">
                <div class="dashboard-header-content">
                    <div class="dashboard-user-info">
                        <div class="dashboard-user-avatar">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="dashboard-user-details">
                            <h2>Olá, ${user.name}</h2>
                            <p>Painel do Paciente</p>
                        </div>
                    </div>
                    <button class="dashboard-logout" onclick="handleLogout()">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                        </svg>
                        <span class="hidden sm:inline">Sair</span>
                    </button>
                </div>
            </div>

            <div class="dashboard-main">
                <!-- Success Message -->
                <div id="success-message" class="success-message hidden">
                    <div class="success-icon">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                    </div>
                    <span class="success-text">Consulta agendada com sucesso!</span>
                </div>

                <div class="dashboard-grid">
                    <!-- My Appointments -->
                    <div class="appointments-section">
                        <div class="appointments-header">
                            <h2 class="appointments-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <path d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                                Minhas Consultas
                            </h2>
                        </div>
                        
                        <div id="appointments-list" class="appointments-list">
                            <!-- Appointments will be loaded here -->
                        </div>
                    </div>

                    <!-- Schedule Grid -->
                    <div class="scheduling-section">
                        <div class="scheduling-header">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <h2 class="scheduling-title">Agendar Nova Consulta</h2>
                        </div>

                        <!-- Date Selection -->
                        <div class="date-selection">
                            <div class="date-label">
                                <span>📅</span>
                                Selecione uma Data
                            </div>
                            
                            <!-- Week Navigation -->
                            <div class="week-navigation">
                                <div class="week-controls">
                                    <button class="week-nav-btn" id="prev-week">
                                        <svg class="icon" viewBox="0 0 24 24">
                                            <path d="M15 18l-6-6 6-6"/>
                                        </svg>
                                    </button>
                                    
                                    <div class="week-days" id="week-days">
                                        <!-- Week days will be populated here -->
                                    </div>
                                    
                                    <button class="week-nav-btn" id="next-week">
                                        <svg class="icon" viewBox="0 0 24 24">
                                            <path d="M9 18l6-6-6-6"/>
                                        </svg>
                                    </button>
                                </div>

                                <!-- Custom Date Input -->
                                <div class="custom-date-input">
                                    <label>Ou escolha uma data específica:</label>
                                    <input
                                        type="date"
                                        id="custom-date"
                                        min="${new Date().toISOString().split('T')[0]}"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Selected Date Display -->
                        <div id="selected-date-display" class="selected-date-display hidden">
                            <div class="selected-date-content">
                                <div class="selected-date-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <path d="M16 2v4M8 2v4M3 10h18"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="selected-date-text">Data selecionada</div>
                                    <div class="selected-date-value" id="selected-date-text"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Time Slots -->
                        <div id="time-slots-section" class="time-slots-section hidden">
                            <div class="time-slots-header">
                                <svg class="icon animate-spin" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                <h3 class="time-slots-title">Horários Disponíveis</h3>
                            </div>
                            
                            <div class="time-slots-grid" id="time-slots-grid">
                                <!-- Time slots will be populated here -->
                            </div>

                            <!-- Legend -->
                            <div class="time-slots-legend">
                                <div class="legend-items">
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: linear-gradient(135deg, #fee2e2, #fecaca); border-color: #fca5a5;"></div>
                                        <span class="legend-text">Horário Ocupado</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: white; border: 2px solid var(--primary-200);"></div>
                                        <span class="legend-text">Horário Disponível</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background: var(--gray-100); border-color: var(--gray-200);"></div>
                                        <span class="legend-text">Indisponível (Fins de Semana)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Modal -->
        <div id="booking-modal" class="modal-overlay hidden">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <svg class="icon" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        Agendar Consulta
                    </h3>
                    <button class="modal-close" onclick="closeBookingModal()">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div class="modal-body">
                    <div id="booking-slot-info" class="mb-6 p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl border border-primary-200">
                        <!-- Slot info will be populated here -->
                    </div>

                    <form id="booking-form" class="space-y-6">
                        <div class="form-group">
                            <label class="form-label">Tipo de Sessão</label>
                            <select name="type" class="form-input form-select">
                                <option value="Primeira Consulta">Primeira Consulta</option>
                                <option value="Sessão Regular">Sessão Regular</option>
                                <option value="Terapia de Casal">Terapia de Casal</option>
                                <option value="Retorno">Retorno</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Observações (opcional)</label>
                            <textarea
                                name="notes"
                                rows="3"
                                class="form-input form-textarea"
                                placeholder="Alguma informação adicional que gostaria de compartilhar..."
                            ></textarea>
                        </div>

                        <div class="flex gap-4 pt-4">
                            <button
                                type="button"
                                class="btn btn-outline flex-1"
                                onclick="closeBookingModal()"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary flex-1"
                                id="booking-submit"
                            >
                                Confirmar Agendamento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function createPsychologistDashboard() {
    const user = auth.getCurrentUser();
    
    return `
        <div class="dashboard">
            <!-- Header -->
            <div class="dashboard-header">
                <div class="dashboard-header-content">
                    <div class="dashboard-user-info">
                        <div class="dashboard-user-avatar">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <div class="dashboard-user-details">
                            <h2>Olá, Dra. ${user.name}</h2>
                            <p>Painel de Gerenciamento</p>
                        </div>
                    </div>
                    <button class="dashboard-logout" onclick="handleLogout()">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                        </svg>
                        Sair
                    </button>
                </div>
            </div>

            <div class="dashboard-main">
                <!-- Stats -->
                <div class="stats-grid" id="stats-grid">
                    <!-- Stats will be loaded here -->
                </div>

                <div class="dashboard-grid">
                    <!-- Appointments List -->
                    <div class="appointments-section" style="grid-column: span 2;">
                        <div class="appointments-header">
                            <h2 class="appointments-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <path d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                                Consultas
                            </h2>
                            <div class="appointments-filters">
                                <button class="filter-btn active" data-filter="all">Todas</button>
                                <button class="filter-btn" data-filter="today">Hoje</button>
                                <button class="filter-btn" data-filter="week">Esta Semana</button>
                            </div>
                        </div>
                        
                        <div id="appointments-list" class="appointments-list">
                            <!-- Appointments will be loaded here -->
                        </div>
                    </div>

                    <!-- Patients List -->
                    <div class="appointments-section">
                        <div class="appointments-header">
                            <h2 class="appointments-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                Pacientes
                            </h2>
                        </div>
                        
                        <div id="patients-list" class="appointments-list">
                            <!-- Patients will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Appointment Detail Modal -->
        <div id="appointment-modal" class="modal-overlay hidden">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">Detalhes da Consulta</h3>
                    <button class="modal-close" onclick="closeAppointmentModal()">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div class="modal-body" id="appointment-details">
                    <!-- Appointment details will be populated here -->
                </div>
            </div>
        </div>
    `;
}

function initializeDashboardPage() {
    const user = auth.getCurrentUser();
    
    if (!user) {
        router.navigate('/login');
        return;
    }

    if (user.role === 'psychologist') {
        initializePsychologistDashboard();
    } else {
        initializePatientDashboard();
    }
}

function initializePatientDashboard() {
    let appointments = [];
    let selectedDate = '';
    let selectedSlot = { date: '', time: '' };
    let currentDate = new Date();

    // Load appointments
    loadAppointments();

    // Initialize date selection
    initializeDateSelection();

    // Load time slots when date is selected
    function loadTimeSlots(date) {
        if (!date) return;

        const timeSlotsSection = document.getElementById('time-slots-section');
        const timeSlotsGrid = document.getElementById('time-slots-grid');
        
        timeSlotsSection.classList.remove('hidden');
        
        // Show loading
        timeSlotsGrid.innerHTML = '<div class="text-center py-8"><div class="loading-spinner mx-auto"></div></div>';

        // Simulate API call
        setTimeout(async () => {
            try {
                const slots = await api.getAvailableSlots(date);
                renderTimeSlots(slots, date);
            } catch (error) {
                helpers.handleError(error, 'loading time slots');
                timeSlotsGrid.innerHTML = '<div class="text-center py-8 text-gray-500">Erro ao carregar horários</div>';
            }
        }, 500);
    }

    function renderTimeSlots(slots, date) {
        const timeSlotsGrid = document.getElementById('time-slots-grid');
        const selectedDateObj = new Date(date + 'T00:00:00');
        const isWeekend = selectedDateObj.getDay() === 0 || selectedDateObj.getDay() === 6;

        if (isWeekend) {
            timeSlotsGrid.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-gray-500 mb-2">Atendimento não disponível aos fins de semana</div>
                    <div class="text-sm text-gray-400">Selecione uma data entre segunda e sexta-feira</div>
                </div>
            `;
            return;
        }

        timeSlotsGrid.innerHTML = slots.map(slot => {
            if (!slot.available) {
                return `
                    <div class="time-slot occupied">
                        <div class="time-slot-time">${slot.time}</div>
                        <div class="time-slot-status">Ocupado</div>
                    </div>
                `;
            }

            return `
                <button class="time-slot" onclick="openBookingModal('${date}', '${slot.time}')">
                    <div class="time-slot-time">${slot.time}</div>
                    <div class="time-slot-icon">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </div>
                </button>
            `;
        }).join('');
    }

    function initializeDateSelection() {
        const weekDays = document.getElementById('week-days');
        const prevWeekBtn = document.getElementById('prev-week');
        const nextWeekBtn = document.getElementById('next-week');
        const customDateInput = document.getElementById('custom-date');
        const selectedDateDisplay = document.getElementById('selected-date-display');
        const selectedDateText = document.getElementById('selected-date-text');

        // Set initial date to today
        const today = new Date();
        selectedDate = today.toISOString().split('T')[0];
        customDateInput.value = selectedDate;
        updateSelectedDateDisplay();
        loadTimeSlots(selectedDate);

        function renderWeekDays() {
            const startOfWeek = new Date(currentDate);
            const day = startOfWeek.getDay();
            const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
            startOfWeek.setDate(diff);

            const weekDaysArray = [];
            for (let i = 0; i < 5; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                weekDaysArray.push(date);
            }

            const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
            const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

            weekDays.innerHTML = weekDaysArray.map((date, index) => {
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateStr;
                const isPast = date < new Date().setHours(0, 0, 0, 0);

                return `
                    <button
                        class="day-button ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}"
                        onclick="selectDate('${dateStr}')"
                        ${isPast ? 'disabled' : ''}
                    >
                        <div class="day-name">${dayNames[index]}</div>
                        <div class="day-number">${date.getDate()}</div>
                        <div class="day-month">${monthNames[date.getMonth()]}</div>
                    </button>
                `;
            }).join('');
        }

        function updateSelectedDateDisplay() {
            if (selectedDate) {
                selectedDateDisplay.classList.remove('hidden');
                selectedDateText.textContent = helpers.formatDate(selectedDate);
            } else {
                selectedDateDisplay.classList.add('hidden');
            }
        }

        // Event listeners
        prevWeekBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            renderWeekDays();
        });

        nextWeekBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            renderWeekDays();
        });

        customDateInput.addEventListener('change', (e) => {
            selectDate(e.target.value);
        });

        // Make selectDate global
        window.selectDate = (date) => {
            selectedDate = date;
            customDateInput.value = date;
            renderWeekDays();
            updateSelectedDateDisplay();
            loadTimeSlots(date);
        };

        // Initial render
        renderWeekDays();
    }

    async function loadAppointments() {
        try {
            appointments = await api.getAppointments();
            renderAppointments();
        } catch (error) {
            helpers.handleError(error, 'loading appointments');
        }
    }

    function renderAppointments() {
        const appointmentsList = document.getElementById('appointments-list');

        if (appointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg class="icon" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                    </div>
                    <div class="empty-state-title">Você ainda não tem consultas agendadas.</div>
                    <div class="empty-state-message">Agende sua primeira consulta ao lado!</div>
                </div>
            `;
            return;
        }

        appointmentsList.innerHTML = appointments.map(appointment => `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div>
                        <div class="appointment-patient">${appointment.type}</div>
                    </div>
                    <span class="badge badge-${helpers.getStatusColor(appointment.status)}">
                        ${helpers.getStatusText(appointment.status)}
                    </span>
                </div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        <span>${helpers.formatDate(appointment.date)}</span>
                    </div>
                    <div class="appointment-detail">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        <span>${appointment.time}</span>
                    </div>
                </div>
                ${appointment.notes ? `
                    <div class="appointment-notes">
                        <div class="appointment-notes-title">Observações:</div>
                        <div class="appointment-notes-text">${appointment.notes}</div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    // Make functions global for onclick handlers
    window.openBookingModal = (date, time) => {
        selectedSlot = { date, time };
        const modal = document.getElementById('booking-modal');
        const slotInfo = document.getElementById('booking-slot-info');
        
        slotInfo.innerHTML = `
            <div class="flex items-center gap-3 text-primary-700">
                <svg class="icon" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span class="font-semibold">${helpers.formatDate(date)}</span>
            </div>
            <div class="flex items-center gap-3 text-primary-700 mt-2">
                <svg class="icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                <span class="font-semibold text-lg">${time}</span>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('animate-fade-in');
    };

    window.closeBookingModal = () => {
        const modal = document.getElementById('booking-modal');
        modal.classList.add('hidden');
        modal.classList.remove('animate-fade-in');
        
        // Reset form
        document.getElementById('booking-form').reset();
    };

    // Handle booking form submission
    const bookingForm = document.getElementById('booking-form');
    const bookingSubmit = document.getElementById('booking-submit');

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        try {
            helpers.setLoading(bookingSubmit, true);

            await api.createAppointment({
                date: selectedSlot.date,
                time: selectedSlot.time,
                type: data.type,
                notes: data.notes
            });

            closeBookingModal();
            showSuccessMessage();
            loadAppointments();
            loadTimeSlots(selectedDate); // Refresh time slots

        } catch (error) {
            helpers.handleError(error, 'booking appointment');
        } finally {
            helpers.setLoading(bookingSubmit, false);
        }
    });

    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 4000);
    }
}

function initializePsychologistDashboard() {
    let appointments = [];
    let patients = [];
    let currentFilter = 'all';

    // Load data
    loadData();

    async function loadData() {
        try {
            const [appointmentsData, patientsData] = await Promise.all([
                api.getAppointments(),
                api.getPatients()
            ]);

            appointments = appointmentsData;
            patients = patientsData;

            renderStats();
            renderAppointments();
            renderPatients();
        } catch (error) {
            helpers.handleError(error, 'loading dashboard data');
        }
    }

    function renderStats() {
        const statsGrid = document.getElementById('stats-grid');
        
        const stats = {
            total: appointments.length,
            scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
            confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
            completed: appointments.filter(apt => apt.status === 'completed').length,
            patients: patients.length
        };

        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${stats.total}</div>
                <div class="stat-label">Total de Consultas</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-value">${stats.scheduled}</div>
                <div class="stat-label">Agendadas</div>
            </div>
            <div class="stat-card success">
                <div class="stat-value">${stats.confirmed}</div>
                <div class="stat-label">Confirmadas</div>
            </div>
            <div class="stat-card primary">
                <div class="stat-value">${stats.completed}</div>
                <div class="stat-label">Concluídas</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.patients}</div>
                <div class="stat-label">Pacientes</div>
            </div>
        `;
    }

    function renderAppointments() {
        const appointmentsList = document.getElementById('appointments-list');
        
        let filteredAppointments = appointments;
        
        if (currentFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            filteredAppointments = appointments.filter(apt => apt.date === today);
        } else if (currentFilter === 'week') {
            const today = new Date();
            const weekFromNow = new Date(today);
            weekFromNow.setDate(today.getDate() + 7);
            filteredAppointments = appointments.filter(apt => {
                const aptDate = new Date(apt.date + 'T00:00:00');
                return aptDate >= today && aptDate <= weekFromNow;
            });
        }

        // Sort by date and time
        filteredAppointments.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA.getTime() - dateB.getTime();
        });

        if (filteredAppointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg class="icon" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                    </div>
                    <div class="empty-state-title">Nenhuma consulta encontrada</div>
                    <div class="empty-state-message">para o filtro selecionado.</div>
                </div>
            `;
            return;
        }

        appointmentsList.innerHTML = filteredAppointments.map(appointment => `
            <div class="appointment-card">
                <div class="appointment-header">
                    <div>
                        <div class="appointment-patient">${appointment.patientName}</div>
                        <div class="appointment-type">${appointment.type}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="badge badge-${helpers.getStatusColor(appointment.status)}">
                            ${helpers.getStatusText(appointment.status)}
                        </span>
                        <button onclick="openAppointmentModal('${appointment.id}')" class="text-primary hover:text-primary-700">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        <span>${helpers.formatDate(appointment.date)}</span>
                    </div>
                    <div class="appointment-detail">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        <span>${appointment.time}</span>
                    </div>
                    ${appointment.patientPhone ? `
                        <div class="appointment-detail">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span>${appointment.patientPhone}</span>
                        </div>
                    ` : ''}
                </div>
                ${appointment.notes ? `
                    <div class="appointment-notes">
                        <div class="appointment-notes-title">Observações:</div>
                        <div class="appointment-notes-text">${appointment.notes}</div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    function renderPatients() {
        const patientsList = document.getElementById('patients-list');

        if (patients.length === 0) {
            patientsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <div class="empty-state-title">Nenhum paciente cadastrado.</div>
                </div>
            `;
            return;
        }

        patientsList.innerHTML = patients.map(patient => `
            <div class="appointment-card">
                <div class="appointment-patient">${patient.name}</div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <path d="M22 6l-10 7L2 6"/>
                        </svg>
                        <span>${patient.email}</span>
                    </div>
                    ${patient.phone ? `
                        <div class="appointment-detail">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span>${patient.phone}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="text-xs text-gray-500 mt-2">
                    Cadastrado em: ${new Date(patient.createdAt).toLocaleDateString('pt-BR')}
                </div>
            </div>
        `).join('');
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderAppointments();
        });
    });

    // Make functions global
    window.openAppointmentModal = (appointmentId) => {
        const appointment = appointments.find(apt => apt.id === appointmentId);
        if (!appointment) return;

        const modal = document.getElementById('appointment-modal');
        const details = document.getElementById('appointment-details');

        details.innerHTML = `
            <div class="space-y-4">
                <div class="p-4 bg-primary-50 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Informações do Paciente</h4>
                    <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>Nome:</strong> ${appointment.patientName}</div>
                        ${appointment.patientPhone ? `<div><strong>Telefone:</strong> ${appointment.patientPhone}</div>` : ''}
                    </div>
                </div>

                <div class="p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Detalhes da Consulta</h4>
                    <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>Tipo:</strong> ${appointment.type}</div>
                        <div><strong>Data:</strong> ${helpers.formatDate(appointment.date)}</div>
                        <div><strong>Horário:</strong> ${appointment.time}</div>
                        <div><strong>Status:</strong> 
                            <span class="badge badge-${helpers.getStatusColor(appointment.status)} ml-2">
                                ${helpers.getStatusText(appointment.status)}
                            </span>
                        </div>
                    </div>
                </div>

                ${appointment.notes ? `
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-medium text-gray-900 mb-2">Observações</h4>
                        <p class="text-sm text-gray-600">${appointment.notes}</p>
                    </div>
                ` : ''}

                <div class="flex gap-2 pt-4">
                    ${appointment.status === 'scheduled' ? `
                        <button onclick="updateAppointmentStatus('${appointment.id}', 'confirmed')" class="btn btn-success flex-1">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            Confirmar
                        </button>
                    ` : ''}
                    
                    ${(appointment.status === 'scheduled' || appointment.status === 'confirmed') ? `
                        <button onclick="updateAppointmentStatus('${appointment.id}', 'completed')" class="btn btn-primary flex-1">
                            Concluir
                        </button>
                        <button onclick="updateAppointmentStatus('${appointment.id}', 'cancelled')" class="btn btn-error flex-1">
                            <svg class="icon icon-sm" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M15 9l-6 6M9 9l6 6"/>
                            </svg>
                            Cancelar
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('animate-fade-in');
    };

    window.closeAppointmentModal = () => {
        const modal = document.getElementById('appointment-modal');
        modal.classList.add('hidden');
        modal.classList.remove('animate-fade-in');
    };

    window.updateAppointmentStatus = async (appointmentId, status) => {
        try {
            await api.updateAppointmentStatus(appointmentId, status);
            showSuccess('Status da consulta atualizado com sucesso!');
            closeAppointmentModal();
            loadData(); // Reload data
        } catch (error) {
            helpers.handleError(error, 'updating appointment status');
        }
    };
}

// Global logout function
window.handleLogout = () => {
    auth.logout();
    router.navigate('/');
};