import random

import hikari
from decouple import config

import constant
import utils
import horoscope_api

#############################################
#
# Get bot's discord variables from .env file
#
#############################################

TOKEN = config('BOT_TOKEN', default='')
bot = hikari.GatewayBot(token=TOKEN)


#############################################
#
# Bot will give its opinion on question
# Answer to "CBB: Ton avis "
#
#############################################

@bot.listen()
async def your_take_on(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB: Ton avis "):
        await event.message.respond(random.choice(constant.TAKE_LIST))


#############################################
#
# A classic Magic 8 Ball
# Answer to "CBB 8ball: "
#
#############################################

@bot.listen()
async def magic_8_ball(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB 8ball: "):
        await event.message.respond(":8ball:  " + random.choice(constant.MAGIC_BALL_LIST) + "  :8ball:")


#############################################
#
# Tells your daily horoscope
# Answer to "CBB horoscope: "
#
#############################################

@bot.listen()
async def horoscope(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB horoscope: "):
        sign = utils.find_match(event.content.title())

        if not sign:
            await event.message.respond("Désolé, je n'ai pas compris le signe astrologique que vous vouliez :grimacing:")
            return

        love_life = horoscope_api.get_love_life(sign)
        work_life = horoscope_api.get_work_life(sign)
        finances = horoscope_api.get_finances(sign)

        await event.message.respond(f"L'horoscope du jour pour les **{sign}** est le suivant :")
        await event.message.respond(f"**Côté coeur** :heart: \n{love_life}")
        await event.message.respond(f"**Côté travail** :man_office_worker: \n{work_life}")
        await event.message.respond(f"**Côté argent** :money_with_wings: \n{finances}")


#############################################
#
# Help message that shows available command
# Answer to "CBB: Je suis confus" and "CBB: À l'aide" and "CBB: A l'aide"
#
#############################################

@bot.listen()
async def bot_help(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB: Je suis confus") or event.content.startswith(
            "CBB: À l'aide") or event.content.startswith("CBB: A l'aide"):
        await event.message.respond(constant.HELP_MESSAGE)


#############################################
#
# Debug method ping pong
# Answer to "CBB: Ping!"
#
#############################################

@bot.listen()
async def ping(event: hikari.GuildMessageCreateEvent) -> None:
    if event.is_bot or not event.content:
        return

    if event.content.startswith("CBB: Ping!"):
        await event.message.respond("Pong!")


bot.run()
