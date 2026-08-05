from telebot.async_telebot import AsyncTeleBot
from telebot.types import Message, ReplyKeyboardMarkup, KeyboardButton
from sqlalchemy import select
from database import AsyncSessionLocal
from models import User

def register_handlers(bot: AsyncTeleBot):

    def get_main_keyboard():
        markup = ReplyKeyboardMarkup(resize_keyboard=True)
        markup.row(KeyboardButton("🍔 Menyu"), KeyboardButton("🛒 Savat"))
        markup.row(KeyboardButton("⚙️ Sozlamalar"), KeyboardButton("📞 Biz bilan aloqa"))
        return markup

    @bot.message_handler(commands=['start'])
    async def cmd_start(message: Message):
        async with AsyncSessionLocal() as session:
            # Check if user exists
            stmt = select(User).where(User.telegram_id == message.from_user.id)
            result = await session.execute(stmt)
            user = result.scalar_one_or_none()

            if not user:
                new_user = User(
                    telegram_id=message.from_user.id,
                    username=message.from_user.username
                )
                session.add(new_user)
                await session.commit()
                
        await bot.send_message(
            message.chat.id,
            f"Salom, {message.from_user.first_name}! Fast Food botimizga xush kelibsiz.\nQuyidagi menyudan tanlang:",
            reply_markup=get_main_keyboard()
        )

    @bot.message_handler(func=lambda message: message.text == "🍔 Menyu")
    async def show_menu(message: Message):
        await bot.send_message(message.chat.id, "Tez orada menyu qismi tayyor bo'ladi!")

    @bot.message_handler(func=lambda message: message.text == "📞 Biz bilan aloqa")
    async def contact_us(message: Message):
        await bot.send_message(message.chat.id, "Biz bilan bog'lanish uchun: +998901234567")
