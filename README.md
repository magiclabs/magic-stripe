
# Demo
https://cryptic-waters-25194.herokuapp.com/

# Quick Start Instructions

#### Start your Express server

1. `git clone https://github.com/magiclabs/magic-stripe.git`
2. `cd magic-stripe`
3. `mv .env.example .env`
5. `yarn`
6. `node server.js`

#### Start your React client (in a new CLI tab)

1. `cd client`
2. `mv .env.example .env`
3. `yarn`
4. `yarn start`

# .env Files

There are two .env files; one for the client and another for the server.

- Grab your `REACT_APP_MAGIC_PUBLISHABLE_KEY` and `MAGIC_SECRET_KEY` from your [**Magic Dashboard**](https://dashboard.magic.link). 
- Grab your `REACT_APP_STRIPE_PK_KEY` and `STRIPE_SECRET_KEY` from your [**Stripe Dashboard**](https://dashboard.stripe.com/test/dashboard).
- Randomly generate a secure 32+ character for `JWT_SECRET`. This is used to sign the JSON web tokens the server issues once a user logs in. You'll also use the secret when you verify the JWT, and if it's altered in any way, the signature will not match when calling `jwt.verify(token)`. A great tool to visualize this is https://jwt.io/.

### client/.env (client)
```txt
REACT_APP_MAGIC_PUBLISHABLE_KEY=pk_test_XXX
REACT_APP_CLIENT_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:8080
REACT_APP_STRIPE_PK_KEY=pk_test_XXX
```

### .env (server)
```txt
MAGIC_SECRET_KEY=sk_test_XXX
JWT_SECRET=your-32+-character-jwt-secret
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_XXX
```

⚠️ _**Note**: This tutorial was built using Magic UI components. If you swap them out for your own custom CSS, you can delete `@magiclabs/ui` and `framer-motion`from your `client/package.json` dependencies._

# Tutorial
[https://magic.link/posts/magic-stripe](https://magic.link/posts/magic-react-express)
