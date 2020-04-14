import Head from 'next/head'

function Community ({community, session}) {

  const handleCheckoutStripe = async () => {
    const stripe = Stripe('pk_test_W2mEvplcIN0CPVy6aGwU1tpl004Qcg66XH')
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
    session: {decodedToken}
  } = req

  try {
    const ref = admin().firestore().collection('communities').doc(url.split('/community/')[1])
    const snap = await ref.get()
    const community = snap.data()

    if (community && (community.public || community.ownerId === decodedToken.user_id)) {

      const refCreator = admin().firestore().collection('creators').doc(community.ownerId).collection('private')
      const snapCreator = await refCreator.get()
      let creatorPrivate
      snapCreator.forEach(doc => { creatorPrivate = doc.data() })
      
      // TODO: Convert in Plan and not unique Product
      // use: 
      //// Create new Checkout Session for the order
      // Other optional params include:
      // [billing_address_collection] - to display billing address details on the page
      // [customer] - if you have an existing Stripe Customer ID
      // [customer_email] - lets you prefill the email input in the form
      
      // session = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card"],
      //   subscription_data: { items: [{ plan: planId }] },
      //   // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      //   success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${domainURL}/canceled.html`
      // });
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: `Close - ${community.displayName}`,
          amount: 1000,
          currency: 'eur',
          quantity: 1,
        }],
        payment_intent_data: {
          application_fee_amount: 200,
          transfer_data: {
            destination: creatorPrivate.stripeUserId,
          },
        },
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/failure',
      });

      return {props: { community, session }}
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