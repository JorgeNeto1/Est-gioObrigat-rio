// Authentication utility functions
class AuthManager {
    constructor() {
        this.user = null;
        this.isLoading = false;
        this.callbacks = [];
    }

    // Subscribe to auth state changes
    subscribe(callback) {
        this.callbacks.push(callback);
        return () => {
            this.callbacks = this.callbacks.filter(cb => cb !== callback);
        };
    }

    // Notify all subscribers
    notify() {
        this.callbacks.forEach(callback => callback(this.user, this.isLoading));
    }

    // Initialize auth state
    async init() {
        this.isLoading = true;
        this.notify();

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await api.verifyToken();
                if (response.success) {
                    this.user = response.user;
                }
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            this.logout();
        } finally {
            this.isLoading = false;
            this.notify();
        }
    }

    // Login
    async login(email, password) {
        this.isLoading = true;
        this.notify();

        try {
            const response = await api.login(email, password);
            if (response.success) {
                this.user = response.user;
                this.notify();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            this.isLoading = false;
            this.notify();
        }
    }

    // Register
    async register(userData) {
        this.isLoading = true;
        this.notify();

        try {
            const response = await api.register(userData);
            if (response.success) {
                this.user = response.user;
                this.notify();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            this.isLoading = false;
            this.notify();
        }
    }

    // Logout
    logout() {
        this.user = null;
        api.logout();
        this.notify();
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.user;
    }

    // Check user role
    hasRole(role) {
        return this.user && this.user.role === role;
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Check if loading
    isLoadingAuth() {
        return this.isLoading;
    }
}

// Create global auth manager instance
window.auth = new AuthManager();