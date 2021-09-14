const TelegramApi = require('node-telegram-bot-api')

const token = '1970300638:AAH_6XTXV9m811EwTNSsaJw9uhijvQm8144'

const bot = new TelegramApi(token, {polling: true})