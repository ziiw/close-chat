// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_API);
import { admin } from './../../../../utils/auth/firebaseAdmin'

export default async (req, res) => {
  const {
    query: { email, code },
  } = req

  console.log(`Verifying account ${email}, with ${code}`)

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    })

    const data = {stripeUserId: response.stripe_user_id}

    const db = admin.firestore()
    const ref = db.collection(`creators`).doc(email)
    const snap = await ref.get()

    snap.exists ? await ref.update(data) : await ref.set(data)

    res.writeHead(302, {'Location': `/account`});
  } catch (error) {
    console.log(error)
    res.writeHead(302, {'Location': `/account?error=${error}`})
  } finally {
    res.end()
  }
}