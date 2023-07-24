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

const getWalletIdByUserEmail = async (email) =>{
  try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          wallet: true, // Incluir la relación con la wallet
        },
      });
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

const decreaseWalletAmount = async (walletId, amount) =>{
  try {
      await prisma.wallet.update({
          where: {
            walletid: walletId,
          },
          data: {
            amount: {
              decrement: amount
            },
          },
        });
  } catch (error) {
      console.log(error)
  }
}

const hasSufficientBalance = async (walletId, amount) =>{
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        walletid: walletId
      }
    })
    console.log(wallet)
    if (wallet.amount >= amount){
      console.log(wallet)
      return true
    }else{
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {getWalletIdByUserId, getWalletIdByUserEmail, increaseWalletAmount, decreaseWalletAmount, hasSufficientBalance}