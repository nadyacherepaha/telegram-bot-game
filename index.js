const TelegramApi = require('node-telegram-bot-api')

const token = '1970300638:AAH_6XTXV9m811EwTNSsaJw9uhijvQm8144'

const bot = new TelegramApi(token, {polling: true})

bot.on('message', msg => {
  const text = msg.text
  const chatId = msg.chat.id

  if (text === '/start') {
    bot.sendMessage(chatId, `Добро пожаловать в телеграм бот, ${msg.from.first_name}`)
  }
  if (text === '/info') {
    bot.sendMessage(chatId, 'Этот тестовый бот создан для того, чтобы поиграть с тобой в игру')
  }
})