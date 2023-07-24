const {
  getWalletIdByUserId,
  increaseWalletAmount,
} = require('./walletController')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const createPaymentIntent = async (amount, userId) => {
  const amountFinal = amount * 100 //convertir a centavos 1usd = 100 centavos
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountFinal,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId: userId, //
    },
  })
  return paymentIntent.client_secret
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_CLI

const webHookStripe = async (request, response) => {
  console.log('webhook stripe siendo usado!')
  const sig = request.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret)
  } catch (err) {
    console.log(err)
    response.status(400).send(`Webhook Error: ${err.message}`)
    return
  }
  const paymentIntent = event.data.object
  const userId = paymentIntent.metadata.userId
  const payAmount = paymentIntent.amount / 100 // 100 centimos = 1usd
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const walleId = await getWalletIdByUserId(userId)
      await increaseWalletAmount(walleId, payAmount)
      console.log(
        `Payment succeeded for user the ID: ${userId} of amount : ${payAmount}`
      )
      break
    case 'payment_intent.payment_failed':
      console.log('Payment failed for user the ID:', userId)
    default:
    // Otros eventos
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send()
}

module.exports = { createPaymentIntent, webHookStripe }
