# 🚀 GameRave Gateway (Gatekeeper Pattern)

Este projeto implementa o **Gatekeeper Pattern** utilizando **Spring Cloud Gateway**. Ele atua como o ponto central de entrada para todo o ecossistema GameRave, gerenciando o roteamento de tráfego e a segurança (autenticação JWT).

## 🛡️ O que é o Gatekeeper Pattern?

O padrão **Gatekeeper** (ou API Gateway) é uma camada que protege as APIs internas, garantindo que apenas requisições validadas e autenticadas cheguem aos serviços de backend. Isso centraliza a lógica de segurança e simplifica os microserviços/serviços internos.

## ✨ Funcionalidades Principais

- **Roteamento Centralizado**: Redireciona o tráfego para o Frontend (`web`) ou Backend (`api`) com base no path da URL.
- **Validação de JWT**: Filtro global que valida tokens Bearer em todas as requisições para a API.
- **Strip Prefix**: Limpa prefixos de rotas antes de repassar para os serviços (ex: `/api/games` -> `/games` na API).
- **Segurança**: Impede o acesso direto aos serviços internos, expondo apenas a porta do Gateway.

## 🛠️ Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.x**
- **Spring Cloud Gateway**
- **jjwt (Java JWT)** para manipulação de tokens.

## 🚦 Rotas Configuradas

| Path | Destino | Descrição |
| :--- | :--- | :--- |
| `/api/**` | `http://api:3333` | Roteia para o Backend (remove o prefixo `/api`). |
| `/**` | `http://web:3000` | Roteia qualquer outra requisição para o Frontend. |

## ⚙️ Configuração (Variáveis de Ambiente)

O projeto pode ser configurado via variáveis de ambiente, especialmente útil ao rodar com Docker:

| Variável | Padrão | Descrição |
| :--- | :--- | :--- |
| `API_URL` | `http://localhost:3333` | Endereço do serviço de API. |
| `WEB_URL` | `http://localhost:3000` | Endereço do serviço Web (Frontend). |
| `JWT_SECRET` | `default_secret_key...` | Chave secreta para validação dos tokens JWT. |

## 🚀 Como Executar

### Localmente (Desenvolvimento)
Certifique-se de ter o JDK 17 instalado e execute:
```bash
./mvnw spring-boot:run
```

### Via Docker
O gateway está integrado ao `docker-compose.yml` na raiz do projeto.
```bash
docker-compose up --build
```

---
*Desenvolvido por Dacti para o projeto Gamerave.*
