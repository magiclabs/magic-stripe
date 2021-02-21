import { useState } from "react";
import Webauthn from "./webauthn";
import { validateEmail } from "../lib/helpers";
import {
  Input,
  Icon,
  MonochromeIcons,
  useToast,
  CallToAction,
} from "@magiclabs/ui";

const SignUpForm = ({ onEmailSubmit, disabled, onWebauthnSubmit }) => {
  const [email, setEmail] = useState("");
  const { createToast } = useToast();

  const addToast = () => {
    createToast({ message: "Invalid email", type: "error", lifespan: 2000 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !email || !validateEmail(email) ? addToast() : onEmailSubmit(email);
  };

  return (
    <>
      <h3 className="form-header">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Input
            placeholder="Enter your email"
            size="sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<Icon inline type={MonochromeIcons.Envelope} size={22} />}
          />
        </div>
        <div className="submit">
          <CallToAction
            leadingIcon={MonochromeIcons.PaperPlane}
            color="primary"
            size="sm"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Sign up
          </CallToAction>
          <Webauthn
            onSubmit={onWebauthnSubmit}
            email={email}
            addToast={addToast}
          />
        </div>
      </form>
      <style>{`
        form,
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 87%;
          margin: 0 auto;
        }
        .submit {
          display: flex;
          justify-content: space-between;
          width: 87%;
          margin: 20px auto 0;
        }
      `}</style>
    </>
  );
};

export default SignUpForm;
