import React, { useEffect } from "react";
import { useUser } from "../lib/hooks";
import Layout from "./layout";
import { CallToAction } from "@magiclabs/ui";
import { useHistory } from "react-router-dom";

const PremiumContent = ({
  setLifetimeAccess,
  lifetimeAccess,
  setLifetimeAccessRequestStatus,
  lifetimeAccessRequestStatus,
}) => {
  const user = useUser();
  const email = user && user.email ? user.email : "";
  const history = useHistory();

  // Check to see whether or not the user has paid.
  useEffect(() => {
    if (email && !lifetimeAccessRequestStatus) {
      setLifetimeAccessRequestStatus("Pending");
      window
        .fetch(`${process.env.REACT_APP_SERVER_URL}/api/validate-customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLifetimeAccessRequestStatus("Complete");
          if (
            data.customer.length &&
            data.customer[0].metadata.lifetimeAccess === "true"
          ) {
            setLifetimeAccess(true);
          }
        });
    }
  });

  return (
    <Layout>
      {user && lifetimeAccess ? (
        <>
        <h3 className="h3-header">Here's all of our PREMIUM content! 😍</h3>
        <div>♡ PREMIUM AWESOMENESS.</div>
        <div>♡ PREMIUM AWESOMENESS.</div>
        <div>♡ PREMIUM AWESOMENESS.</div>
        <div>♡ PREMIUM AWESOMENESS.</div>
        </>
      ) : (
        <>
        <h3 className="h3-header">So you want our PREMIUM content? 😎</h3>
          <div>
            🧠 Our premium content includes some AWESOME stuff.
          </div>

          <div>
            🪄 To access the awesomeness, purchase a Lifetime Access Pass below.
          </div>

          <div>💸 The Magic Lifetime Access Pass is only $50!</div>
          {user ? (
            <CallToAction
              color="primary"
              size="sm"
              onPress={() => history.push("/payment")}
            >
              Count Me In
            </CallToAction>
          ) : (
            <CallToAction
              color="primary"
              size="sm"
              onPress={() => history.push("/signup")}
            >
              Count Me In
            </CallToAction>
          )}
        </>
      )}
      <style>{`
        .h3-header {
          font-size: 22px;
          margin: 25px 0;
        }
        div {
          font-size: 17px;
          margin-bottom: 15px;
        }
      `}</style>
    </Layout>
  );
};

export default PremiumContent;
