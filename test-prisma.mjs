import { prisma } from './lib/prisma.js';
async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (err) {
    console.error(err);
  }
}
test();
