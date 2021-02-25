import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./lib/UserContext";
import { LifetimeContext } from "./lib/LifetimeContext";
import { LifetimeAccessRequestStatusContext } from "./lib/LifetimeAccessRequestStatusContext";

// Import UI components
import Home from "./components/home";
import PremiumContent from "./components/premium-content";
import Login from "./components/login";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Payment from "./components/payment";
import PaymentForm from "./components/payment-form";
import Layout from "./components/layout";

// Import Magic-related things
import { magic } from "./lib/magic";

// Import Stripe-related things
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const promise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

  const [lifetimeAccess, setLifetimeAccess] = useState(false);
  const [
    lifetimeAccessRequestStatus,
    setLifetimeAccessRequestStatus,
  ] = useState("");
  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, set it to {user: null}
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      return isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser({ user: null });
    });
  }, []);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={[user, setUser]}>
          <LifetimeContext.Provider value={[lifetimeAccess, setLifetimeAccess]}>
            <LifetimeAccessRequestStatusContext.Provider
              value={[
                lifetimeAccessRequestStatus,
                setLifetimeAccessRequestStatus,
              ]}
            >
              <Layout>
                <Route path="/" exact component={Home} />
                <Route path="/premium-content" component={PremiumContent} />
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
              </Layout>
            </LifetimeAccessRequestStatusContext.Provider>
          </LifetimeContext.Provider>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
