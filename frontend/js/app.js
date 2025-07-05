// Main application entry point
class App {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoading();

            // Initialize auth
            await auth.init();

            // Subscribe to auth changes
            auth.subscribe((user, isLoading) => {
                if (!isLoading) {
                    this.hideLoading();
                }
            });

            // Initialize router after auth is ready
            setTimeout(() => {
                this.hideLoading();
            }, 1000);

        } catch (error) {
            console.error('App initialization error:', error);
            this.hideLoading();
        }
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showError('Ocorreu um erro inesperado. Tente recarregar a página.');
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showError('Ocorreu um erro inesperado. Tente novamente.');
    event.preventDefault();
});