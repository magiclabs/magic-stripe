import Layout from "./layout";
import { useUser } from "../lib/hooks";

export default function Payment({ Elements, PaymentForm, promise }) {
  const user = useUser();
  const person = user && user.email ? user.email : "";

  return (
    <div>
      <Layout>
        <h3 className="h3-header">Purchase Lifetime Access Pass to Awesomeness 🤩</h3>
        <p>
          Hi again {person}! You successfully signed up with your email. Please
          enter your card information below to purchase your Lifetime Access
          Pass securely via Stripe:
        </p>
        {user ? (
          <Elements stripe={promise}>
            <PaymentForm email={user.email} />
          </Elements>
        ) : (
          "Waiting for user info..."
        )}
      </Layout>
      <style>{`
        p {
          margin-bottom: 15px;
        }
        .h3-header {
          font-size: 22px;
          margin: 25px 0;
        }
      `}</style>
    </div>
  );
}
