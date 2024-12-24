# Anonymous Questions Telegram Bot

This is a Telegram bot built with [Telegraf.js](https://telegraf.js.org/) that allows users to submit anonymous questions. It supports media files such as images, videos, and audio.

## Features

- **Anonymous Submissions**: Users can send questions without revealing their identity.
- **Media Support**: Allows submission of images, videos, audio, and documents.
- **Easy to Use**: Simple commands for interaction.

## Prerequisites

- Node.js (>= 16.x)
- Telegram Bot Token (obtainable via [BotFather](https://core.telegram.org/bots#botfather))
- Supabase Project (set up your database and get API keys)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TheAzimOff/anonymQuestionsBot.git
   cd anonymQuestionsBot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your configuration:

   ```env
   BOT_TOKEN=your-telegram-bot-token
   BOT_USERNAME=telegram-bot-username # without '@'
   DATABASE_URL=your-database-url # Prisma connection string
   DIRECT_URL=your-direct-database-url # Prisma connection string
   ```

4. Run commands to initialize and migrate the database:

   ```bash
   npm run prisma:init
   npm run prisma:migrate
   npm run prisma:generate
   ```

## Usage

1. Start the bot:

   ```bash
   npm run dev
   ```

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes

- Make sure to secure the bot token and restrict access to admin-only commands.
- Test thoroughly before deploying in public groups.
