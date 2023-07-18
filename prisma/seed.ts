import { prisma } from "./client"

const hostUrl = "https://seveneight-backend.vercel.app/images"

const main = async () => {
  await prisma.commentTemplate.createMany({
    data: [
      { url: `${hostUrl}/NliPheZNyTo.jpg` },
      { url: `${hostUrl}/OfnYoGX3iAo.jpg` },
      { url: `${hostUrl}/REipSEDMa1s.jpg` },
      { url: `${hostUrl}/WFu4kvuxJOQ.jpg` },
      { url: `${hostUrl}/We-G_xeLdHk.jpg` },
      { url: `${hostUrl}/Z0rCUBidua8.jpg` },
      { url: `${hostUrl}/_y1DfP4J3m4.jpg` },
      { url: `${hostUrl}/w2ia3wwXNbE.jpg` },
    ],
  })
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
