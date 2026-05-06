# 🎮 GameRave — Web (Frontend)

Frontend do projeto **GameRave**, construído com [Next.js 15](https://nextjs.org/) e [React 19](https://react.dev/). É a interface principal com a qual os usuários interagem para descobrir jogos, ler e escrever reviews, curtir conteúdo e gerenciar seu perfil.

---

## 📐 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | ^15 | Framework React (App Router) |
| [React](https://react.dev/) | ^19 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | Estilização utilitária |
| [react-hot-toast](https://react-hot-toast.com/) | ^2.6 | Notificações toast |

---

## 📁 Estrutura de Diretórios

```
web/
├── public/                  # Arquivos estáticos públicos
├── src/
│   ├── app/                 # Rotas e páginas (Next.js App Router)
│   │   ├── layout.tsx       # Layout raiz — Navbar, AuthProvider, Toaster
│   │   ├── page.tsx         # Página inicial — listagem de jogos
│   │   ├── games/
│   │   │   └── [gameID]/    # Página de detalhe de um jogo
│   │   ├── login/           # Página de login
│   │   ├── register/        # Página de cadastro
│   │   └── profile/
│   │       └── reviews/     # Dashboard de reviews do usuário logado
│   ├── components/          # Componentes React reutilizáveis
│   ├── actions/             # Server Actions do Next.js
│   │   └── auth.ts          # Gerenciamento de cookies de autenticação
│   ├── context/
│   │   └── AuthContext.tsx  # Contexto global de autenticação e likes
│   ├── lib/
│   │   └── api.ts           # Cliente HTTP centralizado (apiFetch)
│   ├── types/
│   │   └── index.ts         # Interfaces TypeScript (Game, Review)
│   └── constants.ts         # Constantes globais (ex.: BASE_URL)
├── .env                     # Variáveis de ambiente (não versionado)
├── .env.example             # Exemplo de variáveis necessárias
├── Dockerfile               # Imagem Docker multi-stage para produção
├── next.config.ts           # Configuração do Next.js
└── tailwind.config.ts       # Configuração do Tailwind CSS
```

---

## 🗺️ Rotas da Aplicação

| Rota | Descrição | Autenticação |
|---|---|---|
| `/` | Página inicial com todos os jogos em destaque | Pública |
| `/games/[gameID]` | Detalhes de um jogo e suas reviews | Pública |
| `/login` | Formulário de login | Pública (redireciona se autenticado) |
| `/register` | Formulário de cadastro de novo usuário | Pública |
| `/profile/reviews` | Dashboard com as reviews do usuário logado | Privada |

---

## 🧩 Componentes

| Componente | Descrição |
|---|---|
| `Navbar` | Barra de navegação global com link de perfil e logout |
| `GameCard` | Card de jogo exibido na listagem da home |
| `GameLikeButton` | Botão de curtir/descurtir um jogo |
| `ReviewCard` | Card de review com autor, conteúdo e ações |
| `ReviewLikeButton` | Botão de curtir/descurtir uma review |
| `ReviewHeaderActions` | Ações de editar/deletar review (para o autor) |
| `WriteReviewModal` | Modal para criar uma nova review |
| `EditReviewModal` | Modal para editar uma review existente |
| `DeleteConfirmModal` | Modal de confirmação antes de excluir uma review |
| `BackButton` | Botão genérico de voltar à página anterior |
| `ShareButton` | Botão para compartilhar a URL atual |

---

## ⚙️ Arquitetura e Padrões

### Autenticação via Cookie HTTP-Only

O fluxo de autenticação é baseado em JWT armazenado em um cookie `httpOnly`, gerenciado por Server Actions do Next.js:

1. O usuário faz login → a API retorna um JWT.
2. O Server Action `setAuthCookie` armazena o token em um cookie seguro.
3. No `layout.tsx`, o token é lido no servidor e decodificado para hidratar o `AuthProvider` com o usuário inicial.
4. No logout, `removeAuthCookie` apaga o cookie.

```
Client → Server Action (auth.ts) → Cookie httpOnly
                                        ↓
                               RootLayout (server)
                                        ↓
                               AuthProvider (client)
```

### Cliente HTTP Centralizado (`apiFetch`)

Todas as chamadas à API passam pela função `apiFetch` em `src/lib/api.ts`. Ela é um **Server Action** que:
- Lê automaticamente o cookie `auth_token` e injeta o header `Authorization: Bearer <token>`.
- Detecta o `Content-Type` da resposta e faz o parse para JSON ou texto.
- Retorna um objeto tipado `ApiResponse<T>` com `{ ok, status, data }`, garantindo que objetos serializáveis sejam repassados para os Client Components.

### Contexto de Autenticação e Likes (`AuthContext`)

O `AuthContext` gerencia globalmente:
- O usuário autenticado (`user`).
- Os IDs de jogos e reviews curtidos pelo usuário (`userLikes`).
- Funções de controle: `loginContext`, `logoutContext`, `toggleGameLikeLocally`, `toggleReviewLikeLocally`.

Os likes são atualizados **otimisticamente** no lado do cliente para uma UX mais responsiva.

---

## 🚀 Como Executar

### Desenvolvimento local

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie o arquivo `.env` baseado no exemplo:
   ```bash
   cp .env.example .env
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API / Gateway | `http://localhost:9000/api` |

> **Atenção:** Em ambiente Docker, essa variável deve apontar para o serviço `gateway` (ex.: `http://gateway:9000/api`).

---

## 🐳 Docker

O `Dockerfile` utiliza uma build **multi-stage**:

1. **Build stage**: instala dependências e compila o projeto com `npm run build`.
2. **Production stage**: copia apenas os artefatos necessários (`.next`, `public`, `node_modules`) para uma imagem enxuta.

Para executar com Docker Compose (a partir da raiz do projeto):
```bash
docker compose up --build web
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor em modo produção |
| `npm run lint` | Executa o ESLint para análise de código |
