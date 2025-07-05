// Login page
function createLoginPage() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
            <div class="max-w-md w-full animate-fade-in-up">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="flex items-center justify-center space-x-2 mb-4">
                        <svg class="icon icon-xl text-primary" viewBox="0 0 24 24">
                            <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z"/>
                            <path d="M9 6h6M9 10h6M9 14h6M9 18h6"/>
                        </svg>
                        <span class="text-2xl font-bold text-gray-900">Laura Mantovani</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Entrar</h1>
                    <p class="text-gray-600">Acesse sua conta para gerenciar suas consultas</p>
                </div>

                <!-- Login Form -->
                <div class="card">
                    <div class="card-body">
                        <div id="login-error" class="hidden mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <svg class="icon text-red-600" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M15 9l-6 6M9 9l6 6"/>
                            </svg>
                            <span class="text-red-700" id="login-error-text"></span>
                        </div>

                        <form id="login-form" class="space-y-6">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <div class="form-input-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-input"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Senha</label>
                                <div class="form-input-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <input
                                        type="password"
                                        name="password"
                                        class="form-input"
                                        placeholder="Sua senha"
                                        required
                                        style="padding-right: 3rem;"
                                    />
                                    <button
                                        type="button"
                                        id="toggle-password"
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        style="left: auto;"
                                    >
                                        <svg class="icon" viewBox="0 0 24 24" id="eye-icon">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary btn-full"
                                id="login-submit"
                            >
                                Entrar
                            </button>
                        </form>

                        <div class="mt-6 text-center">
                            <p class="text-gray-600">
                                Não tem uma conta?
                                <a href="#" onclick="router.navigate('/register')" class="text-primary hover:text-primary-700 font-medium">
                                    Cadastre-se
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-6">
                    <a href="#" onclick="router.navigate('/')" class="text-primary hover:text-primary-700 font-medium">
                        ← Voltar ao site
                    </a>
                </div>
            </div>
        </div>
    `;
}

function initializeLoginPage() {
    const form = document.getElementById('login-form');
    const submitBtn = document.getElementById('login-submit');
    const errorDiv = document.getElementById('login-error');
    const errorText = document.getElementById('login-error-text');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = form.querySelector('input[name="password"]');
    const eyeIcon = document.getElementById('eye-icon');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        if (isPassword) {
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/>';
        } else {
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        // Hide previous errors
        errorDiv.classList.add('hidden');

        if (!email || !password) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        try {
            helpers.setLoading(submitBtn, true);
            
            const success = await auth.login(email, password);
            
            if (success) {
                showSuccess('Login realizado com sucesso!');
                setTimeout(() => {
                    router.navigate('/dashboard');
                }, 1000);
            } else {
                showError('Email ou senha incorretos');
            }
        } catch (error) {
            showError(error.message || 'Erro ao fazer login');
        } finally {
            helpers.setLoading(submitBtn, false);
        }
    });

    function showError(message) {
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}