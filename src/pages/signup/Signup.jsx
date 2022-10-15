import React, { useState } from "react";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { Database } from "../../firebase/Firebase";
import { Link } from "react-router-dom";
import InputFields from "../../Components/InputFields/InputFields";
import SButton from "../../Components/Button/SButton";
import Swal from "sweetalert2";

const Signup = () => {
  const Collection = collection(Database, "UserData");
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const signupHandler = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in
        setLoading(false);
        const uid = userCredential.user.uid;
        if (uid) {
          await setDoc(doc(Collection, uid), {
            FName: data.fName,
            LName: data.lName,
            Email: data.email,
          });
          Swal.fire("Good!", "Account is Created Successfull", "success");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire("Sorry!", errorCode, "warning");

        console.log(errorMessage);
        setLoading(false);
        // ..
      });
    setLoading(false);
  };
  return (
    <div className="signup">
      <div className="form">
        <form onSubmit={signupHandler}>
          <h3 className="head-l-s">Create Account / Todo App </h3>
          <InputFields
            Lable={"First Name"}
            value={data.fName}
            onChange={(e) => setData({ ...data, fName: e.target.value })}
            Required
          />
          <InputFields
            Lable={"Last Name"}
            value={data.lName}
            onChange={(e) => setData({ ...data, lName: e.target.value })}
            Required
          />

          <InputFields
            Lable={"Email"}
            value={data.email}
            Type={"email"}
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
            loading={loading}
            disabled={
              !data.fName.trim() ||
              !data.lName.trim() ||
              !data.email.trim() ||
              !data.password.trim()
            }
            value="Signup"
          />
        </form>
        <div className="P-Lo-Li">
          <p className="Link-Header">
            If you have created an account, go to the sign-in page
            <Link to="/" className="link-H">
              Sign In Page?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
