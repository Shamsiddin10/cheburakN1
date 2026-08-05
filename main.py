import asyncio
import logging
from telebot.async_telebot import AsyncTeleBot
import config
from database import init_models
import handlers

# Loggingni sozlash
logging.basicConfig(level=logging.INFO)

async def main():
    # Baza jadvallarini yaratish
    await init_models()

    # Bot ob'ektini yaratish
    bot = AsyncTeleBot(config.BOT_TOKEN)

    # Handlerlarni ro'yxatdan o'tkazish
    handlers.register_handlers(bot)

    # Botni ishga tushirish
    print("Bot ishga tushdi...")
    await bot.polling(non_stop=True)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print("Bot to'xtatildi.")
