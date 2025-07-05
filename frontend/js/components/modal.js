// Modal component
class ModalManager {
    constructor() {
        this.container = document.getElementById('modal-container');
        this.activeModal = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });

        // Close modal on overlay click
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });
    }

    show(content, options = {}) {
        const modal = this.createModal(content, options);
        this.container.appendChild(modal);
        this.activeModal = modal;

        // Show container
        this.container.style.display = 'flex';
        
        // Trigger animation
        setTimeout(() => {
            this.container.classList.add('animate-fade-in');
            modal.classList.add('animate-zoom-in');
        }, 10);

        // Focus management
        this.trapFocus(modal);

        return modal;
    }

    createModal(content, options) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const {
            title = '',
            showCloseButton = true,
            footer = '',
            size = 'md'
        } = options;

        modal.innerHTML = `
            ${title ? `
                <div class="modal-header">
                    <h3 class="modal-title">${helpers.escapeHtml(title)}</h3>
                    ${showCloseButton ? `
                        <button class="modal-close" aria-label="Fechar modal">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            ` : ''}
            <div class="modal-body">
                ${content}
            </div>
            ${footer ? `
                <div class="modal-footer">
                    ${footer}
                </div>
            ` : ''}
        `;

        // Add size class
        modal.classList.add(`modal-${size}`);

        // Add close functionality
        if (showCloseButton) {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.close());
            }
        }

        return modal;
    }

    close() {
        if (!this.activeModal) return;

        this.container.classList.remove('animate-fade-in');
        this.activeModal.classList.remove('animate-zoom-in');
        this.container.classList.add('animate-fade-out');
        this.activeModal.classList.add('animate-zoom-out');

        setTimeout(() => {
            this.container.style.display = 'none';
            this.container.classList.remove('animate-fade-out');
            this.container.innerHTML = '';
            this.activeModal = null;
        }, 300);
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        firstElement.focus();

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    confirm(message, options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Confirmação',
                confirmText = 'Confirmar',
                cancelText = 'Cancelar',
                type = 'primary'
            } = options;

            const content = `
                <p class="mb-6">${helpers.escapeHtml(message)}</p>
            `;

            const footer = `
                <button class="btn btn-outline cancel-btn">${cancelText}</button>
                <button class="btn btn-${type} confirm-btn">${confirmText}</button>
            `;

            const modal = this.show(content, { title, footer });

            const confirmBtn = modal.querySelector('.confirm-btn');
            const cancelBtn = modal.querySelector('.cancel-btn');

            confirmBtn.addEventListener('click', () => {
                this.close();
                resolve(true);
            });

            cancelBtn.addEventListener('click', () => {
                this.close();
                resolve(false);
            });
        });
    }

    alert(message, options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Aviso',
                buttonText = 'OK',
                type = 'primary'
            } = options;

            const content = `
                <p class="mb-6">${helpers.escapeHtml(message)}</p>
            `;

            const footer = `
                <button class="btn btn-${type} ok-btn">${buttonText}</button>
            `;

            const modal = this.show(content, { title, footer });

            const okBtn = modal.querySelector('.ok-btn');
            okBtn.addEventListener('click', () => {
                this.close();
                resolve();
            });
        });
    }
}

// Create global modal manager
window.modalManager = new ModalManager();

// Convenience functions
window.showModal = (content, options) => {
    return window.modalManager.show(content, options);
};

window.closeModal = () => {
    window.modalManager.close();
};

window.confirmModal = (message, options) => {
    return window.modalManager.confirm(message, options);
};

window.alertModal = (message, options) => {
    return window.modalManager.alert(message, options);
};