import { PrismaClient } from "@prisma/client";

export class Database {
  private _prisma?: PrismaClient;

  setConnection(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  get prisma() {
    if (this._prisma) {
      return this._prisma;
    }

    throw new Error("Connetion not set");
  }
}

export const database = new Database();

if (["dev", "prod"].includes(process.env.STAGE ?? "")) {
  const client = new PrismaClient({ log: ["warn", "error"] });
  database.setConnection(client);
}
