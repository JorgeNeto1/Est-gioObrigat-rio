# PsiAgende - Sistema de Agendamento para Psicóloga

Sistema completo de agendamento de consultas para a psicóloga Laura Mantovani Mira, desenvolvido com Node.js, Express e frontend em HTML/CSS/JavaScript vanilla.

## 🚀 Funcionalidades

### Para Pacientes
- ✅ Cadastro e login de pacientes
- ✅ Agendamento de consultas online
- ✅ Visualização de consultas agendadas
- ✅ Seleção de data e horário disponível
- ✅ Diferentes tipos de sessão (Individual, Casal, Online)
- ✅ Sistema de notificações

### Para Psicóloga
- ✅ Dashboard administrativo
- ✅ Gerenciamento de consultas
- ✅ Visualização de pacientes
- ✅ Controle de status das consultas
- ✅ Estatísticas e relatórios

### Recursos Gerais
- ✅ Design responsivo e moderno
- ✅ Autenticação segura com JWT
- ✅ Interface intuitiva e acessível
- ✅ Animações e micro-interações
- ✅ Sistema de notificações toast
- ✅ Validação de formulários
- ✅ Persistência de dados em JSON

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Controle de CORS
- **uuid** - Geração de IDs únicos

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Grid/Flexbox
- **JavaScript ES6+** - Lógica da aplicação
- **Fetch API** - Comunicação com backend
- **CSS Animations** - Animações e transições

### Recursos de Design
- **Design System** - Cores, tipografia e espaçamentos consistentes
- **Responsive Design** - Adaptável a todos os dispositivos
- **Accessibility** - Suporte a leitores de tela e navegação por teclado
- **Modern UI** - Interface limpa e profissional

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone <repository-url>
cd psiagenda-fullstack
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor backend**
```bash
npm start
```

4. **Acesse a aplicação**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

### Scripts Disponíveis

```bash
# Iniciar servidor de produção
npm start

# Iniciar servidor de desenvolvimento (com nodemon)
npm run dev

# Servir frontend separadamente (opcional)
npm run frontend
```

## 🏗️ Estrutura do Projeto

```
psiagenda-fullstack/
├── backend/
│   ├── data/                 # Arquivos JSON para persistência
│   ├── middleware/           # Middlewares (autenticação, etc.)
│   ├── routes/              # Rotas da API
│   ├── utils/               # Utilitários (dataStore, etc.)
│   └── server.js            # Servidor principal
├── frontend/
│   ├── js/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── utils/          # Utilitários do frontend
│   │   ├── router.js       # Roteamento client-side
│   │   └── app.js          # Aplicação principal
│   ├── styles/
│   │   ├── main.css        # Estilos base
│   │   ├── components.css  # Estilos de componentes
│   │   ├── dashboard.css   # Estilos do dashboard
│   │   └── animations.css  # Animações
│   └── index.html          # Página principal
├── package.json
└── README.md
```

## 🔐 Autenticação

### Contas Padrão

**Psicóloga (Administradora)**
- Email: `laura@lauramantovani.com.br`
- Senha: `admin123`

**Pacientes**
- Podem se cadastrar através da página de registro

### Sistema de Autenticação
- JWT (JSON Web Tokens) para autenticação
- Senhas criptografadas com bcrypt
- Middleware de proteção de rotas
- Sessões persistentes no localStorage

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de paciente
- `GET /api/auth/verify` - Verificação de token

### Consultas
- `GET /api/appointments` - Listar consultas
- `POST /api/appointments` - Criar consulta
- `PATCH /api/appointments/:id/status` - Atualizar status
- `DELETE /api/appointments/:id` -Cancelar consulta
- `GET /api/appointments/available-slots/:date` - Horários disponíveis

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `GET /api/users/patients` - Listar pacientes (admin)

## 🎨 Design System

### Cores Principais
- **Primary**: #8B5CF6 (Violet)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)
- **Gray Scale**: #F9FAFB → #111827

### Tipografia
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: 0.875rem → 3rem

### Espaçamento
- **Base**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 🔧 Funcionalidades Técnicas

### Frontend
- **SPA (Single Page Application)** com roteamento client-side
- **Componentes modulares** em JavaScript vanilla
- **Estado global** para autenticação e dados
- **API client** com tratamento de erros
- **Sistema de notificações** toast
- **Validação de formulários** em tempo real
- **Animações CSS** e micro-interações

### Backend
- **API RESTful** com Express.js
- **Autenticação JWT** com middleware
- **Persistência em JSON** (facilmente migrável para banco de dados)
- **Validação de dados** server-side
- **Tratamento de erros** centralizado
- **CORS configurado** para desenvolvimento

## 📱 Responsividade

- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Grid System** - Layout flexível com CSS Grid e Flexbox
- **Touch Friendly** - Botões e áreas de toque adequadas

## ♿ Acessibilidade

- **ARIA Labels** - Descrições para leitores de tela
- **Navegação por teclado** - Suporte completo
- **Contraste adequado** - WCAG 2.1 AA
- **Skip Links** - Navegação rápida
- **Focus Management** - Estados de foco visíveis

## 🚀 Deploy

### Opções de Deploy

1. **Heroku**
```bash
# Adicionar buildpack do Node.js
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

2. **Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

3. **DigitalOcean/AWS/GCP**
- Configure PM2 para gerenciamento de processos
- Use nginx como proxy reverso
- Configure SSL com Let's Encrypt

### Variáveis de Ambiente

```bash
# .env (opcional)
PORT=3000
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## 🧪 Testes

Para adicionar testes ao projeto:

```bash
# Instalar dependências de teste
npm install --save-dev jest supertest

# Executar testes
npm test
```

## 📈 Melhorias Futuras

- [ ] Integração com banco de dados (PostgreSQL/MongoDB)
- [ ] Sistema de notificações por email
- [ ] Integração com calendário (Google Calendar)
- [ ] Chat em tempo real
- [ ] Sistema de pagamentos
- [ ] Relatórios avançados
- [ ] App mobile (React Native)
- [ ] Backup automático de dados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença UniFil. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto:

- **Email**: jorgenetom22@gmail.com
- **WhatsApp**: (11) 99876-5432

---

**Desenvolvido com ❤️ para Laura Mantovani Mira - Psicóloga**