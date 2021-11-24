import type { PoolClient } from "pg";
import { Pool } from "pg";

export type DBClient = PoolClient;

export class Postgres {
  private readonly pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({
      max: 1,
      min: 0,
      idleTimeoutMillis: 120000,
      connectionTimeoutMillis: 10000,
    });

    this.pool.on("error", err => {
      console.error("Unexpected error on idle client", err);
      process.exit(1);
    });
  }

  async connect(): Promise<DBClient> {
    this.client = await this.pool.connect();
    return this.client;
  }

  release() {
    if (this.client) {
      this.client.release();
    }
  }

  async end() {
    this.release();
    await this.pool.end();
  }
}
