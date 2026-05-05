# PRD - GameRave

## 1. Visão Geral do Produto
O **GameRave** é uma plataforma social voltada para entusiastas de jogos, permitindo que usuários descubram novos títulos, compartilhem suas opiniões através de avaliações detalhadas e interajam com a comunidade através de um sistema de curtidas. A aplicação foca em uma experiência visual moderna e fluida, centralizando informações sobre jogos e o feedback dos jogadores.

---

## 2. Objetivos Principais
- Fornecer um catálogo centralizado de jogos para consulta.
- Fomentar a comunidade gamer através de reviews e interações sociais.
- Oferecer uma interface de usuário premium e responsiva.
- Garantir segurança e persistência de dados dos usuários e suas interações.

---

## 3. Personas
- **Jogador Casual**: Busca recomendações de novos jogos e quer ler opiniões rápidas antes de comprar.
- **Crítico/Reviewer**: Usuário que gosta de detalhar sua experiência com jogos e construir uma reputação na plataforma.
- **Administrador**: Responsável por manter o catálogo de jogos atualizado (funcionalidade interna/via API).

---

## 4. Funcionalidades (Features)

### 4.1 Autenticação e Usuário
- **Cadastro e Login**: Sistema seguro utilizando JWT (JSON Web Tokens).
- **Perfil do Usuário**: Página dedicada exibindo o histórico de reviews e jogos curtidos pelo usuário.
- **Proteção de Rotas**: Apenas usuários autenticados podem criar reviews ou curtir conteúdos.

### 4.2 Catálogo de Jogos
- **Listagem de Jogos**: Grid visual com informações básicas (título, descrição, imagem).
- **Detalhes do Jogo**: Página individual com informações completas, média de avaliações e lista de reviews associadas.
- **Gerenciamento de Jogos**: Endpoints para criação e exclusão de títulos (reservado para manutenção do sistema).

### 4.3 Sistema de Reviews
- **Criação de Avaliações**: Usuários podem escrever textos sobre os jogos.
- **CRUD de Reviews**: O autor de uma review pode editá-la ou excluí-la.
- **Listagem por Jogo**: Visualização de todas as opiniões da comunidade sobre um título específico.

### 4.4 Interações Sociais
- **Likes em Jogos**: Sistema de "curtir" para destacar os títulos favoritos.
- **Likes em Reviews**: Possibilidade de curtir avaliações de outros usuários, dando relevância a bons conteúdos.

---

## 5. Detalhes Técnicos

### 5.1 Stack de Tecnologia
- **Frontend**: 
  - Framework: **Next.js 15** (App Router).
  - Linguagem: **TypeScript**.
  - Estilização: **Tailwind CSS**.
  - UI: Componentes customizados com Glassmorphism e animações modernas.
- **Backend**:
  - Framework: **Node.js** com **Express**.
  - ORM: **TypeORM**.
  - Linguagem: **TypeScript**.
- **Banco de Dados**:
  - **PostgreSQL** (Relacional).
- **Segurança**:
  - Hashing de senhas: **BcryptJS**.
  - Autenticação: **JWT**.

### 5.2 Arquitetura
- **API RESTful**: Endpoints bem definidos para comunicação entre o frontend e o servidor.
- **Containerização**: Uso de **Docker** e **Docker Compose** para orquestrar os serviços (Web, API e Banco de Dados).
- **Camada de Serviço**: Lógica de negócio separada dos controladores no backend para melhor manutenibilidade.

---

## 6. Design e Experiência do Usuário (UX/UI)
- **Estética Dark Mode**: Design voltado para o público gamer, utilizando tons de cinza escuro, azul e gradientes vibrantes.
- **Responsividade**: Interface adaptável para dispositivos móveis, tablets e desktops.
- **Feedback Visual**: Uso de micro-interações, estados de hover e notificações (react-hot-toast) para ações do usuário.

---

## 7. Roadmap Futuro (Sugestões)
- **Sistema de Notas**: Adicionar avaliação numérica (ex: 0 a 10) além do texto da review.
- **Categorias e Tags**: Filtragem de jogos por gênero (RPG, FPS, Ação, etc.).
- **Integração com APIs Externas**: Sincronização automática de dados de jogos (ex: IGDB API).
- **Sistema de Comentários**: Permitir responder a reviews de outros usuários.
