import React, { useEffect, useState } from "react";
import "./Home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddIcon from "@mui/icons-material/Add";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD,
  REMOVE_ALL,
  DELETE,
  UPDATE,
  GET,
  USER_UID,
} from "../../reducer/Action";
import { Database } from "../../firebase/Firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import Navbar from "../../Components/navbar/Navbar";
import InputFields from "../../Components/InputFields/InputFields";
import SButton from "../../Components/Button/SButton";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Swal from "sweetalert2";

const Home = () => {
  const [value, setValue] = useState();
  const [toggleBtn, setToggleBtn] = useState(false);
  const [index, setIndex] = useState();
  const [hidden, setHidden] = useState(true);
  const [element, setElement] = useState();
  const [loading, setLoading] = useState(true);

  const state = useSelector((state) => state);
  const UserData = state.userData;
  const UserUid = state.userUid;

  const dispatch = useDispatch();

  const Collection = collection(Database, "UserData");
  const auth = getAuth();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValue("");
    setHidden(true);
    updateDoc(doc(Collection, UserUid), {
      user: [value, ...UserData],
    });
    dispatch({ type: ADD, payload: value });
    setLoading(true);
  };

  const Delete = (index) => {
    dispatch({ type: DELETE, payload: index });
    updateDoc(doc(Collection, UserUid), {
      user: [...UserData].filter((ele, i) => i !== index),
    });
    setValue("");
    setToggleBtn(false);
    setHidden(true);
    setLoading(true);
  };

  const Edit = (ele, index) => {
    setElement(ele);
    setValue(ele);
    setIndex(index);
    setToggleBtn(true);
    setHidden(false);
    setLoading(true);
  };

  const Update = (event) => {
    event.preventDefault();
    updateDoc(doc(Collection, UserUid), {
      user: (UserData[index] = value),
      user: [...UserData],
    });
    dispatch({ type: UPDATE, payload: { index, value } });
    setValue("");
    setIndex();
    setToggleBtn(false);
    setHidden(true);
    setLoading(true);
  };

  const Remove = () => {
    dispatch({ type: REMOVE_ALL });
    setValue("");
    setToggleBtn(false);
    updateDoc(doc(Collection, UserUid), {
      user: [],
    });
    setLoading(true);
  };

  const onCancel = () => {
    setToggleBtn(false);
    setValue("");
    setHidden(true);
    setLoading(true);
  };

  const Getdata = async () => {
    const docRef = doc(Collection, UserUid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data().user;
    if (UserUid) {
      dispatch({ type: GET, payload: data ? data : [] });
    } else {
      dispatch({ type: GET, payload: false });
    }
  };

  const SignOut = async () => {
    await signOut(auth)
      .then((res) => {
        Swal.fire("SignOut!", "SuccessFull", "info");

        dispatch({ type: REMOVE_ALL, payload: [] });
        dispatch({ type: USER_UID, payload: false });
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire("Sorry!", error.code, "warning");
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    Getdata();
  }, [UserUid]);

  return (
    <div className="container">
      <Navbar SignOut={SignOut} UserUid={UserUid} />
      <div className="Home-form">
        <form onSubmit={toggleBtn ? Update : onSubmitHandler}>
          <InputFields
            value={value}
            onChange={(e) => setValue(e.target.value)}
            Required
            maxLength={"100"}
          />
          <div className="btn">
            {toggleBtn ? (
              <div className="main-btn">
                <SButton
                  Type={"submit"}
                  Varaint={"contained"}
                  color={"success"}
                  value="Update"
                  size="large"
                  id={"remove-btn"}
                  disabled={!value.trim() || element === value}
                  startIcon={<BorderColorSharpIcon />}
                  loading={loading}
                />

                <SButton
                  id={"remove-btn"}
                  Varaint={"contained"}
                  color={"error"}
                  size="large"
                  value="Cancel"
                  onClick={onCancel}
                  startIcon={<CancelPresentationIcon />}
                  loading={loading}
                />
              </div>
            ) : (
              <SButton
                Type={"submit"}
                id="Add-btn"
                Varaint={"contained"}
                size="large"
                disabled={!value?.trim()}
                value="ADD"
                endIcon={<AddIcon />}
                loading={loading}
              />
            )}
          </div>
        </form>
      </div>
      <div className="List">
        {state?.homeLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          UserData?.map((ele, i) => {
            return (
              <div
                key={i}
                className="under-List"
                style={{
                  backgroundColor: `rgba(${Math.ceil(
                    Math.random() * 255
                  )}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
                    Math.random() * 255
                  )},0.4)`,
                }}
              >
                <div className="list">
                  <h3 id="list">{ele}</h3>
                </div>
                <span className="under-btn">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="error"
                    disabled={hidden ? false : true}
                    onClick={() => Delete(i)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="Edit"
                    size="large"
                    color="success"
                    onClick={() => Edit(ele, i)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </span>
              </div>
            );
          })
        )}
      </div>
      <div className="rem">
        {!!UserData?.length && (
          <SButton
            size="large"
            onClick={Remove}
            id="Add-btn"
            value="Remove All"
            disabled={hidden ? false : true}
            startIcon={<HighlightOffRoundedIcon />}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
