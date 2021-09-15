const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '1970300638:AAH_6XTXV9m811EwTNSsaJw9uhijvQm8144'

const bot = new TelegramApi(token, {polling: true})
const chats = {}

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать')
  const randomNumber = Math.floor(Math.random() * 10)

  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Попробуй отгадать цифру', gameOptions)
}

const start = () => {

  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о боте'},
    {command: '/game', description: 'Игра угадай цифру'}
  ])

  bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp')
      return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот, ${msg.from.first_name}!`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, 'Этот тестовый бот создан для того, чтобы поиграть с тобой в игру')
    }

    if (text === '/game') {
      return startGame(chatId)
    }

    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/11d/46f/11d46fe5-3fa2-4c4e-a912-aa8c917b468f/192/20.webp')
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз')
  })

  bot.on('callback_query',  async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if (data === '/again') {
      return startGame(chatId)
    }

    if (data == chats[chatId]) {

      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/32d/d8f/32dd8fd9-e1b7-37cc-8ead-06b43357a8c0/192/17.webp')
      return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}!`, againOptions)

    } else {
      return bot.sendMessage(chatId, `К сожалению, ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
    }
  })

}

start()