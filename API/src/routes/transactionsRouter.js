const { Router } = require('express')
const {
  transferBalanceUserToUserByEmail,
} = require('../controllers/transferBalanceController')

const validateToken = require('../middleware/validateToken')
const walletUsdtWithdraw = require('../controllers/WalletUSDTWithdrawController')

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

module.exports = router
