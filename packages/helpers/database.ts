import type { PoolClient } from "pg";
import { Pool } from "pg";

export class Database {
  private readonly pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({
      max: 1,
      min: 0,
      idleTimeoutMillis: 120000,
      connectionTimeoutMillis: 10000,
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(1);
    });
  }

  async connect() {
    this.client = await this.pool.connect();
    return this.client;
  }

  release() {
    if (this.client) {
      this.client.release();
    }
  }
}
