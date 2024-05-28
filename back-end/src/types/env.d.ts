declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      REDIS_PASSWORD: string;
      DATABASE_URL: string;
      REDIS_PORT: string;
      // Adicione outras variáveis ​​de ambiente conforme necessário
    }
  }