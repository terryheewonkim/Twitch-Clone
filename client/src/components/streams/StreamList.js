import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams } from "../../actions";

const StreamList = () => {
  const dispatch = useDispatch();
  const streams = useSelector((state) => Object.values(state.streams));
  const currentUserId = useSelector((state) => state.auth.userId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreateBtn = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreateBtn()}
    </div>
  );
};

export default StreamList;
