import { PrismaClient } from "@prisma/client";
import { database } from "helpers";

beforeAll(() => {
  database.setConnection(new PrismaClient());
});

afterAll(async () => {
  await database.prisma.$disconnect();
});
