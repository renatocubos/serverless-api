# serverless-api

This is a serverless framework monorepo

### Usage:

Install dependencies:

```bash
npm ci
```

### Migrating from existing database

First connect to the database by setting the DATABASE_URL environment variable and run:

```bash
npm run prisma:pull
```

After that, update the **prisma.schema** file as you wish and generate a new client:

```bash
npm run prisma:generate
```

### Deployment

Deploy service to stage "dev":

```bash
npm run deploy:dev "nameOfService"
```

Deploy service to stage "prod":

```bash
npm run deploy:prod "nameOfService"
```
