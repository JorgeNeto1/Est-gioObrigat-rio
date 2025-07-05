// Testimonials component
function createTestimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Maria S.',
            age: '32 anos',
            rating: 5,
            text: 'A Laura me ajudou muito a lidar com minha ansiedade. Suas técnicas de TCC foram fundamentais para eu conseguir controlar minhas crises. Recomendo muito!',
            treatment: 'Transtorno de Ansiedade'
        },
        {
            id: 2,
            name: 'João M.',
            age: '28 anos',
            rating: 5,
            text: 'Profissional excepcional! Me sinto muito mais confiante após as sessões. O ambiente do consultório é muito acolhedor e a Laura tem uma escuta incrível.',
            treatment: 'Autoestima e Desenvolvimento Pessoal'
        },
        {
            id: 3,
            name: 'Ana e Carlos',
            age: 'Casal',
            rating: 5,
            text: 'A terapia de casal salvou nosso relacionamento. Laura nos ajudou a nos comunicar melhor e a resolver nossos conflitos de forma saudável.',
            treatment: 'Terapia de Casal'
        },
        {
            id: 4,
            name: 'Pedro L.',
            age: '45 anos',
            rating: 5,
            text: 'Depois de anos evitando terapia, finalmente encontrei uma profissional que me fez sentir à vontade. Laura é muito competente e empática.',
            treatment: 'Depressão e Burnout'
        },
        {
            id: 5,
            name: 'Sofia R.',
            age: '24 anos',
            rating: 5,
            text: 'As sessões online foram perfeitas para minha rotina. Laura conseguiu me ajudar a superar minha fobia social e hoje me sinto muito mais segura.',
            treatment: 'Fobia Social'
        }
    ];

    return `
        <section id="depoimentos" class="py-20 px-4 bg-white">
            <div class="container">
                <div class="text-center mb-16 fade-in-on-scroll">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Depoimentos
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Veja o que meus clientes dizem sobre o processo terapêutico e os 
                        resultados alcançados em nossas sessões.
                    </p>
                </div>

                <!-- Main Testimonial -->
                <div class="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 mb-8 scale-in-on-scroll">
                    <div class="absolute top-6 left-6">
                        <svg class="icon icon-xl text-primary-300" viewBox="0 0 24 24">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                        </svg>
                    </div>

                    <div class="max-w-4xl mx-auto text-center" id="main-testimonial">
                        <!-- Content will be populated by JavaScript -->
                    </div>

                    <!-- Navigation -->
                    <div class="flex justify-center items-center gap-4 mt-8">
                        <button id="prev-testimonial" class="p-2 rounded-full bg-white/80 hover:bg-white transition shadow-md hover-scale">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </button>

                        <div class="flex gap-2" id="testimonial-dots">
                            <!-- Dots will be populated by JavaScript -->
                        </div>

                        <button id="next-testimonial" class="p-2 rounded-full bg-white/80 hover:bg-white transition shadow-md hover-scale">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Testimonial Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-in-up-on-scroll">
                    ${testimonials.slice(0, 3).map((testimonial, index) => `
                        <div class="card hover-lift stagger-${index + 1}">
                            <div class="card-body">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="flex">
                                        ${Array(testimonial.rating).fill().map(() => `
                                            <svg class="icon icon-sm text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                        `).join('')}
                                    </div>
                                    <svg class="icon text-primary-300" viewBox="0 0 24 24">
                                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                                    </svg>
                                </div>

                                <p class="text-gray-700 mb-4" style="line-height: 1.6;">
                                    "${testimonial.text}"
                                </p>

                                <div class="space-y-1">
                                    <div class="font-bold text-gray-900">
                                        ${testimonial.name}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        ${testimonial.age}
                                    </div>
                                    <div class="text-xs text-primary font-medium">
                                        ${testimonial.treatment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Trust Indicators -->
                <div class="mt-16 text-center fade-in-on-scroll">
                    <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white hover-lift">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="hover-scale">
                                <div class="text-3xl font-bold mb-2">500+</div>
                                <div class="text-primary-200">Clientes Atendidos</div>
                            </div>
                            <div class="hover-scale">
                                <div class="text-3xl font-bold mb-2">8</div>
                                <div class="text-primary-200">Anos de Experiência</div>
                            </div>
                            <div class="hover-scale">
                                <div class="text-3xl font-bold mb-2">95%</div>
                                <div class="text-primary-200">Satisfação dos Clientes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script>
            // Initialize testimonials carousel
            document.addEventListener('DOMContentLoaded', function() {
                initializeTestimonials(${JSON.stringify(testimonials)});
            });
        </script>
    `;
}

function initializeTestimonials(testimonials) {
    let currentIndex = 0;
    const mainTestimonial = document.getElementById('main-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    function renderMainTestimonial(index) {
        const testimonial = testimonials[index];
        mainTestimonial.innerHTML = `
            <div class="flex justify-center mb-4">
                ${Array(testimonial.rating).fill().map(() => `
                    <svg class="icon text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                `).join('')}
            </div>

            <blockquote class="text-xl md:text-2xl text-gray-800 italic mb-8" style="line-height: 1.6;">
                "${testimonial.text}"
            </blockquote>

            <div class="space-y-2">
                <div class="text-lg font-bold text-gray-900">
                    ${testimonial.name}
                </div>
                <div class="text-gray-600">
                    ${testimonial.age}
                </div>
                <div class="text-sm text-primary font-medium">
                    ${testimonial.treatment}
                </div>
            </div>
        `;
    }

    function renderDots() {
        dotsContainer.innerHTML = testimonials.map((_, index) => `
            <button 
                class="w-3 h-3 rounded-full transition ${
                    index === currentIndex ? 'bg-primary' : 'bg-primary-300'
                }"
                onclick="setTestimonial(${index})"
                aria-label="Ir para depoimento ${index + 1}"
            ></button>
        `).join('');
    }

    function setTestimonial(index) {
        currentIndex = index;
        renderMainTestimonial(currentIndex);
        renderDots();
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        setTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        setTestimonial(currentIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-advance
    setInterval(nextTestimonial, 5000);

    // Make functions global for onclick handlers
    window.setTestimonial = setTestimonial;

    // Initial render
    renderMainTestimonial(0);
    renderDots();
}