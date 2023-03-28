import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany();
    const posts = await prisma.post.findMany();
    const comments = await prisma.comment.findMany();
    const likes = await prisma.like.findMany();

    console.log('Users: ', users);
    console.log('Posts: ', posts);
    console.log('Comments: ', comments);
    console.log('Likes: ', likes);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })