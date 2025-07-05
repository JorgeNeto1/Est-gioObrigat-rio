// Hero component
function createHero(onScheduleClick) {
    return `
        <section id="inicio" class="py-20 px-4">
            <div class="container">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style="min-height: 600px;">
                    <!-- Content -->
                    <div class="space-y-8 fade-in-on-scroll">
                        <div class="space-y-4">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900" style="line-height: 1.1;">
                                Laura Mantovani
                                <span class="block text-primary">Mira</span>
                            </h1>
                            <p class="text-xl text-gray-600 font-medium">
                                Psicóloga Clínica
                            </p>
                        </div>

                        <div class="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                            <blockquote class="text-lg md:text-xl text-gray-700 italic" style="line-height: 1.6;">
                                "Cuidar da mente é um ato de coragem. Aqui você encontra escuta, empatia e apoio."
                            </blockquote>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="btn btn-primary btn-lg hover-lift" onclick="${onScheduleClick}">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <path d="M16 2v4M8 2v4M3 10h18"/>
                                </svg>
                                Agendar Consulta
                            </button>
                            <button class="btn btn-secondary btn-lg hover-lift" onclick="scrollToSection('sobre')">
                                Saiba Mais
                            </button>
                        </div>

                        <!-- Trust indicators -->
                        <div class="flex flex-wrap gap-6 pt-4">
                            <div class="flex items-center gap-2 text-gray-600">
                                <svg class="icon text-primary" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                <span class="text-sm font-medium">Atendimento Seguro</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray-600">
                                <svg class="icon text-primary" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                                <span class="text-sm font-medium">Abordagem Humanizada</span>
                            </div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="relative slide-in-right-on-scroll">
                        <div class="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 shadow-2xl hover-lift">
                            <div class="bg-white rounded-2xl p-8 shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Psicóloga Laura Mantovani em seu consultório"
                                    class="w-full h-96 object-cover rounded-xl"
                                    loading="eager"
                                />
                            </div>
                        </div>
                        <!-- Decorative elements -->
                        <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-float"></div>
                        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400 rounded-full opacity-15 animate-float" style="animation-delay: 1s;"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
}