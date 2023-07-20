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

  await prisma.commentTemplate.createMany({
    data: [
      // Пропел
      {
        url: `${hostUrl}/N62ekgQU1R4.jpg`,
        avatarTransfrom: "scale(0.7, 0.6) translate(-17%, -26%)",
        textTransform: "translate(7%, -1%) scale(0.9)",
      },
      // Когда в классе открыл пачку чипсов
      {
        url: `${hostUrl}/KNsF_XBZZW0.jpg`,
        avatarTransfrom: "scale(0.7, 0.7) translate(-17%, -18%)",
        textTransform: "scale(0)",
      },
      // Гучи флип флап
      {
        url: `${hostUrl}/_BtGlphG5ac.jpg`,
        avatarTransfrom: "scale(1, 0.8) translate(2%, -12%)",
        textTransform: "translate(11%, -1%) scale(0.9)",
      },
      // Хованский до того как стал известен
      {
        url: `${hostUrl}/A0-NPSCUBMk.jpg`,
        avatarTransfrom: "scale(0.8, 0.7) translate(-10%, -20%)",
        textTransform: "translate(9%, 18%) scale(0.9)",
      },
      // Вызываю пояснительную бригаду
      {
        url: `${hostUrl}/tvhro5oKUYE.jpg`,
        avatarTransfrom: "scale(0.8, 0.7) translate(-7%, -11%)",
        textTransform: "translate(8%, 27%) scale(0.9)",
      },
      // Кажется я оцерот
      {
        url: `${hostUrl}/kA-5xIjxJ18.jpg`,
        avatarTransfrom: "scale(0.7, 0.7) translate(-12%, -19%)",
        textTransform: "translate(3%, 20%) scale(0.8)",
      },
      // И венерологи
      {
        url: `${hostUrl}/z74ZwJNji-E.jpg`,
        avatarTransfrom: "scale(1, 0.6) translate(-23%, -19%)",
        textTransform: "scale(0)",
      },
      // Помню как все школьники тащились от них
      {
        url: `${hostUrl}/usPqxRmoUyk.jpg`,
        avatarTransfrom: "scale(0.9, 0.9) translate(7%, 23%)",
        textTransform: "translate(9%, 20%) scale(0.9)",
      },
      // Жириновский умер
      {
        url: `${hostUrl}/yPn0mAERuXo.jpg`,
        avatarTransfrom: "scale(1.1, 1.1) translate(6%, 11%)",
        textTransform: "translate(26%, 47%) scale(1.1)",
      },
      // Фул в телеге
      {
        url: `${hostUrl}/B2B3GCqfLpM.jpg`,
        avatarTransfrom: "scale(1.2, 0.9) translate(5%, 11%)",
        textTransform: "translate(24%, 67%) scale(1.1)",
      },
      // И все пошли проверять
      {
        url: `${hostUrl}/0tlD5qKJsFI.jpg`,
        avatarTransfrom: "scale(1, 0.9) translate(-22%, 1%)",
        textTransform: "translate(12%, 19%) scale(1)",
      },
      // Спасибо за ещё одну фобию
      {
        url: `${hostUrl}/3Y7dvVZGYLk.jpg`,
        avatarTransfrom: "scale(0.7, 0.5) translate(-32%, -48%)",
        textTransform: "scale(0)",
      },
      // Обоссать и на мороз
      {
        url: `${hostUrl}/9NXr7YO-4hc.jpg`,
        avatarTransfrom: "scale(0.8, 0.45) translate(14%, -60%)",
        textTransform: "translate(23%, -15%) scale(1.1, 0.8)",
      },
      {
        url: `${hostUrl}/irQr4CI10JA.jpg`,
        avatarTransfrom: "scale(0.7, 0.7) translate(-23%, -4%)",
        textTransform: "translate(17%, 16%) scale(1.1, 1.1)",
      },
      // И губка боб
      {
        url: `${hostUrl}/nZvZ_l5bi6o.jpg`,
        avatarTransfrom: "scale(0.7, 0.6) translate(-15%, -26%)",
        textTransform: "scale(0)",
      },
      // Заклееная вебка
      {
        url: `${hostUrl}/Etkw1N57I90.jpg`,
        avatarTransfrom: "scale(0.74, 0.74) translate(4%, -14%)",
        textTransform: "translate(16%, 23%)",
      },
      // Шурупы
      {
        url: `${hostUrl}/DZVUE2qDqaQ.jpg`,
        avatarTransfrom: "scale(0.8, 0.8) translate(-6%, -10%)",
        textTransform: "translate(15%, 28%)",
      },
      // Тупые
      {
        url: `${hostUrl}/gmUI9L3hdow.jpg`,
        avatarTransfrom: 'scale(1, 0.8) translate(0%, -10%)',
        textTransform: 'translate(17%, 20%)'
      },
      // Человек хуже зверя
      {
        url: `${hostUrl}/A8STtBrYaDE.jpg`,
        avatarTransfrom: 'scale(1.3, 0.8) translate(10%, -7%)',
        textTransform: 'translate(20%, 15%)'
      }
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
