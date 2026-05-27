import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 500,
  },
  whatsapp: {
    phoneNumber: process.env.WHATSAPP_PHONE_NUMBER,
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  secretaria: {
    name: process.env.SECRETARIA_NAME || 'HiXa',
    language: process.env.SECRETARIA_LANGUAGE || 'pt-BR',
  },
};

export default config;
