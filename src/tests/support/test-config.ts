import * as fs from 'fs';
import * as path from 'path';

interface TestConfig {
  baseUrl: string;
  username: string;
  password: string;
}

let cachedConfig: TestConfig | null = null;

function loadConfig(): TestConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(process.cwd(), 'testD.config.json');
  const raw = fs.readFileSync(configPath, 'utf-8');
  const parsed = JSON.parse(raw) as Partial<TestConfig>;

  if (!parsed.baseUrl || !parsed.username || !parsed.password) {
    throw new Error(
      `testD.config.json at ${configPath} is missing required keys (baseUrl, username, password)`
    );
  }

  cachedConfig = {
    baseUrl: parsed.baseUrl,
    username: parsed.username,
    password: parsed.password,
  };
  return cachedConfig;
}

export function getBaseUrl(): string {
  return loadConfig().baseUrl;
}

export function getUsername(): string {
  return loadConfig().username;
}

export function getPassword(): string {
  return loadConfig().password;
}