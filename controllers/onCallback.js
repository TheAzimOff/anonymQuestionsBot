export function onCallback(bot, prismaUser) {
  bot.on('callback_query', async ctx => {
    try {
      const { data, from, message } = ctx.update.callback_query;

      // This block of code only there for backward compatibility. it should be removed after someday
      const { recId: receiverId, rId: replyToMessageId } =
        data.indexOf('"recId"') !== -1
          ? JSON.parse(data)
          : { recId: data, rId: null };
      // block ends
      const userId = String(from.id);
      // Run database queries concurrently
      const [user, findUser] = await Promise.all([
        prismaUser.findUnique({
          where: { tgId: userId },
        }),
        prismaUser.findUnique({
          where: { id: receiverId },
        }),
      ]);

      if (findUser && user) {
        await prismaUser.update({
          where: { id: user.id },
          data: {
            step: 2,
            sendTo: findUser.tgId,
            replyTo: replyToMessageId ? `${replyToMessageId}` : null,
          },
        });
      }

      await ctx.reply('<b>✉️Xabaringizni kiriting:</b>', {
        reply_to_message_id: message.message_id,
        parse_mode: 'HTML',
      });

      // Answer callback query to remove button highlight
      await ctx.answerCbQuery();
    } catch (error) {
      console.error('Error handling callback_query:', error);
      await ctx.reply('An error occurred. Please try again.');
    }
  });
}
