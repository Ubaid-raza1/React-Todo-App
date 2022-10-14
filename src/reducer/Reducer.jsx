import { ADD, REMOVE_ALL, DELETE, UPDATE, GET, USER_UID, USER } from "./Action";
const InitialState = {
  userData: [],
  userUid: false,
  User: {},
  loading: true,
  homeLoading: true,
};

const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        userData: [action.payload, ...state.userData],
      };
    case GET:
      return { ...state, userData: action.payload, homeLoading: false };
    case USER_UID:
      return { ...state, userUid: action.payload, loading: false };
    case DELETE:
      return {
        ...state,
        userData: [...state.userData.filter((e, i) => i !== action.payload)],
      };
    case UPDATE:
      let arr = [...state.userData];
      arr[action.payload.index] = action.payload.value;
      return {
        ...state,
        userData: arr,
      };
    case USER:
      return {
        ...state,
        User: { Fname: action.payload.Fname, Lname: action.payload.Lname },
        homeLoading: false,
      };
    case REMOVE_ALL:
      return { ...state, userData: [] };
    default:
      return state;
  }
};

export default Reducer;
