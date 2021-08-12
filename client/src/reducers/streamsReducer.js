const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STREAMS":
      const newObj = {};
      action.payload.forEach((stream) => (newObj[stream.id] = stream));
      return { ...state, ...newObj };
    case "FETCH_STREAM" || "CREATE_STREAM" || "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_STREAM":
      const { [action.payload]: removed, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

export default streamsReducer;
