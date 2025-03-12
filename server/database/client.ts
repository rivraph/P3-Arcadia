import mysql from "mysql2/promise";

// Parse DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// Extraire les informations de la DATABASE_URL
const url = new URL(DATABASE_URL);
console.info(url);
const DB_HOST = url.hostname;
const DB_PORT = Number(url.port);
const DB_USER = url.username;
const DB_PASSWORD = url.password;
const DB_NAME = url.pathname.replace(/^\//, ''); // Supprimer le slash initial

// Créer un pool de connexions
const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Exporter le client
export default client;

// Exporter les types
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DatabaseClient = Pool;
type Result = ResultSetHeader;
type Rows = RowDataPacket[];

export type { DatabaseClient, Result, Rows };