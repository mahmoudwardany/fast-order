import * as fs from 'fs';

import * as dotenv from 'dotenv';
export interface IEnvConfig {
  [key: string]: string;
}
export class ConfigService {
  private readonly ENV_CONFIG: IEnvConfig;
  NODE_ENV: string;
  PORT: string;
  constructor(environment: string) {
    const filePath = `./env/${environment}.env`;
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      throw new Error(`Environment file not found: ${filePath}`);
    }

    const config = dotenv.parse(fs.readFileSync(filePath));
    this.ENV_CONFIG = config;
    this.initializeVariable();
  }
  private initializeVariable(): void {
    this.NODE_ENV = this.ENV_CONFIG.NODE_ENV;
    this.PORT = this.ENV_CONFIG.PORT;
  }
}
