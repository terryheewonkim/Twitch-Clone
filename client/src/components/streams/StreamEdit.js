import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const submitHandler = (formValues) => {
    dispatch(editStream(id, formValues));
  };

  if (!stream) {
    return <div>Loading...</div>;
  }

  const { title, description } = stream;

  return (
    <div>
      <h3>Edit a Stream</h3>
      {/* initialValues is a special prop for redux-form */}
      <StreamForm initialValues={{ title, description }} onSubmit={submitHandler} />
    </div>
  );
};

export default StreamEdit;
