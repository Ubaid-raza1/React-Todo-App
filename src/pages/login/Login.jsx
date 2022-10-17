import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InputFields from "../../Components/InputFields/InputFields";
import SButton from "../../Components/Button/SButton";
import Swal from "sweetalert2";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);

  const loginHandler = (event) => {
    event.preventDefault();
    const auth = getAuth();
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email.length > 50) {
      Swal.fire("Email Length less than 50 or equal");
    } else if (data.password.length > 50) {
      Swal.fire("Password Length less than 50 or equal");
    } else if (regex.test(data.email)) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          setLoading(false);
          const user = userCredential.user.uid;
          if (user) {
            Swal.fire("Good Job!", "You are Sign In Successfully", "success");
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          Swal.fire("Sorry!", errorCode, "warning");
          console.log(errorMessage);
          setLoading(true);
        });
      setLoading(false);
    } else if (!regex.test(data.email) && data.email !== "") {
      Swal.fire("Invalid Email special Character missing ");
    }
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
            disabled={!data.email.trim() || !data.password.trim()}
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
