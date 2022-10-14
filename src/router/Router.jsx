import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { USER_UID } from "../reducer/Action";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import { useEffect } from "react";

const Router = () => {
  const state = useSelector((state) => state);
  const User = state?.userUid;
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch({ type: USER_UID, payload: uid });
        // ...
      } else dispatch({ type: USER_UID, payload: false });
    });
  }, []);
  if (state?.loading)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  return (
    <>
      {User ? (
        <Routes>
          <Route path="/Todo" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default Router;
