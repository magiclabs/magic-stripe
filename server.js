require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);

/* For heroku deployment */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const listener = app.listen(process.env.PORT || 8080, function () {
  console.log("Listening on port " + listener.address().port);
});

/*
// Add the user to your list of customers
// Then create a PaymentIntent to track the customer's payment cycle
app.post("/create-payment-intent", async (req, res) => {
  const { email } = req.body;

  const paymentIntent = await stripe.customers
    .create({
      email,
    })
    .then((customer) =>
      stripe.paymentIntents
        .create({
          amount: 50000, // Replace this constant with the price of your service
          currency: "usd",
          customer: customer.id,
        })
        .catch((error) => console.log("error: ", error))
    );

  res.send({
    clientSecret: paymentIntent.client_secret,
    customer: paymentIntent.customer,
  });
});
*/

/*
// Update the customer's info to reflect that they've
// paid for lifetime access to your Premium Content
app.post("/update-customer", async (req, res) => {
  const { customerID } = req.body;

  const customer = await stripe.customers.update(customerID, {
    metadata: { lifetimeAccess: true },
  });

  res.send({
    customer,
  });
});
*/

/*
// Collect the customer's information to help validate
// that they've paid for lifetime access
app.post("/validate-customer", async (req, res) => {
  const { email } = req.body;

  const customer = await stripe.customers.list({
    limit: 1,
    email,
  });

  res.send({
    customer: customer.data,
  });
});
*/