import { useDispatch } from "react-redux";

import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = () => {
  const dispatch = useDispatch();

  const submitHandler = (formValues) => {
    dispatch(createStream(formValues));
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={submitHandler} />
    </div>
  );
};

export default StreamCreate;
