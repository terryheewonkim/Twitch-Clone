const INIT_STATE = {
  isSignedIn: null,
  userId: null,
  name: "",
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        name: action.payload.name,
      };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null, name: "" };
    default:
      return state;
  }
};

export default authReducer;
