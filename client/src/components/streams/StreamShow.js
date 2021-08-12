import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

const StreamShow = () => {
  const { id } = useParams();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.streams[id]);

  // FETCH STREAM
  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  // LOAD PLAYER
  useEffect(() => {
    if (!stream) {
      return;
    }

    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [id, stream]);

  if (!stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

export default StreamShow;
