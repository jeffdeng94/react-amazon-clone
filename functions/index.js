const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51KjiMTDF2LniEX2mQoZ9qf434Sd0J7RqvjYDIOxNhUYUJGaEXgXngavepti7taHafGNVAcv7AwN6NcStDZDE7fii00Mg7Ro6xv',
)
// API

// App config
const app = express()
// Middlewares
app.use(cors({ origin: true }))
app.use(express.json())
// API route
// test route
app.get('/', (req, res) => {
  return res.status(200).send('123')
})
app.post('/payments/create', async (req, res) => {
  const total = req.query.total
  console.log('Payment Request Received! for this amount >>> ', total)
  if (total !== 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'aud',
    })
    // 201 ok-created
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    })
  }
})
// Listen command
exports.api = functions.https.onRequest(app)

// eg endpoint
// http://localhost:5001/clone-591e6/us-central1/api
