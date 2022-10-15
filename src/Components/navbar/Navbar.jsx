import React, { useState } from "react";
import "./Navbar.css";
import { Database } from "../../firebase/Firebase";
import { collection, getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER } from "../../reducer/Action";
import SButton from "../Button/SButton";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = ({ SignOut, UserUid }) => {
  const [loading, setLoading] = useState(true);
  const Collection = collection(Database, "UserData");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const User = state?.User;

  useEffect(() => {
    const GetUser = async () => {
      const docRef = doc(Collection, UserUid);
      const getRef = await getDoc(docRef);
      const Fname = getRef.data().FName;
      const Lname = getRef.data().LName;
      if (state?.userUid) {
        dispatch({ type: USER, payload: { Fname, Lname } });
      } else {
        dispatch({ type: USER, payload: false });
      }
    };
    GetUser();
  }, []);

  return (
    <div>
      <nav className="nav">
        <p className="UserName">
          <HomeIcon fontSize="large" />
          {state?.homeLoading
            ? "Loading....."
            : `Hi ! ${User.Fname + " " + User.Lname}`}
        </p>
        <p className="Head">WellCome To Todo App</p>
        <div>
          <LogoutIcon className="signOut-Icon" onClick={SignOut} />
          <SButton
            onClick={SignOut}
            Varaint={"contained"}
            color="error"
            value="SignOut"
            startIcon={<LogoutIcon />}
            id="signOut-btn"
            loading={loading}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
