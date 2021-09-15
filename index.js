const TelegramApi = require('node-telegram-bot-api')

const token = '1970300638:AAH_6XTXV9m811EwTNSsaJw9uhijvQm8144'

const bot = new TelegramApi(token, {polling: true})

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о боте'}
  ])

  bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp')
      await bot.sendMessage(chatId, `Добро пожаловать в телеграм бот, ${msg.from.first_name}`)
    }
    if (text === '/info') {
      await bot.sendMessage(chatId, 'Этот тестовый бот создан для того, чтобы поиграть с тобой в игру')
    }
  })
}

start()