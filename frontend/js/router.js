// Simple client-side router
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });

        // Handle initial load
        this.handleRoute(window.location.pathname);
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute(path);
    }

    handleRoute(path) {
        // Normalize path
        if (path === '' || path === '/') {
            path = '/';
        }

        this.currentRoute = path;

        // Check if user is authenticated for protected routes
        if (path === '/dashboard' && !auth.isAuthenticated()) {
            this.navigate('/login');
            return;
        }

        // Redirect authenticated users away from auth pages
        if ((path === '/login' || path === '/register') && auth.isAuthenticated()) {
            this.navigate('/dashboard');
            return;
        }

        // Find and execute route handler
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            // 404 - redirect to home
            this.navigate('/');
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Create global router instance
window.router = new Router();

// Define routes
router.addRoute('/', () => {
    document.getElementById('app').innerHTML = createHomePage();
    initializeHomePage();
});

router.addRoute('/login', () => {
    document.getElementById('app').innerHTML = createLoginPage();
    initializeLoginPage();
});

router.addRoute('/register', () => {
    document.getElementById('app').innerHTML = createRegisterPage();
    initializeRegisterPage();
});

router.addRoute('/dashboard', () => {
    document.getElementById('app').innerHTML = createDashboardPage();
    initializeDashboardPage();
});