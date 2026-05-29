# Gestão Financeira

Aplicação fullstack com frontend React Native + Expo e backend Express.js + Prisma.

## Visão geral

- `gestao-financeira/`: app mobile/web com Expo e React Native.
- `gestao-financeira-api/`: API REST construída em Express.js e Prisma.
- Banco de dados recomendado: MySQL executado em container Docker.

## Requisitos

- Node.js 18+ / npm
- Docker (para rodar o MySQL)
- Expo CLI (opcional, também funciona via `npm run`)

## Banco de dados recomendado

Use o MySQL em container Docker conforme o comando abaixo:

```bash
docker run --name gestao-financeira-db -e MYSQL_ROOT_PASSWORD=<root_password> -p 3306:3306 -d mysql:9.7.0
```

Substitua `<root_password>` pela senha que desejar.

### Exemplo de URL de conexão

No backend, crie um arquivo `.env` em `gestao-financeira-api/` com:

```env
DATABASE_URL="mysql://root:<root_password>@127.0.0.1:3306/gestao_financeira"
```

Ajuste o usuário, a senha e o nome do banco conforme necessário.

## Estrutura do repositório

- `gestao-financeira/`
  - app React Native / Expo
  - usa `src/services/api.js` para se conectar ao backend
  - aceita `EXPO_PUBLIC_API_URL` para alterar a URL base da API
- `gestao-financeira-api/`
  - backend Express.js
  - usa Prisma com datasource MySQL em `prisma/schema.prisma`
  - endpoints REST em `src/routes/`

## Backend (API)

1. Instale dependências:

```bash
cd gestao-financeira-api
npm install
```

2. Crie o arquivo `.env` com a variável `DATABASE_URL`.

3. Execute migrações Prisma:

```bash
npm run prisma:migrate
```

4. (Opcional) Rode o seed:

```bash
npm run prisma:seed
```

5. Inicie a API:

```bash
npm run dev
```

A API padrão será exposta em `http://localhost:3000`.

## Usando `openapi.json`

O arquivo `openapi.json` está disponível na raiz do repositório. Ele descreve os endpoints do backend e pode ser importado em clientes HTTP compatíveis, como Postman ou Insomnia.

### Postman

1. Abra o Postman.
2. Clique em `Import`.
3. Selecione a aba `File`.
4. Escolha `openapi.json` no diretório do projeto.
5. Importe as rotas e teste os endpoints.

### Insomnia

1. Abra o Insomnia.
2. Clique em `Create` > `Request Collection` ou `Import/Export` > `Import Data`.
3. Selecione `From File`.
4. Importe o arquivo `openapi.json`.
5. O Insomnia criará as rotas e permitirá testar a API.

### URL do servidor

O spec utiliza `http://localhost:3000` como servidor padrão. Caso a API esteja em outro host, ajuste o servidor nas configurações do cliente HTTP após a importação.

## Frontend (App Expo)

1. Instale dependências:

```bash
cd gestao-financeira
npm install
```

2. Rode o app:

```bash
npm start
```

Ou diretamente:

```bash
npm run android
npm run ios
npm run web
```

### Configurando o endpoint da API

O app usa por padrão `http://localhost:3000`.
Se a API estiver em outro host ou em uma máquina remota, configure a variável de ambiente:

```bash
EXPO_PUBLIC_API_URL=http://<seu-host>:3000 npm start
```

### Observações sobre emuladores

- Android Emulator: se usar `localhost` e a API não responder, use o IP do host ou configure `EXPO_PUBLIC_API_URL`.
- iOS Simulator: `localhost` normalmente funciona.

## Rotas importantes da API

- `GET /categories`
- `POST /categories`
- `GET /transactions`
- `POST /transactions`
- `GET /summary`

## Notas finais

- O projeto foi criado para ser executado localmente com MySQL.
- Se quiser usar outra instância MySQL, concentre-se em atualizar apenas a variável `DATABASE_URL` no backend.
- O frontend pode ser executado em `web` e em dispositivos móveis com o mesmo código.
