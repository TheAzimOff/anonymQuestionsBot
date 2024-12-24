export default async function commandsMiddleware(ctx, next) {
  const { message } = await ctx.update;
  const text = message?.text;
  const commands = text?.split(' ');
  Object.assign(ctx.state, { text, commands });
  next();
}
