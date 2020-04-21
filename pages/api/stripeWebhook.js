import { admin } from './../../utils/auth/firebaseAdmin'
import Cors from 'cors'
import { buffer } from 'micro'

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_API)
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec_wvkodpSbJzC9PRj4rniRc2beYYAWHAl8';

// // Initializing the cors middleware
const cors = Cors({
  methods: ['HEAD', 'POST'],
})

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (request, response) => {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
    } catch (err) {
      console.log(err.message)
      console.log(request.body)
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log(session)
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method Not Allowed')
  }
}