from aiogram import Router, F
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton
from aiogram.filters import CommandStart
from sqlalchemy import select
from database import AsyncSessionLocal
from models import User

router = Router()

def get_main_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="🍔 Menyu"), KeyboardButton(text="🛒 Savat")],
            [KeyboardButton(text="⚙️ Sozlamalar"), KeyboardButton(text="📞 Biz bilan aloqa")]
        ],
        resize_keyboard=True
    )

@router.message(CommandStart())
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
            
    await message.answer(
        f"Salom, {message.from_user.first_name}! Fast Food botimizga xush kelibsiz.\nQuyidagi menyudan tanlang:",
        reply_markup=get_main_keyboard()
    )

@router.message(F.text == "🍔 Menyu")
async def show_menu(message: Message):
    await message.answer("Tez orada menyu qismi tayyor bo'ladi!")

@router.message(F.text == "📞 Biz bilan aloqa")
async def contact_us(message: Message):
    await message.answer("Biz bilan bog'lanish uchun: +998901234567")
