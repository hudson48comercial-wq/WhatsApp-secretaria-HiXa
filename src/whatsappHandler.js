import { Client, LocalAuth } from 'whatsapp-web.js';
import aiHandler from './aiHandler.js';

export class WhatsAppHandler {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });
    this.isReady = false;
  }

  // Inicializar o cliente
  async initialize() {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        console.log('✅ WhatsApp conectado!');
        this.isReady = true;
        resolve();
      });

      this.client.on('disconnected', () => {
        console.log('⚠️ WhatsApp desconectado');
        this.isReady = false;
      });

      this.client.on('qr', (qr) => {
        console.log('📱 Escaneie o QR code com seu WhatsApp:');
        console.log(qr);
      });

      this.client.on('error', (error) => {
        console.error('❌ Erro no WhatsApp:', error);
        reject(error);
      });

      this.client.on('auth_failure', () => {
        console.error('❌ Autenticação falhou');
        reject(new Error('Autenticação falhou'));
      });

      // Processar mensagens recebidas
      this.client.on('message', async (message) => {
        await this.handleMessage(message);
      });

      this.client.initialize().catch(reject);
    });
  }

  // Manipular mensagem recebida
  async handleMessage(message) {
    try {
      // Ignorar mensagens de status e mídia
      if (message.from.includes('status@broadcast')) return;
      if (message.hasMedia) return;

      const userPhone = message.from;
      const userMessage = message.body.trim();

      console.log(`📱 Mensagem de ${message.author || userPhone}: ${userMessage}`);

      // Mostrar indicador de digitação
      await message.getChat().then((chat) => {
        chat.sendStateTyping();
      });

      // Obter resposta da IA
      const aiResponse = await aiHandler.getResponse(userPhone, userMessage);

      // Enviar resposta
      await message.reply(aiResponse);
      console.log(`🤖 Resposta enviada para ${userPhone}`);
    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error);
      try {
        await message.reply('Desculpe, tive um erro ao processar sua mensagem. Tente novamente.');
      } catch (replyError) {
        console.error('❌ Erro ao enviar mensagem de erro:', replyError);
      }
    }
  }

  // Enviar mensagem
  async sendMessage(chatId, message) {
    try {
      const chat = await this.client.getChatById(chatId);
      await chat.sendMessage(message);
      console.log(`📤 Mensagem enviada para ${chatId}`);
    } catch (error) {
      console.error(`❌ Erro ao enviar mensagem para ${chatId}:`, error);
      throw error;
    }
  }

  // Desconectar
  async disconnect() {
    if (this.client) {
      await this.client.destroy();
      console.log('👋 WhatsApp desconectado');
    }
  }

  // Obter status
  getStatus() {
    return {
      isReady: this.isReady,
      message: this.isReady ? 'Online' : 'Offline',
    };
  }
}

export default new WhatsAppHandler();
