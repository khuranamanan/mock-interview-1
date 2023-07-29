/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";
import { useData } from "../Context/DataContext";
import {
  ADD_TO_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
} from "../Utils/constants";

function VideoCard({ video, fromWatchLater = false }) {
  const navigate = useNavigate();
  const {
    state: { watchLater },
    dispatch,
  } = useData();

  function handleAddtoWatchLater(e) {
    e.stopPropagation();
    dispatch({ type: ADD_TO_WATCH_LATER, payload: { videoId: video._id } });
  }

  function handleNavigateToWL(e) {
    e.stopPropagation();
    navigate("/watch-later");
  }

  const watchLaterBtn = watchLater.includes(video._id) ? (
    <button
      className="px-4 py-2 border text-blue-500 border-blue-500 rounded-lg"
      onClick={handleNavigateToWL}
    >
      Go to Watch Later
    </button>
  ) : (
    <button
      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
      onClick={handleAddtoWatchLater}
    >
      Watch Later
    </button>
  );

  function handleRemoveFromWL(e) {
    e.stopPropagation();
    dispatch({
      type: REMOVE_FROM_WATCH_LATER,
      payload: { videoId: video._id },
    });
  }

  const removefromWatchLaterBtn = (
    <button
      className="px-4 py-2 border text-gray-400 border-gray-400 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600"
      onClick={handleRemoveFromWL}
    >
      Remove from Watch Later
    </button>
  );

  return (
    <div
      className="p-4 border border-gray-200 rounded-lg shadow flex flex-col cursor-pointer gap-4"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <div className="relative aspect-video">
        <img
          className="object-cover rounded-sm w-full h-full"
          src={video.thumbnail}
          alt={video.title}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white flex items-center p-2 rounded-full text-xs">
          {video.category}
        </div>
      </div>
      <div className="grow">
        <h2 className="text-lg font-medium">{video.title}</h2>
        <div className="text-gray-500">{video.creator}</div>
      </div>

      <div className="text-gray-500">{video.views} views</div>
      {fromWatchLater ? removefromWatchLaterBtn : watchLaterBtn}
    </div>
  );
}

export default VideoCard;
