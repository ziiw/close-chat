
function Community ({community}) {
  return (
    <div>
      <h2>Community</h2>
      {community && !community.public && <p>This community is not public</p>}
      {community && Object.keys(community).map( k => {
        if (typeof community[k] === "object") {
          return <p key={k}>{k}: {Object.values(community[k]).length}</p>
        } else {
          return <p key={k}>{k}: {community[k]}</p>
        }
      })}
      {community ? <button>Subscribe</button> : <p>This community does not exists or is not public yet</p>}
    </div>
  )
}

export async function getServerSideProps ({req, res}) {
  const cookieSession = require('cookie-session')
  const admin = require('./../../utils/auth/firebaseAdmin').admin

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
      return {props: { community }}
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