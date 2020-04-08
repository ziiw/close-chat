// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_API);
import { admin } from '../../../utils/auth/firebaseAdmin'
import commonMiddleware from './../../../utils/middleware/commonMiddleware'

const handler = async (req, res) => {
  const {
    query: { code },
    session: { decodedToken }
  } = req

  console.log(`Verifying account ${decodedToken.uid}, with ${code}`)
  
  if (!code || !decodedToken) {
    res.writeHead(302, {'Location': `/account?error=no_codeORno_uid`})
    res.end()
    return
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    })

    const data = {stripeUserId: response.stripe_user_id}

    // Save infos in the creator document
    const db = admin().firestore()
    const ref = db.collection(`creators/${decodedToken.uid}/private`).doc()
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

export default commonMiddleware(handler)