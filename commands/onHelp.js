export function onHelp(bot) {
  bot.help(ctx =>
    ctx.reply("<b>🔗O'z linkingizni olish uchun /start'ni bosing.</b>", {
      parse_mode: 'HTML',
      reply_to_message_id: ctx.update.message.message_id,
    })
  );
}
