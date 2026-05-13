# DT Money API

API desenvolvida com NestJS, Prisma ORM e PostgreSQL para gerenciamento de transações financeiras e usuários.

## Funcionalidades

* CRUD completo de usuários
* Busca de usuários por nome ou email
* Criptografia de senha com bcrypt
* CRUD de transações
* Filtro de transações por tipo
* Filtro de transações por período
* Validação de dados com class-validator
* Documentação com Swagger
* Repository Pattern
* Testes unitários

## Tecnologias

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Swagger
* Jest
* Docker

## Como executar

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/dtmoney"
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o projeto:

```bash
npm run start:dev
```

## Swagger

```txt
http://localhost:3333/api
```
