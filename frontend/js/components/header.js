// Header component
function createHeader(onScheduleClick) {
    return `
        <header class="header" id="header">
            <div class="header-content">
                <a href="#" class="header-logo" onclick="router.navigate('/')">
                    <svg class="icon icon-lg" viewBox="0 0 24 24">
                        <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z"/>
                        <path d="M9 6h6M9 10h6M9 14h6M9 18h6"/>
                    </svg>
                    Laura Mantovani
                </a>

                <nav class="header-nav" id="header-nav">
                    <a href="#inicio" class="header-nav-link" onclick="scrollToSection('inicio')">Início</a>
                    <a href="#sobre" class="header-nav-link" onclick="scrollToSection('sobre')">Sobre</a>
                    <a href="#servicos" class="header-nav-link" onclick="scrollToSection('servicos')">Serviços</a>
                    <a href="#depoimentos" class="header-nav-link" onclick="scrollToSection('depoimentos')">Depoimentos</a>
                    <a href="#contato" class="header-nav-link" onclick="scrollToSection('contato')">Contato</a>
                    <button class="btn btn-primary btn-sm" onclick="${onScheduleClick}">
                        Agendar Consulta
                    </button>
                </nav>

                <button class="header-mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M3 12h18M3 6h18M3 18h18"/>
                    </svg>
                </button>
            </div>
        </header>
    `;
}

function initializeHeader() {
    // Handle scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', helpers.throttle(() => {
        const header = document.getElementById('header');
        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = window.scrollY;
    }, 100));

    // Handle mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const headerNav = document.getElementById('header-nav');

    if (mobileToggle && headerNav) {
        mobileToggle.addEventListener('click', () => {
            headerNav.classList.toggle('mobile-open');
            
            // Update icon
            const icon = mobileToggle.querySelector('svg path');
            if (headerNav.classList.contains('mobile-open')) {
                icon.setAttribute('d', 'M18 6L6 18M6 6l12 12');
            } else {
                icon.setAttribute('d', 'M3 12h18M3 6h18M3 18h18');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !headerNav.contains(e.target)) {
                headerNav.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('svg path');
                icon.setAttribute('d', 'M3 12h18M3 6h18M3 18h18');
            }
        });
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        helpers.smoothScrollTo(element);
    }
    
    // Close mobile menu if open
    const headerNav = document.getElementById('header-nav');
    if (headerNav && headerNav.classList.contains('mobile-open')) {
        headerNav.classList.remove('mobile-open');
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('svg path');
            icon.setAttribute('d', 'M3 12h18M3 6h18M3 18h18');
        }
    }
}