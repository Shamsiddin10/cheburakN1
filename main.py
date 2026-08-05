import asyncio
import logging
from aiogram import Bot, Dispatcher
import config
from database import init_models
import handlers

# Loggingni sozlash
logging.basicConfig(level=logging.INFO)

async def main():
    # Baza jadvallarini yaratish
    await init_models()

    # Bot va Dispatcher ob'ektlarini yaratish
    bot = Bot(token=config.BOT_TOKEN)
    dp = Dispatcher()

    # Routerni ulash
    dp.include_router(handlers.router)

    # Botni ishga tushirish
    print("Bot ishga tushdi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print("Bot to'xtatildi.")
