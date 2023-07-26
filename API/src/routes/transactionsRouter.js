const { Router } = require('express')
const {
  transferBalanceUserToUserByEmail,
} = require('../controllers/transferBalanceController')

const validateToken = require('../middleware/validateToken')
const walletUsdtWithdraw = require('../controllers/WalletUSDTWithdrawController')
const { getWalletIdByUserId } = require('../controllers/walletController')
const { getTransactionsByWalletId } = require('../controllers/saveTransactionsController')

const router = Router()

router.post('/transfer-amount-by-email', validateToken, async (req, res) => {
  try {
    const transfer = await transferBalanceUserToUserByEmail(
      req.userId,
      req.body
    )
    res.status(201).json(transfer)
  } catch (error) {
    console.log(error.message)
    res.status(400).send(JSON.parse(error.message))
  }
})

router.post('/withdraw-in-usdt', validateToken, async (req, res) => {
  const userId = req.userId
  const { amount, walletReceiver } = req.body
  try {
    const transfer = await walletUsdtWithdraw(userId, amount, walletReceiver)
    res.status(201).json(transfer)
  } catch (error) {
    console.log(error.message)
    res.status(400).send(JSON.parse(error.message))
  }
})

router.get('/get-transactions-limit/:limit', validateToken, async (req, res) =>{
  try {
    const walletId = await getWalletIdByUserId(req.userId)
    const transactions = await getTransactionsByWalletId(walletId, parseInt(req.params.limit));
    res.status(200).json(transactions)
  } catch (error) {
    console.error('Error al obtener las transacciones:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/get-transactions-all', validateToken, async (req, res) =>{
  try {
    const walletId = await getWalletIdByUserId(req.userId)
    const transactions = await getTransactionsByWalletId(walletId);
    res.status(200).json(transactions)
  } catch (error) {
    console.error('Error al obtener las transacciones:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router
