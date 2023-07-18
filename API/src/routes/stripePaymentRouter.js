const { Router } = require('express')
const {
  createPaymentIntent,
  webHookStripe,
} = require('../controllers/stripePaymentController')
const validateToken = require('../middleware/validateToken')

const router = Router()

router.post('/create-payment-intent', validateToken, async (req, res) => {
  try {
    console.log(req.body)
    const { amount } = req.body
    const clientSecret = await createPaymentIntent(amount, req.userId)
    res.send({ clientSecret: clientSecret })
  } catch (error) {
    console.log(error)
    res.json({ error: error })
  }
})

router.post('/stripe-web-hook', async (req, res) => {
  await webHookStripe(req, res)
})

module.exports = router
