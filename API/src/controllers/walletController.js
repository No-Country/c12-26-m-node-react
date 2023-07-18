const prisma = require('../db')

const getWalletIdByUserId = async (userId) =>{
    try {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            wallet: true, // Incluir la relación con la wallet
          },
        });
        console.log(user.wallet.walletid)
        return user.wallet.walletid
      } catch (error) {
        console.error('Error al obtener la wallet:', error);
      }
}

const increaseWalletAmount = async (walletId, amount) =>{
    try {
        await prisma.wallet.update({
            where: {
              walletid: walletId,
            },
            data: {
              amount: {
                increment: amount,
              },
            },
          });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getWalletIdByUserId, increaseWalletAmount}