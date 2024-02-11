import { Telegraf, Markup } from 'telegraf'
import {message} from 'telegraf/filters'

import 'dotenv/config';
const token = process.env.TOKEN;

const bot = new Telegraf(token)
const webAppUrl = 'https://miniapp-angular.web.app'

bot.command('start', (ctx) => {
    ctx.reply(
        'Привет, добро пожаловать в бота! Это тестовый миниапп, нажми на кнопку ниже, чтобы запустить',
        Markup.keyboard([
            Markup.button.webApp('Запустить миниапп', webAppUrl + '/feedback')
        ])
        .resize()
    )
})

bot.on(message('web_app_data'), async ctx => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваще сообщение: ${data?.feedback}` ?? 'empty message')
}) 

bot.launch()