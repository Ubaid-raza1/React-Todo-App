import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InputFields from "../../Components/InputFields/InputFields";
import SButton from "../../Components/Button/SButton";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);

  const loginHandler = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user.uid;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="login signup">
      <div className="form">
        <form onSubmit={loginHandler}>
          <h3 className="head-l-s">Sign In / Todo App</h3>
          <InputFields
            Lable={"Email"}
            Type={"email"}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            Required
          />
          <InputFields
            Lable={"Password"}
            Type={"password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            Required
          />
          <SButton
            Type={"submit"}
            Varaint={"contained"}
            value="Sign In"
            loading={loading}
          />
        </form>
        <p className="Link-Header">
          Do You Want To Create Account
          <Link to="/Signup" className="link-H">
            Sign Up?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
