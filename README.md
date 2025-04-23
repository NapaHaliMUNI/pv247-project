# PV247 - Team project

## Installation

```shell
npm i
```

## Environment setup

```shell
# Copy development env template file and modify it with correct DB URL and auth token.
# Both env variables must be set, auth token can't be empty - you can set it to something random if you don't have auth token for local db.
cp .env.development.template .env.development
```

```shell
# Copy production env template file and modify it with correct DB URL and auth token.
cp .env.production.template .env.production
```

## Development

### Run Next.js dev server

### Run a local turso database

```shell
turso dev --db-file dev.db
```

### Run a local drizzle studio

```shell
npm run drizzle-studio
```

```shell
npm run dev
```

### If the schema is changed, generate a new migration and apply it

```shell
npm run drizzle-migrate
```

## Production

### Build and start locally for production testing

```shell
npm run prod
```