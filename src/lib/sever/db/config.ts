import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '$env/static/private';
import maridb from 'mariadb';

let pool: maridb.Pool | null = null;

export function getPool() {
  if (! pool) {
    pool = maridb.createPool({
      host: DB_HOST,
      port: parseInt(DB_PORT),
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      connectionLimit: 5,
      multipleStatements: true,
      bigIntAsNumber: true,
    });
  }
  return pool;
}