// Services component
function createServices() {
    const services = [
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                     <circle cx="9" cy="7" r="4"/>
                     <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                   </svg>`,
            title: 'Terapia Individual',
            description: 'Atendimento personalizado para adolescentes e adultos',
            duration: '50 minutos',
            price: 'A partir de R$ 150'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                     <circle cx="9" cy="7" r="4"/>
                     <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                   </svg>`,
            title: 'Terapia de Casal',
            description: 'Fortalecimento de vínculos e resolução de conflitos',
            duration: '60 minutos',
            price: 'A partir de R$ 200'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                     <path d="M8 21l4-4 4 4"/>
                   </svg>`,
            title: 'Terapia Online',
            description: 'Atendimento por videoconferência com total segurança',
            duration: '50 minutos',
            price: 'A partir de R$ 140'
        }
    ];

    const approaches = [
        {
            name: 'Terapia Cognitivo-Comportamental (TCC)',
            description: 'Foca na identificação e modificação de padrões de pensamento e comportamento disfuncionais.'
        },
        {
            name: 'Abordagem Humanística',
            description: 'Enfatiza o potencial humano para crescimento e autodeterminação.'
        },
        {
            name: 'Técnicas de Mindfulness',
            description: 'Práticas de atenção plena para redução do estresse e maior consciência emocional.'
        },
        {
            name: 'Terapia Sistêmica',
            description: 'Trabalha com as dinâmicas familiares e relacionais para promover mudanças positivas.'
        }
    ];

    return `
        <section id="servicos" class="py-20 px-4 bg-gradient-to-br from-primary-50 to-white">
            <div class="container">
                <div class="text-center mb-16 fade-in-on-scroll">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Serviços
                    </h2>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Ofereço diferentes modalidades de atendimento para atender às suas necessidades 
                        específicas, sempre com qualidade e profissionalismo.
                    </p>
                </div>

                <!-- Services Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    ${services.map((service, index) => `
                        <div class="card hover-lift stagger-${index + 1}">
                            <div class="card-body">
                                <div class="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                    <div class="text-primary">
                                        ${service.icon}
                                    </div>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">
                                    ${service.title}
                                </h3>
                                <p class="text-gray-600 mb-4">
                                    ${service.description}
                                </p>
                                <div class="space-y-2">
                                    <div class="flex items-center gap-2 text-sm text-gray-500">
                                        <svg class="icon icon-sm" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                        ${service.duration}
                                    </div>
                                    <div class="text-lg font-bold text-primary">
                                        ${service.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Approaches -->
                <div class="card scale-in-on-scroll">
                    <div class="card-body p-8 md:p-12">
                        <div class="text-center mb-10">
                            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Abordagens Terapêuticas
                            </h3>
                            <p class="text-gray-600 max-w-2xl mx-auto">
                                Utilizo diferentes abordagens terapêuticas, adaptando o tratamento 
                                às necessidades específicas de cada pessoa.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${approaches.map((approach, index) => `
                                <div class="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover-lift stagger-${index + 1}">
                                    <h4 class="text-lg font-bold text-gray-900 mb-3">
                                        ${approach.name}
                                    </h4>
                                    <p class="text-gray-700">
                                        ${approach.description}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Call to Action -->
                <div class="text-center mt-12 fade-in-on-scroll">
                    <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white hover-lift">
                        <h3 class="text-2xl font-bold mb-4">
                            Pronto para começar sua jornada de autodescoberta?
                        </h3>
                        <p class="text-primary-100 mb-6 max-w-2xl mx-auto">
                            Agende uma consulta e dê o primeiro passo em direção ao seu bem-estar emocional.
                        </p>
                        <button class="btn bg-white text-primary hover:bg-gray-50 font-bold px-8 py-3" onclick="scrollToSection('contato')">
                            Agendar Consulta
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}