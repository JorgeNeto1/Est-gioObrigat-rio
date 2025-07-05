// Toast notification component
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.toasts = [];
    }

    show(message, type = 'info', duration = 5000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('animate-slide-in-right');
        }, 10);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">
                ${icon}
            </div>
            <div class="toast-content">
                <div class="toast-message">${helpers.escapeHtml(message)}</div>
            </div>
            <button class="toast-close" aria-label="Fechar">
                <svg class="icon icon-sm" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        `;

        // Add close functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.remove(toast);
        });

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: `<svg class="icon" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>`,
            error: `<svg class="icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M15 9l-6 6M9 9l6 6"/>
                    </svg>`,
            warning: `<svg class="icon" viewBox="0 0 24 24">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <path d="M12 9v4M12 17h.01"/>
                      </svg>`,
            info: `<svg class="icon" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M12 16v-4M12 8h.01"/>
                   </svg>`
        };
        return icons[type] || icons.info;
    }

    remove(toast) {
        if (!toast || !toast.parentNode) return;

        toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }

    clear() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// Create global toast manager
window.toastManager = new ToastManager();

// Convenience functions
window.showToast = (message, type, duration) => {
    return window.toastManager.show(message, type, duration);
};

window.showSuccess = (message) => {
    return window.toastManager.show(message, 'success');
};

window.showError = (message) => {
    return window.toastManager.show(message, 'error');
};

window.showWarning = (message) => {
    return window.toastManager.show(message, 'warning');
};

window.showInfo = (message) => {
    return window.toastManager.show(message, 'info');
};