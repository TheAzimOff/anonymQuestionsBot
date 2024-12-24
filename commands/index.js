import { PrismaClient } from '@prisma/client';
import { onHelp } from './onHelp.js';
import { onStart } from './onStart.js';

// step 1 - start
// step 2 - send question

export default function createCommands(bot) {
  const prismaUser = new PrismaClient().user;

  onHelp(bot);
  onStart(bot, prismaUser);
}
