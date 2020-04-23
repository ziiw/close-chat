// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_API);
import { admin } from './../../../../utils/auth/firebaseAdmin'

const handler = (req, res) => {
  const { body: { email, firebaseUID } } = req

  console.log(`Creating stripe account for ${email} @ ${firebaseUID}`)
  // stripe.accounts.create({
  //   type: 'custom',
  //   // Only french customers allowed
  //   country: 'FR',
  //   email,
  //   requested_capabilities: [
  //     'card_payments',
  //     'transfers',
  //   ]}, function(err, account) {
  //     // asynchronously called
  //     if (err) {
  //       res.status(500).json({error: err})
  //     } else {
  //       res.status(200).json({account})
  //     }
  //   }
  // );
}

const saveAccountToFirebase = (stripeAccount, firebaseUID) => {
  const db = admin().firestore()
}

export default handler