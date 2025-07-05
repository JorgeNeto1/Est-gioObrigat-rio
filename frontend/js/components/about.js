// About component
function createAbout() {
    const qualifications = [
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                     <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                   </svg>`,
            title: 'Formação Acadêmica',
            description: 'Graduação em Psicologia pela USP, Pós-graduação em Terapia Cognitivo-Comportamental'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <circle cx="12" cy="8" r="7"/>
                     <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                   </svg>`,
            title: 'Especialização',
            description: 'Especialista em TCC, Terapia Humanista e técnicas de Mindfulness'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                     <circle cx="9" cy="7" r="4"/>
                     <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                   </svg>`,
            title: 'Experiência',
            description: 'Mais de 8 anos atendendo adolescentes, adultos e casais'
        },
        {
            icon: `<svg class="icon" viewBox="0 0 24 24">
                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                   </svg>`,
            title: 'Abordagem',
            description: 'Atendimento humanizado, acolhedor e baseado em evidências científicas'
        }
    ];

    const specialties = [
        'Ansiedade e Transtornos de Ansiedade',
        'Depressão e Transtornos do Humor',
        'Autoestima e Autoconhecimento',
        'Relacionamentos e Terapia de Casal',
        'Estresse e Burnout',
        'Transtornos Alimentares',
        'Luto e Perdas',
        'Fobias e Medos'
    ];

    return `
        <section id="sobre" class="py-20 px-4 bg-white">
            <div class="container">
                <div class="text-center mb-16 fade-in-on-scroll">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Sobre Mim
                    </h2>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Sou psicóloga especializada em ajudar pessoas a encontrarem equilíbrio emocional 
                        e bem-estar mental através de uma abordagem acolhedora e cientificamente fundamentada.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <!-- Image -->
                    <div class="relative slide-in-left-on-scroll">
                        <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-6 hover-lift">
                            <img
                                src="https://images.pexels.com/photos/5699431/pexels-photo-5699431.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Laura Mantovani - Psicóloga"
                                class="w-full h-96 object-cover rounded-2xl shadow-lg"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="space-y-6 slide-in-right-on-scroll">
                        <div class="space-y-4">
                            <h3 class="text-2xl font-bold text-gray-900">
                                Laura Mantovani Mira
                            </h3>
                            <p class="text-lg text-primary font-medium">
                                Psicóloga Clínica
                            </p>
                            <p class="text-gray-700" style="line-height: 1.6;">
                                Com mais de 8 anos de experiência em psicologia clínica, dedico-me a oferecer 
                                um espaço seguro e acolhedor para que você possa explorar seus sentimentos, 
                                desenvolver estratégias de enfrentamento e alcançar uma vida mais equilibrada.
                            </p>
                            <p class="text-gray-700" style="line-height: 1.6;">
                                Minha abordagem combina técnicas da Terapia Cognitivo-Comportamental com 
                                princípios humanísticos, sempre respeitando a singularidade de cada pessoa 
                                e seu processo de autodescoberta.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${qualifications.map((qual, index) => `
                                <div class="flex items-start gap-3 p-4 bg-primary-50 rounded-xl hover-lift stagger-${index + 1}">
                                    <div class="text-primary mt-1 flex-shrink-0">
                                        ${qual.icon}
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-1">${qual.title}</h4>
                                        <p class="text-sm text-gray-600">${qual.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Specialties -->
                <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 scale-in-on-scroll">
                    <div class="text-center mb-10">
                        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Áreas de Atuação
                        </h3>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Trabalho com diversas questões psicológicas, sempre com uma abordagem 
                            personalizada e baseada nas necessidades específicas de cada cliente.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        ${specialties.map((specialty, index) => `
                            <div class="bg-white p-4 rounded-xl shadow-sm hover-lift transition stagger-${index + 1}">
                                <p class="text-gray-800 font-medium text-center">${specialty}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}