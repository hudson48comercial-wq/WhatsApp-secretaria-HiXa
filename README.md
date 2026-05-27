# 🤖 WhatsApp Secretária HiXa

Secretária de IA inteligente que responde automaticamente suas mensagens do WhatsApp usando OpenAI GPT-4.

## ✨ Recursos

- ✅ Respostas automáticas com IA (OpenAI GPT-4)
- ✅ Mantém contexto da conversa
- ✅ Suporte a múltiplos usuários
- ✅ Fácil de configurar
- ✅ Código aberto

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Chave de API da OpenAI
- Conta do WhatsApp

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/hudson48comercial-wq/WhatsApp-secretaria-HiXa.git
cd WhatsApp-secretaria-HiXa
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com suas configurações:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com:

```env
OPENAI_API_KEY=sua_chave_api_openai_aqui
WHATSAPP_PHONE_NUMBER=55119999999
PORT=3000
NODE_ENV=development
SECRETARIA_NAME=HiXa
SECRETARIA_LANGUAGE=pt-BR
```

## 🔑 Como obter a chave OpenAI

1. Vá para [platform.openai.com](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Navegue para [API Keys](https://platform.openai.com/api-keys)
4. Clique em "Create new secret key"
5. Copie a chave e cole no arquivo `.env`

## ▶️ Como usar

### Modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

### Modo produção:

```bash
npm start
```

## 📱 Primeira execução

Na primeira execução:

1. Um QR code será exibido no terminal
2. Abra o WhatsApp no seu celular
3. Vá em **Configurações > Dispositivos conectados > Conectar um dispositivo**
4. Escaneie o QR code com a câmera do seu celular
5. Pronto! A secretária HiXa estará online

## 🎯 Como funciona

Quando alguém enviar uma mensagem:

1. HiXa recebe a mensagem
2. Envia para o OpenAI processar
3. Gera uma resposta personalizada
4. Envia a resposta automaticamente
5. Mantém histórico da conversa para contexto

## 📝 Personalizando a HiXa

Você pode customizar o comportamento editando o `SYSTEM_PROMPT` em `src/main.js` ou usando os prompts pré-configurados em `src/prompts.js`.

## 🛠️ Estrutura do Projeto

```
.
├── src/
│   ├── main.js          # Arquivo principal
│   ├── config.js        # Configurações
│   └── prompts.js       # Prompts personalizáveis
├── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore          # Arquivos ignorados
├── package.json        # Dependências
└── README.md          # Este arquivo
```

## 🔧 Troubleshooting

### QR code não aparece

```bash
rm -rf .wwebjs_auth
npm start
```

### Erro de API OpenAI

- Verifique se sua chave API está correta
- Verifique se você tem créditos na sua conta OpenAI
- Verifique a conexão de internet

### Mensagens não são respondidas

- Verifique se o WhatsApp está conectado (deve aparecer "✅ WhatsApp está conectado!")
- Verifique se as dependências foram instaladas corretamente
- Veja os logs para mensagens de erro

## 📦 Dependências principais

- **whatsapp-web.js** - Integração com WhatsApp Web
- **openai** - SDK da OpenAI
- **dotenv** - Gerenciar variáveis de ambiente
- **express** - Framework web (opcional, para expansões futuras)

## 📄 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:

- Reportar bugs
- Sugerir novas features
- Fazer pull requests

## ⚠️ Disclaimer

- Este projeto usa a API não-oficial do WhatsApp Web
- Use por sua conta e risco
- Respeite os termos de serviço do WhatsApp
- Não use para spam ou atividades maliciosas

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**HiXa - Sua secretária de IA sempre disponível** 🤖✨
