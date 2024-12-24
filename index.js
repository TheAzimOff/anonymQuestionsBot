import { Telegraf } from "telegraf";
import { token } from "./config/default.js";
import commands from "./commands/index.js";
import middleware from "./middleware/index.js";
import controllers from "./controllers/index.js";

const bot = new Telegraf(token);

middleware(bot);
commands(bot);
controllers(bot);

bot.launch();
