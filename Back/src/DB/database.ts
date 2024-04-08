import knex, { Knex } from "knex";

class Database {
  private static instance: Database;
  private _knex: Knex;

  private constructor() {
    this._knex = knex({
      client: "pg",
      connection: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || "your_database_name",
        user: process.env.DB_USER || "your_username",
        password: process.env.DB_PASSWORD || "your_password",
      },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getKnex(): Knex {
    return this._knex;
  }
}

export default Database.getInstance();
