import { onAnimation } from './onAnimation.js';
import { onAudio } from './onAudio.js';
import { onPhoto } from './onPhoto.js';
import { onRoundVideo } from './onRoundVideo.js';
import { onSticker } from './onSticker.js';
import { onText } from './onText.js';
import { onVideo } from './onVideo.js';
import { onVoice } from './onVoice.js';

export function onMessage(bot, prismaUser) {
  bot.on('message', async ctx => {
    const { message } = await ctx.update;
    const user = await prismaUser.findUnique({
      where: { tgId: `${message.from.id}` },
    });
    const receiver = await prismaUser.findUnique({
      where: { tgId: `${user.sendTo}` },
    });

    let answer;

    if (user?.step !== 2) {
      await ctx.reply(
        "<b>🔗O'z linkingizni olish uchun /start'ni bosing.</b>",
        {
          parse_mode: 'HTML',
        }
      );
      return;
    }

    if (message.text) {
      answer = await onText(
        ctx,
        user,
        receiver,
        message.text,
        message.entities,
        message.message_id
      );
    } else if (message.sticker) {
      answer = await onSticker(
        ctx,
        user,
        receiver,
        message.sticker.file_id,
        message.message_id
      );
    } else if (message.photo) {
      answer = await onPhoto(
        ctx,
        user,
        receiver,
        message.photo[0].file_id,
        message.caption,
        message.caption_entities,
        message.message_id
      );
    } else if (message.video) {
      answer = await onVideo(
        ctx,
        user,
        receiver,
        message.video.file_id,
        message.caption,
        message.caption_entities,
        message.message_id
      );
    } else if (message.audio) {
      answer = await onAudio(
        ctx,
        user,
        receiver,
        message.audio.file_id,
        message.caption,
        message.caption_entities,
        message.message_id
      );
    } else if (message.animation) {
      answer = await onAnimation(
        ctx,
        user,
        receiver,
        message.animation.file_id,
        message.caption,
        message.caption_entities,
        message.message_id
      );
    } else if (message.voice) {
      answer = await onVoice(
        ctx,
        user,
        receiver,
        message.voice.file_id,
        message.caption,
        message.caption_entities,
        message.message_id
      );
    } else if (message.video_note) {
      answer = await onRoundVideo(
        ctx,
        user,
        receiver,
        message.video_note.file_id,
        message.message_id
      );
    } else {
      answer = "⚠️Bu faylni jo'natib bo'lmaydi";
    }

    await ctx.reply(answer, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔁Yana xabar jo'natish",
              callback_data: receiver.id,
            },
          ],
        ],
      },
    });
    await prismaUser.update({
      where: { tgId: `${message.from.id}` },
      data: { step: 1, sendTo: '0', replyTo: null },
    });
  });
}
