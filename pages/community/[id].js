import Head from 'next/head'

function Community ({community, session, creatorPrivate}) {

  const handleCheckoutStripe = async () => {
    const stripe = Stripe('pk_test_W2mEvplcIN0CPVy6aGwU1tpl004Qcg66XH', {stripeAccount: creatorPrivate.stripeUserId})
    const {error} = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: session.id
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.log(error && error.message)
  }

  return (
    <div>
      <Head>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <h2>Community</h2>
      {!community && 'Loading or error loading community.'}
      {community && !community.public && <p>This community is not public</p>}
      {community && Object.keys(community).map( k => {
        if (typeof community[k] === "object") {
          return <p key={k}>{k}: {Object.values(community[k]).length}</p>
        } else {
          return <p key={k}>{k}: {community[k]}</p>
        }
      })}
      {community ? <button onClick={handleCheckoutStripe}>Subscribe</button> : <p>This community does not exists or is not public yet</p>}
    </div>
  )
}

export async function getServerSideProps ({req, res}) {
  const cookieSession = require('cookie-session')
  const admin = require('./../../utils/auth/firebaseAdmin').admin
  const stripe = require('stripe')(process.env.STRIPE_SECRET_API)

  const sessionSecrets = [
    process.env.SESSION_SECRET_CURRENT,
    process.env.SESSION_SECRET_PREVIOUS,
  ]

  // Example:
  // https://github.com/billymoon/micro-cookie-session
  const includeSession = cookieSession({
    keys: sessionSecrets,
    // TODO: set other options, such as "secure", "sameSite", etc.
    // https://github.com/expressjs/cookie-session#cookie-options
    maxAge: 604800000, // week
    httpOnly: true,
    overwrite: true,
  })
  includeSession(req, res, () => {})

  const {
    url,
    session: { decodedToken }
  } = req
  
  const communityID = url.split('/community/')[1]

  try {
    const ref = admin().firestore().collection('communities').doc(communityID)
    const snap = await ref.get()
    const community = snap.data()

    // If not logged-in
    // if (!decodedToken) {
    //   return { props: { community }}
    // }

    // TODO: Check if the user is already a subscriber
    // 
    // const refUser = admin().firestore().collection('users').doc(decodedToken.user_id)
    // const snapUser = await refUser.get()
    // const user = snapUser.data()

    // // If is a subscriber
    // if (user && user.communities.includes(communityID)) {
    //   return { props: { community, isSubscribed: true }}
    // }

    if (community && (community.public || community.ownerId === decodedToken.user_id)) {

      const refCreator = admin().firestore().collection('creators').doc(community.ownerId).collection('private')
      const snapCreator = await refCreator.get()
      let creatorPrivate
      snapCreator.forEach(doc => { creatorPrivate = doc.data() })

      const api_route = `/community/${communityID}`
      const host = req.headers.host
      const protocol = host.indexOf('localhost') === -1 ? 'https://' : 'http://'
      const redirectURI = `${protocol}${host}${api_route}`

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        subscription_data: {
          items: [{
            plan: community.stripe_plan,
          }],
          application_fee_percent: 20,
        },
        success_url: `${redirectURI}?success=true`,
        cancel_url: `${redirectURI}?success=false`,
      }, {
        stripeAccount: creatorPrivate.stripeUserId,
      });

      return {props: { community, session, creatorPrivate }}
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      community: null
    }
  }
}

export default Community