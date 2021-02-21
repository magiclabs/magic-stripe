import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import PremiumContent from "./components/premium-content";
import Login from "./components/login";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Payment from "./components/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/payment-form";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

function App() {
  const [lifetimeAccess, setLifetimeAccess] = useState(false);
  const [
    lifetimeAccessRequestStatus,
    setLifetimeAccessRequestStatus,
  ] = useState("");

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/premium-content"
          render={() => {
            return (
              <PremiumContent
                lifetimeAccess={lifetimeAccess}
                setLifetimeAccess={setLifetimeAccess}
                lifetimeAccessRequestStatus={lifetimeAccessRequestStatus}
                setLifetimeAccessRequestStatus={setLifetimeAccessRequestStatus}
              />
            );
          }}
        />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/payment"
          render={(props) => {
            return (
              <Payment
                Elements={Elements}
                PaymentForm={PaymentForm}
                promise={promise}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
