import { ConfigService } from '../modules/config/config.service';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}
export const getDataBaseConfig = (
  configService: ConfigService,
): DatabaseConfig => {
  return {
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT'), 10),
    name: configService.get('DATABASE_NAME'),
    user: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
  };
};
