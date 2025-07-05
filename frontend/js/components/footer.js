// Footer component
function createFooter() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Navegação',
            links: [
                { name: 'Início', href: '#inicio' },
                { name: 'Sobre', href: '#sobre' },
                { name: 'Serviços', href: '#servicos' },
                { name: 'Depoimentos', href: '#depoimentos' },
                { name: 'Contato', href: '#contato' }
            ]
        },
        {
            title: 'Serviços',
            links: [
                { name: 'Terapia Individual', href: '#servicos' },
                { name: 'Terapia de Casal', href: '#servicos' },
                { name: 'Terapia Online', href: '#servicos' },
                { name: 'Primeira Consulta', href: '#contato' }
            ]
        },
        {
            title: 'Especialidades',
            links: [
                { name: 'Ansiedade', href: '#sobre' },
                { name: 'Depressão', href: '#sobre' },
                { name: 'Autoestima', href: '#sobre' },
                { name: 'Relacionamentos', href: '#sobre' }
            ]
        }
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/lauramantovani.psi',
            icon: `<svg class="icon" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <path d="M17.5 6.5h.01"/>
                    </svg>`
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/lauramantovani',
            icon: `<svg class="icon" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>`
        }
    ];

    return `
        <footer class="footer">
            <!-- Main Footer -->
            <div class="footer-content">
                <div class="footer-grid">
                    <!-- Brand -->
                    <div class="footer-section">
                        <div class="flex items-center space-x-2 mb-6">
                            <svg class="icon icon-lg text-primary-400" viewBox="0 0 24 24">
                                <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z"/>
                                <path d="M9 6h6M9 10h6M9 14h6M9 18h6"/>
                            </svg>
                            <span class="text-xl font-bold text-white">Laura Mantovani</span>
                        </div>
                        
                        <div class="space-y-2 mb-6">
                            <p class="text-primary-400 font-medium">
                                Psicóloga Clínica
                            </p>
                            <p class="text-gray-300" style="line-height: 1.6;">
                                Cuidando da sua saúde mental com profissionalismo, 
                                empatia e dedicação há mais de 8 anos.
                            </p>
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center gap-2 text-gray-300">
                                <svg class="icon icon-sm" viewBox="0 0 24 24">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <span>(11) 3456-7890</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray-300">
                                <svg class="icon icon-sm" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <path d="M22 6l-10 7L2 6"/>
                                </svg>
                                <span>contato@lauramantovani.com.br</span>
                            </div>
                        </div>
                    </div>

                    <!-- Links -->
                    ${footerLinks.map(section => `
                        <div class="footer-section">
                            <h3>${section.title}</h3>
                            <ul class="space-y-2">
                                ${section.links.map(link => `
                                    <li>
                                        <a href="${link.href}" onclick="scrollToSection('${link.href.substring(1)}')" class="hover:text-primary-400 transition">
                                            ${link.name}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <!-- Social Links -->
                <div class="border-t border-gray-700 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div class="flex items-center gap-4">
                            <span class="text-gray-300">Siga-me nas redes sociais:</span>
                            <div class="flex gap-3">
                                ${socialLinks.map(social => `
                                    <a
                                        href="${social.href}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition hover-scale"
                                        aria-label="${social.name}"
                                    >
                                        ${social.icon}
                                    </a>
                                `).join('')}
                            </div>
                        </div>

                        <div class="text-center md:text-right">
                            <p class="text-gray-300 text-sm">
                                Horário de Atendimento
                            </p>
                            <p class="text-white font-medium">
                                Segunda a Sexta: 8h às 18h
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Footer -->
            <div class="border-t border-gray-700 bg-gray-950">
                <div class="footer-content py-6">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div class="text-gray-400 text-sm">
                            © ${currentYear} Laura Mantovani Mira - Psicologia LTDA. Todos os direitos reservados.
                        </div>
                        
                        <div class="flex gap-6 text-sm">
                            <button class="text-gray-400 hover:text-white transition">
                                Política de Privacidade
                            </button>
                            <button class="text-gray-400 hover:text-white transition">
                                Termos de Uso
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- WhatsApp Button -->
        <a
            href="https://wa.me/5511998765432?text=${encodeURIComponent('Olá! Gostaria de agendar uma consulta com a Psicóloga Laura Mantovani.')}"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-button no-print"
            aria-label="Contato via WhatsApp"
        >
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
        </a>
    `;
}