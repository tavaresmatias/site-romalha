# Site Romalha Pereira - Documentação

## Visão Geral

Site profissional para Romalha Pereira, advogada especialista em direito imobiliário e legalização de imóveis de alta complexidade.

## Estrutura do Projeto

```
site-romalha/
├── index.html          # Página principal do site
├── css/
│   └── styles.css      # Estilos CSS do site
├── js/
│   └── script.js       # JavaScript para interatividade
├── README.md           # Documentação do projeto
├── CLAUDE.md           # Este arquivo
└── .gitignore          # Arquivos a ignorar no git
```

## Seções da Página

### Header
- Logo com nome "Romalha Pereira" e subtítulo "ADVOGACIA IMOBILIÁRIA"
- Botão WhatsApp flutuante (verde)

### Hero Section
- Título principal: "Legalização de imóveis com expertise e segurança jurídica"
- Descrição dos serviços
- Botão CTA "VEJA NOSSOS ARTIGOS"

### Articles Section
- Grade com 3 cards de artigos
- Cada card contém:
  - Tag de categoria (cinza)
  - Título do artigo
  - Descrição/preview
- Botão "MAIS CONTEÚDOS" para ver mais artigos

### About Section
- Foto/placeholder de perfil (lado esquerdo)
- Informações sobre Romalha:
  - Formação acadêmica
  - Trajetória profissional
  - Especialidades

### Footer
- Logo e subtítulo repetido do header
- Botão WhatsApp

## Design

- **Cores principais:**
  - Cinza escuro: #2d2d2d (primário)
  - Cinza médio: #5a5a5a (secundário)
  - Verde limão: #7cbb00 (accent - WhatsApp)
  - Branco: #f5f5f5 (background claro)

- **Typography:**
  - Font family: System fonts (SF Pro Display, etc)
  - Pesos: 300 (light), 600 (bold)
  - Espaçamento de letras para títulos

## Responsividade

Site é totalmente responsivo com breakpoint em 768px para dispositivos móveis.

## Funcionalidades JavaScript

- Smooth scroll para links internos (#artigos)
- Animações ao scroll usando Intersection Observer
- Cards de artigos fade-in ao entrar na viewport

## Próximas Melhorias

- [ ] Integração com CMS para gerenciar artigos
- [ ] Página de artigos individual com conteúdo completo
- [ ] Integração com WhatsApp API para chat
- [ ] Formulário de contato
- [ ] Blog/News section
- [ ] Galeria de casos de sucesso/testimoniais
- [ ] SEO optimization
- [ ] Analytics integration

## Deploy

Para fazer deploy do site:

1. Editar os links do WhatsApp com o número correto
2. Adicionar foto real de Romalha em lugar do placeholder
3. Adicionar artigos reais ao invés do placeholder content
4. Configurar domínio customizado (e.g., romalha.com.br)

## Contato

Instagram: [@legalizzare.imoveis](https://www.instagram.com/legalizzare.imoveis/)
