import dotenv from 'dotenv';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { OpenAI } from 'openai';

dotenv.config();

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inicializar WhatsApp Web Client
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Armazenar conversas por usuário
const conversationHistory = {};

// Sistema prompt para a secretária
const SYSTEM_PROMPT = `Você é HiXa, uma secretária de IA profissional, amigável e eficiente.
Você responde mensagens no WhatsApp em português brasileiro.
Sua função é:
- Responder perguntas com educação e profissionalismo
- Agendar reuniões e compromissos
- Fornecer informações úteis
- Ser concisa e clara nas respostas
- Manter um tom profissional mas amigável

Lembre-se: você é uma IA assistente, não é um humano. Se perguntarem algo que exija informações pessoais do seu "dono", seja honesto que você é um assistente de IA.`;

// Quando o cliente estiver pronto
client.on('ready', () => {
  console.log('✅ WhatsApp está conectado!');
  console.log('🤖 HiXa (Secretária de IA) online');
});

// Quando receber uma mensagem
client.on('message', async (message) => {
  try {
    // Ignorar mensagens do próprio bot
    if (message.from.includes('status@broadcast')) return;
    if (message.hasMedia) return; // Ignorar mensagens com mídia por enquanto

    const userPhone = message.from;
    const userMessage = message.body.trim();

    console.log(`📱 Mensagem de ${message.author || userPhone}: ${userMessage}`);

    // Inicializar histórico de conversa do usuário se não existir
    if (!conversationHistory[userPhone]) {
      conversationHistory[userPhone] = [];
    }

    // Adicionar mensagem do usuário ao histórico
    conversationHistory[userPhone].push({
      role: 'user',
      content: userMessage,
    });

    // Manter apenas as últimas 10 mensagens para economizar tokens
    if (conversationHistory[userPhone].length > 10) {
      conversationHistory[userPhone].shift();
    }

    // Chamar OpenAI para gerar resposta
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...conversationHistory[userPhone],
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = response.choices[0].message.content;

    // Adicionar resposta ao histórico
    conversationHistory[userPhone].push({
      role: 'assistant',
      content: aiResponse,
    });

    // Enviar resposta
    await message.reply(aiResponse);
    console.log(`🤖 Resposta enviada: ${aiResponse}`);
  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
    message.reply('Desculpe, tive um erro ao processar sua mensagem. Tente novamente.');
  }
});

// Quando o cliente desconectar
client.on('disconnected', () => {
  console.log('⚠️ WhatsApp desconectado');
});

// Inicializar o cliente
client.initialize();

// Tratamento de erros global
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejection não tratada:', reason);
});

console.log('🚀 Iniciando WhatsApp Secretária HiXa...');
