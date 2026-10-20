
import pg from 'pg';
import { config } from '../config/config.js';

const { Pool } = pg;

let pool;

function getPool() {
  if (!config.db.enabled) {
    throw new Error(
      'Database integration is disabled. Set DB_ENABLED=true.'
    );
  }

  if (!pool) {
    const { host, port, database, user, password, ssl } = config.db;

    if (!host || !database || !user || !password) {
      throw new Error('Incomplete database configuration');
    }

    pool = new Pool({
      host,
      port,
      database,
      user,
      password,
      ssl: ssl ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 5000,
      query_timeout: 10000,
      max: 5
    });
  }

  return pool;
}

export async function executeQuery(sql, params = []) {
  try {
    const dbPool = getPool();
    const result = await dbPool.query(sql, params);

    return {
      rows: result.rows,
      rowCount: result.rowCount
    };
  } catch (error) {
    // Avoid logging SQL parameters because they may contain sensitive data.
    throw new Error(`Database query failed: ${error.message}`, {
      cause: error
    });
  }
}

export async function closeDatabase() {
  if (pool) {
    const activePool = pool;
    pool = undefined;
    await activePool.end();
  }
}
