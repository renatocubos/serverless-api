CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- CreateTable
CREATE TABLE "notes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR NOT NULL,
    "title" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
