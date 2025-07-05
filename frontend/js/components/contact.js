// Contact component
function createContact() {
    const contactInfo = [
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                   </svg>`,
            title: 'Telefone',
            content: '(11) 3456-7890\n(11) 99876-5432'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                     <path d="M22 6l-10 7L2 6"/>
                   </svg>`,
            title: 'E-mail',
            content: 'contato@lauramantovani.com.br'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M12 6v6l4 2"/>
                   </svg>`,
            title: 'Horário de Atendimento',
            content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h'
        }
    ];

    return `
        <section id="contato" class="py-20 px-4 bg-gradient-to-br from-primary-50 to-white">
            <div class="container">
                <div class="text-center mb-16 fade-in-on-scroll">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Entre em Contato
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Estou aqui para ajudar você. Entre em contato para agendar sua consulta 
                        ou esclarecer suas dúvidas.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Contact Information -->
                    <div class="space-y-8 slide-in-left-on-scroll">
                        <div class="grid grid-cols-1 gap-6">
                            ${contactInfo.map((info, index) => `
                                <div class="card hover-lift stagger-${index + 1}">
                                    <div class="card-body">
                                        <div class="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                            <div class="text-primary">
                                                ${info.icon}
                                            </div>
                                        </div>
                                        <h3 class="text-lg font-bold text-gray-900 mb-2">
                                            ${info.title}
                                        </h3>
                                        <p class="text-gray-600" style="white-space: pre-line;">
                                            ${info.content}
                                        </p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="card slide-in-right-on-scroll">
                        <div class="card-body">
                            <h3 class="text-2xl font-bold text-gray-900 mb-6">
                                Envie uma Mensagem
                            </h3>

                            <div id="contact-success" class="hidden mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                <svg class="icon text-green-600" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"/>
                                </svg>
                                <span class="text-green-700">Mensagem enviada com sucesso!</span>
                            </div>

                            <form id="contact-form" class="space-y-6">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">Nome</label>
                                        <input
                                            type="text"
                                            name="name"
                                            class="form-input"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Telefone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            class="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-input"
                                        required
                                    />
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Mensagem</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        class="form-input form-textarea"
                                        placeholder="Conte-me um pouco sobre o que você está procurando..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    class="btn btn-primary btn-full"
                                    id="contact-submit"
                                >
                                    <svg class="icon" viewBox="0 0 24 24">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                                    </svg>
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                initializeContactForm();
            });
        </script>
    `;
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const successMessage = document.getElementById('contact-success');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.name || !data.email || !data.phone || !data.message) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        if (!helpers.validateEmail(data.email)) {
            showError('Por favor, insira um email válido');
            return;
        }

        try {
            helpers.setLoading(submitBtn, true);

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            successMessage.classList.remove('hidden');
            form.reset();

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);

            showSuccess('Mensagem enviada com sucesso!');

        } catch (error) {
            helpers.handleError(error, 'contact form');
        } finally {
            helpers.setLoading(submitBtn, false);
        }
    });
}