import { linkParser } from "../helpers/linkParser.js";

export async function onAudio(
  ctx,
  user,
  audio,
  caption = "",
  entities,
  replyToMessageId
) {
  let parsedHtmlText = linkParser(caption, entities);
  let answer =
    "<b>✅Xabaringiz yetkazildi.</b>\n\nO'z linkingizni olish uchun /start'ni bosing.";

  try {
    await ctx.telegram.sendAudio(user?.sendTo, audio, {
      parse_mode: "HTML",
      caption: `<b>📨Yangi xabar:</b>\n\n${parsedHtmlText}`,
      reply_to_message_id: user.replyTo,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Javob yozish",
              callback_data: JSON.stringify({
                // cut coz of telegram button query limit of 64-bytes first is receiverId and the latest replyToMessageId
                recId: user.id,
                rId: replyToMessageId,
              }),
            },
          ],
        ],
      },
    });
  } catch (err) {
    answer =
      "<b>❌Xabar yetkazilmadi!</b>\n Link egasi botni bloklagan bo'lishi mumkin\n\nO'z linkingizni olish uchun /start'ni bosing";
  } finally {
    return answer;
  }
}
