from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Updater, CommandHandler, CallbackContext

# Функция, которая вызывается при вводе команды /start
def start(update: Update, context: CallbackContext):
    # Создание кнопки для запуска Mini Apps
    keyboard = [
        [InlineKeyboardButton("Открыть Mini App", url="https://t.me/AFdsfv1_bot")]
    ]
    
    # Разметка для отправки кнопки
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Отправка сообщения с кнопкой
    update.message.reply_text('Нажмите кнопку ниже для запуска Mini App:', reply_markup=reply_markup)

# Основная функция для запуска бота
def main():
    # Инициализация бота с токеном
    updater = Updater("7414468114:AAFbZj0BvRMduvfiS2OtDy0tZUwQIPduPfQ")
    
    # Добавление обработчика команды /start
    updater.dispatcher.add_handler(CommandHandler("start", start))
    
    # Запуск бота
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()