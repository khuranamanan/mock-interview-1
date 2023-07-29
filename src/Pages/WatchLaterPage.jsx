import { Link, useNavigate } from "react-router-dom";
import VideoCard from "../Components/VideoCard";
import { useData } from "../Context/DataContext";
import { AiOutlineArrowLeft } from "react-icons/ai";

function WatchLaterPage() {
  const navigate = useNavigate();
  const {
    state: { watchLater },
    videos,
  } = useData();

  const wlVideoList = videos.filter(({ _id }) => watchLater.includes(_id));

  const emptyWatchLaterEle = (
    <div className="flex flex-col items-center justify-center p-8">
      <p className="font-medium text-center mb-4">
        You don&apos;t have any videos in Watch Later.
      </p>
      <p className="text-gray-500">
        Start exploring and saving videos to your Watch Later list.
      </p>
      <Link to="/explore" className="text-blue-600 hover:underline mt-4">
        Explore Videos
      </Link>
    </div>
  );

  return (
    <div className="p-4 mb-16 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <button
          className="hover:bg-slate-100 text-gray-500 p-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-2xl">Watch Later:</h1>
      </div>

      {watchLater.length === 0 ? (
        emptyWatchLaterEle
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wlVideoList.map((video) => (
            <VideoCard key={video._id} video={video} fromWatchLater />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchLaterPage;
