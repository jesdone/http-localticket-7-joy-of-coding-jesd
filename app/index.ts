import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here


  await prisma.task.create({
    data: {
      title: '',
      description: '',
      duedate: '',
      },
  
  })
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}

//   const allTasks = await prisma.task.findMany({
//     include: {
//       posts: true,
//     },
//   })
//   console.dir(allTasks, { depth: null })


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })