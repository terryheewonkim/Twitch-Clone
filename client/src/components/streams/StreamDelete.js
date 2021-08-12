import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${stream.title} ?`;
  };

  const actions = (
    <>
      <button className="ui button negative" onClick={() => dispatch(deleteStream(id))}>
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
};

export default StreamDelete;
