import { PrismaClient } from '@prisma/client';
import { onCallback } from './onCallback.js';
import { onMessage } from './onMessage.js';

export default function createControllers(bot) {
  const prismaUser = new PrismaClient().user;

  onMessage(bot, prismaUser);
  onCallback(bot, prismaUser);
}
