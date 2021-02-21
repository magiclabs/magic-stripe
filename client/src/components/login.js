import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { useUser } from "../lib/hooks";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import Layout from "./layout";
import LoginForm from "./login-form";
import { useHistory } from "react-router-dom";

const Login = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const history = useHistory();
  const [magic, setMagic] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    !magic &&
      setMagic(
        new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
          extensions: [new WebAuthnExtension()],
        })
      );
    magic?.preload();
  }, [magic]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // Disable login button to prevent multiple emails from being triggered
      let didToken = await magic.auth.loginWithMagicLink({
        email,
      });
      authenticateWithServer(didToken);
    } catch (error) {
      setDisabled(false); // Re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  // Try to login with WebAuthn
  // If that fails, revert to logging in with WebAuthn
  async function handleLoginWithWebauthn(email) {
    try {
      let didToken = await magic.webauthn.login({ username: email });
      authenticateWithServer(didToken);
    } catch (error) {
      try {
        let didToken = await magic.webauthn.registerNewUser({
          username: email,
        });
        authenticateWithServer(didToken);
      } catch (err) {
        alert(
          "Failed to authenticate. Must be using a supported device and a username not already taken."
        );
        console.log(err);
      }
    }
  }

  // Verify DID token
  async function authenticateWithServer(didToken) {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      credentials: "include",
    });
    res.status === 200 && history.push("/premium-content");
  }

  return (
    <Layout>
      <div className="login">
        <LoginForm
          disabled={disabled}
          onEmailSubmit={handleLoginWithEmail}
          onWebauthnSubmit={handleLoginWithWebauthn}
        />
      </div>
      <style>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  );
};

export default Login;
