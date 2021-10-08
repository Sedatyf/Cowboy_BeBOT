import random

import hikari
from decouple import config

import Constant

#############################################
#
# Get bot's discord variables from .env file
#
#############################################

TOKEN = config('BOT_TOKEN', default='')
bot = hikari.GatewayBot(token=TOKEN)


#############################################
#
# Bot will give his opinion on question
#
#############################################

@bot.listen()
async def your_take_on(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB: Ton avis "):
        await event.message.respond(random.choice(Constant.TAKE_LIST))


#############################################
#
# A classic Magic 8 Ball
#
#############################################

@bot.listen()
async def magic_8_ball(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB 8ball: "):
        await event.message.respond(":8ball:  " + random.choice(Constant.MAGIC_BALL_LIST) + "  :8ball:")


@bot.listen()
async def bot_help(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB: Je suis confus"):
        await event.message.respond(Constant.HELP_MESSAGE)


#############################################
#
# Debug method ping pong
#
#############################################

@bot.listen()
async def ping(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("hk.ping"):
        await event.message.respond("Pong!")


bot.run()
