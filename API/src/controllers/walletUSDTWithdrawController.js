const validateWithdrawUsdt = require('../middleware/validateWithdraw')
const { usdtWithdraw } = require('../utils/usdtWithdraw')
const {saveTransaction} = require('./saveTransactionsController')
const {
  getWalletIdByUserId,
  decreaseWalletAmount,
  hasSufficientBalance,
} = require('./walletController')

const walletUsdtWithdraw = async (userId, amount, walletReceiver) => {
  let isValidTransferUsdt = validateWithdrawUsdt(walletReceiver, amount)
  if (isValidTransferUsdt.containErrors) {
    throw new Error(JSON.stringify(isValidTransferUsdt))
  } else {
    try {
      const senderWalletId = await getWalletIdByUserId(userId)
      console.log(senderWalletId)
      if (await hasSufficientBalance(senderWalletId, amount)) {
        const transactionTx = await usdtWithdraw(amount, walletReceiver)
        if (transactionTx) {
          await decreaseWalletAmount(senderWalletId, amount)
          await saveTransaction(senderWalletId, "WITHDRAWAL", amount, undefined, walletReceiver)
          return {
            containErrors: false,
            message: 'Successful transfer',
            txId: transactionTx,
          }
        } else {
          return {
            containErrors: true,
            message: 'LatamWllet balance insufficient',
          }
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

module.exports = walletUsdtWithdraw
