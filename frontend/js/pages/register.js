// Register page
function createRegisterPage() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4 py-8">
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
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Cadastro</h1>
                    <p class="text-gray-600">Crie sua conta para agendar consultas</p>
                </div>

                <!-- Register Form -->
                <div class="card">
                    <div class="card-body">
                        <div id="register-error" class="hidden mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                            <svg class="icon text-red-600" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M15 9l-6 6M9 9l6 6"/>
                            </svg>
                            <span class="text-red-700" id="register-error-text"></span>
                        </div>

                        <form id="register-form" class="space-y-6">
                            <div class="form-group">
                                <label class="form-label">Nome Completo</label>
                                <div class="form-input-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-input"
                                        placeholder="Seu nome completo"
                                        required
                                    />
                                </div>
                            </div>

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
                                <label class="form-label">Telefone/WhatsApp</label>
                                <div class="form-input-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <input
                                        type="tel"
                                        name="phone"
                                        class="form-input"
                                        placeholder="(11) 99999-9999"
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
                                        placeholder="Mínimo 6 caracteres"
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

                            <div class="form-group">
                                <label class="form-label">Confirmar Senha</label>
                                <div class="form-input-icon">
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        class="form-input"
                                        placeholder="Confirme sua senha"
                                        required
                                        style="padding-right: 3rem;"
                                    />
                                    <button
                                        type="button"
                                        id="toggle-confirm-password"
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        style="left: auto;"
                                    >
                                        <svg class="icon" viewBox="0 0 24 24" id="eye-confirm-icon">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary btn-full"
                                id="register-submit"
                            >
                                Criar Conta
                            </button>
                        </form>

                        <div class="mt-6 text-center">
                            <p class="text-gray-600">
                                Já tem uma conta?
                                <a href="#" onclick="router.navigate('/login')" class="text-primary hover:text-primary-700 font-medium">
                                    Entrar
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

function initializeRegisterPage() {
    const form = document.getElementById('register-form');
    const submitBtn = document.getElementById('register-submit');
    const errorDiv = document.getElementById('register-error');
    const errorText = document.getElementById('register-error-text');
    
    // Password toggle functionality
    setupPasswordToggle('toggle-password', 'password', 'eye-icon');
    setupPasswordToggle('toggle-confirm-password', 'confirmPassword', 'eye-confirm-icon');

    // Phone formatting
    const phoneInput = form.querySelector('input[name="phone"]');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = helpers.formatPhone(e.target.value);
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Hide previous errors
        errorDiv.classList.add('hidden');

        // Validation
        if (!data.name || !data.email || !data.phone || !data.password || !data.confirmPassword) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        if (!helpers.validateEmail(data.email)) {
            showError('Por favor, insira um email válido');
            return;
        }

        if (!helpers.validatePassword(data.password)) {
            showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (data.password !== data.confirmPassword) {
            showError('As senhas não coincidem');
            return;
        }

        try {
            helpers.setLoading(submitBtn, true);
            
            const success = await auth.register(data);
            
            if (success) {
                showSuccess('Conta criada com sucesso!');
                setTimeout(() => {
                    router.navigate('/dashboard');
                }, 1000);
            } else {
                showError('Este email já está cadastrado');
            }
        } catch (error) {
            showError(error.message || 'Erro ao criar conta');
        } finally {
            helpers.setLoading(submitBtn, false);
        }
    });

    function setupPasswordToggle(toggleId, inputName, iconId) {
        const toggle = document.getElementById(toggleId);
        const input = form.querySelector(`input[name="${inputName}"]`);
        const icon = document.getElementById(iconId);

        toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
            if (isPassword) {
                icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/>';
            } else {
                icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
            }
        });
    }

    function showError(message) {
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}