import 'dotenv/config';

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

const slowMo = Number(process.env.SLOW_MO ?? 0);

if (!Number.isFinite(slowMo) || slowMo < 0) {
  throw new Error('SLOW_MO must be a non-negative number');
}

const browserName = process.env.BROWSER ?? 'chromium';

if (!['chromium', 'firefox', 'webkit'].includes(browserName)) {
  throw new Error(`Unsupported browser: ${browserName}`);
}

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
  browserName,
  headless: parseBoolean(process.env.HEADLESS, true),
  slowMo,
  db: {
    enabled: parseBoolean(process.env.DB_ENABLED, false),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: parseBoolean(process.env.DB_SSL, false)
  }
};