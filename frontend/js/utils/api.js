// API utility functions
class API {
    constructor() {
        this.baseURL = '/api';
        this.token = localStorage.getItem('token');
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.success) {
            this.setToken(response.token);
        }

        return response;
    }

    async register(userData) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (response.success) {
            this.setToken(response.token);
        }

        return response;
    }

    async verifyToken() {
        try {
            return await this.request('/auth/verify');
        } catch (error) {
            this.setToken(null);
            throw error;
        }
    }

    logout() {
        this.setToken(null);
    }

    // User endpoints
    async getProfile() {
        return await this.request('/users/profile');
    }

    async getPatients() {
        return await this.request('/users/patients');
    }

    // Appointment endpoints
    async getAppointments() {
        return await this.request('/appointments');
    }

    async createAppointment(appointmentData) {
        return await this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(appointmentData),
        });
    }

    async updateAppointmentStatus(appointmentId, status) {
        return await this.request(`/appointments/${appointmentId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }

    async cancelAppointment(appointmentId) {
        return await this.request(`/appointments/${appointmentId}`, {
            method: 'DELETE',
        });
    }

    async getAvailableSlots(date) {
        return await this.request(`/appointments/available-slots/${date}`);
    }
}

// Create global API instance
window.api = new API();