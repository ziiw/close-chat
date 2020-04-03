# Close

## Prerequisities
Install the Firebase CLI
```bash
npm install -g firebase-tools
```

Add the file `.env`
```
# .env
# == Firebase app keys (staging) ==
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```
and the `.env.build`
```
# .env
# == Firebase app keys (staging) ==
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
# == Firebase admin keys (serviceAccount-staging.json)==
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

For staging work you should also have downloaded the private key file `.json` from the Firebase staging project and put it here `./function/serviceAccount-staging.json`

## Packages
`node-fetch`: Use to bring `fetch` on the server side (useful when SSR).

## Deploy your own

Deploy the example using [ZEIT Now](https://zeit.co/now):

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/zeit/next.js/tree/canary/examples/with-redux-thunk)

## How to use

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [ZEIT Now](https://zeit.co/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).