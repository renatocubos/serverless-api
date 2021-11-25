import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomBytes } from "crypto";
import { database } from "helpers";

jest.setTimeout(20000);

const schemaName = `test_${randomBytes(8).toString("hex")}`;
const mainConn = `postgresql://postgres:postgres@localhost:5432`;

const url = `${mainConn}/${schemaName}?pgbouncer=true`;

let prisma: PrismaClient;
let main: PrismaClient;

beforeAll(async () => {
  try {
    main = new PrismaClient({ datasources: { db: { url: mainConn } } });
    await main.$executeRawUnsafe(`CREATE DATABASE ${schemaName}`);

    process.env.DATABASE_URL = url;
    prisma = new PrismaClient({ datasources: { db: { url } } });
    execSync(`npx prisma migrate deploy`, { env: process.env });

    database.setConnection(prisma);
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`
    );

    await prisma.$disconnect();
    await main.$executeRawUnsafe(`DROP DATABASE ${schemaName};`);
    await main.$disconnect();
    process.exit(1);
  }
}, 60000);

afterAll(async () => {
  try {
    await prisma.$disconnect();
    await main.$executeRawUnsafe(`DROP DATABASE ${schemaName};`);
    await main.$disconnect();
  } catch (error) {
    console.error(error);
  }
});
