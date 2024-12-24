import { botUsername } from '../config/default.js';

export function onStart(bot, prismaUser) {
  bot.start(async ctx => {
    const { message } = ctx.update;
    const user = await prismaUser.upsert({
      where: { tgId: `${message.from.id}` },
      update: { step: 1, sendTo: '0' },
      create: {
        name: message.from.first_name,
        username: message.from.username,
        tgId: `${message.from.id}`,
      },
    });

    if (ctx.state.commands[1] && ctx.state.commands[1] !== user.id) {
      const receiverId = ctx.state.commands[1];
      const findUser = await prismaUser.findUnique({
        where: { id: receiverId },
      });

      if (findUser) {
        await prismaUser.update({
          where: { id: user.id },
          data: { step: 2, sendTo: findUser?.tgId },
        });
      }

      ctx.reply(`<b>✉️Xabaringizni kiriting:</b>`, {
        parse_mode: 'HTML',
      });
    } else {
      ctx.reply(
        `<b>🔗Sizning shaxsiy linkingiz:</b>\n\nt.me/${botUsername}?start=${user.id}`,
        { parse_mode: 'HTML' }
      );
    }
  });
}
