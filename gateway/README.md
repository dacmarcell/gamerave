# Gateway de implementação do Gatekeeper Pattern

## Rotas

- http://localhost:3333 -> API
- http://localhost:9000 -> Gateway

## O que faz

O gateway recebe todas as requisições e as encaminha para a API.

### Validações

- Validações de JWT
- Validações de roles (em breve)

### Rotas válidas

- /api/\*\* -> API
- /\*\* -> Frontend

### Observações

- Rodar com `./mvnw spring-boot:run`
