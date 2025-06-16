import * as fs from 'fs';

import * as dotenv from 'dotenv';
export interface IEnvConfig {
  [key: string]: string;
}
export class ConfigService {
  private readonly ENV_CONFIG: IEnvConfig;

  constructor(environment: string) {
    const filePath = `./env/${environment}.env`;
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      throw new Error(`Environment file not found: ${filePath}`);
    }

    const config = dotenv.parse(fs.readFileSync(filePath));
    this.ENV_CONFIG = config;
  }

  get(key: string): string {
    const value = this.ENV_CONFIG[key];
    if (!value) {
      throw new Error(`Missing env variable: ${key}`);
    }
    return value;
  }
}
