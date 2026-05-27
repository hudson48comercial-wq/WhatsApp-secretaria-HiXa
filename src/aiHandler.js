import { OpenAI } from 'openai';
import { config } from './config.js';
import { SYSTEM_PROMPTS } from './prompts.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class AIHandler {
  constructor() {
    this.conversationHistory = {};
    this.maxHistoryLength = 10;
  }

  // Inicializar histórico para um usuário
  initializeUserHistory(userId) {
    if (!this.conversationHistory[userId]) {
      this.conversationHistory[userId] = [];
    }
  }

  // Adicionar mensagem ao histórico
  addToHistory(userId, role, content) {
    this.initializeUserHistory(userId);
    this.conversationHistory[userId].push({
      role,
      content,
    });

    // Manter apenas as últimas mensagens
    if (this.conversationHistory[userId].length > this.maxHistoryLength) {
      this.conversationHistory[userId].shift();
    }
  }

  // Obter resposta da IA
  async getResponse(userId, userMessage, promptType = 'professional') {
    try {
      this.initializeUserHistory(userId);

      // Adicionar mensagem do usuário ao histórico
      this.addToHistory(userId, 'user', userMessage);

      // Preparar mensagens para a API
      const messages = [
        ...this.conversationHistory[userId],
      ];

      // Chamar OpenAI
      const response = await openai.chat.completions.create({
        model: config.openai.model,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPTS[promptType] || SYSTEM_PROMPTS.professional,
          },
          ...messages,
        ],
        temperature: config.openai.temperature,
        max_tokens: config.openai.maxTokens,
      });

      const aiResponse = response.choices[0].message.content;

      // Adicionar resposta ao histórico
      this.addToHistory(userId, 'assistant', aiResponse);

      return aiResponse;
    } catch (error) {
      console.error('❌ Erro ao chamar OpenAI:', error);
      throw error;
    }
  }

  // Limpar histórico de um usuário
  clearUserHistory(userId) {
    delete this.conversationHistory[userId];
  }

  // Obter histórico de um usuário
  getUserHistory(userId) {
    return this.conversationHistory[userId] || [];
  }

  // Limpar todos os históricos
  clearAllHistory() {
    this.conversationHistory = {};
  }
}

export default new AIHandler();
