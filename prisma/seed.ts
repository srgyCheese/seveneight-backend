import { prisma } from "./client"

const hostUrl = "https://seveneight-backend.vercel.app/images"

const main = async () => {
  await prisma.commentTemplate.createMany({
    data: [
      // Грустно, но правда
      {
        url: `${hostUrl}/NliPheZNyTo.jpg`,
        avatarTransfrom: "translate(-10%, -16%) scaleY(0.7)",
        textTransform: "translate(16%, -10%) scale(1, 0.7)",
      },
      // С этим не поспоришь
      { 
        url: `${hostUrl}/OfnYoGX3iAo.jpg`,
        avatarTransfrom: 'scale(1.1, 0.7) translate(-2%, -15%)',
        textTransform: 'scale(0.9, 0.6) translate(14%, -10%)'
      },
      // Фотки
      {
        url: `${hostUrl}/REipSEDMa1s.jpg`,
        isRounded: false,
        avatarTransfrom: "scale(1.1) translate(6%)",
        textTransform: "translate(19%, 50%)",
      },
      // Поймут только гении
      { 
        url: `${hostUrl}/WFu4kvuxJOQ.jpg`,
        avatarTransfrom: 'translate(2%, 3%)',
        textTransform: 'scale(0.7) translate(3%, 38%)'
      },
      // Это лучшее, что видели мои глаза
      {
        url: `${hostUrl}/We-G_xeLdHk.jpg`,
        avatarTransfrom: "",
        textTransform: "translate(32%, 0) scale(1.3, 0.9)",
      },
      // Самый адекватный политик
      { 
        url: `${hostUrl}/Z0rCUBidua8.jpg`,
        avatarTransfrom: 'translate(-5%, -3%) scale(1, 0.8)',
      },
      // Плюсуй, если понял
      { 
        url: `${hostUrl}/_y1DfP4J3m4.jpg`,
        avatarTransfrom: '',
        textTransform: 'scale(0.7) translate(2%)'
      },
      // Олды поймут
      {
        url: `${hostUrl}/w2ia3wwXNbE.jpg`,
        avatarTransfrom: "translate(-10%, -16%) scale(1, 0.85)",
        textTransform: "translate(10.7%, -20%) scale(0.9, 0.7)",
      },
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
