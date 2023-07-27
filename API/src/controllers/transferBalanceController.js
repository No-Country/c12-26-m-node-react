const prisma = require('../db')
const { validateTransferByEmail } = require('../middleware/validateTransfer')
const {saveTransaction} = require('./saveTransactionsController')
const {
  getWalletIdByUserId,
  hasSufficientBalance,
  getWalletIdByUserEmail,
  increaseWalletAmount,
  decreaseWalletAmount,
} = require('./walletController')

const transferBalanceUserToUserByEmail = async (userId, body) => {
  const { amount, email } = body
  console.log(body)
  let isvalidateTransfer = await validateTransferByEmail(email, amount)
  console.log(isvalidateTransfer)
  if (isvalidateTransfer.containErrors) {
    throw new Error(JSON.stringify(isvalidateTransfer))
  } else {
    const userReceiver = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!userReceiver) {
      throw new Error(
        JSON.stringify({
          containErrors: true,
          message: 'User recipient not found',
        })
      )
    }

    try {
      const senderWalletId = await getWalletIdByUserId(userId)
      const receiverWalletId = await getWalletIdByUserEmail(email)
      console.log('el objeto receiverwalleid es ', receiverWalletId)
      if (await hasSufficientBalance(senderWalletId, amount)) {
        if (receiverWalletId) {
          await decreaseWalletAmount(senderWalletId, amount)
          await increaseWalletAmount(receiverWalletId, amount)
          await saveTransaction(senderWalletId, "TRANSFER", amount, email, undefined)
          return {
            containErrors: false,
            message: 'Successful transfer',
          }
        } else {
          throw new Error(
            JSON.stringify({
              containErrors: true,
              message: 'WalletId receiver no found',
            })
          )
        }
      } else {
        return {
          containErrors: true,
          message: 'Balance insufficient',
        }
      }
    } catch (error) {
      return {
        containErrors: true,
        message: 'Algo ha ocurrido: ' + error,
      }
    }
  }
}

module.exports = { transferBalanceUserToUserByEmail }