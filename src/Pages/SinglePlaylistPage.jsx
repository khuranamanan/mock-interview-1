import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../Context/DataContext";
import { AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { DELETE_PLAYLIST, REMOVE_FROM_PLAYLIST } from "../Utils/constants";

function SinglePlaylistPage() {
  const { playlistId } = useParams();
  const {
    state: { playlists },
    videos,
    dispatch,
  } = useData();
  const navigate = useNavigate();

  const currPlaylist = playlists.find(({ id }) => id === playlistId);

  if (!currPlaylist) {
    return <div>Playlist not found.</div>;
  }

  const playlistVideos = videos.filter((video) =>
    currPlaylist.videos.includes(video._id)
  );

  function handleDeletePlaylist() {
    dispatch({
      type: DELETE_PLAYLIST,
      payload: { playlistId: currPlaylist.id },
    });
    navigate("/playlists");
  }

  function handleDeleteVideoFromPlaylist(videoId) {
    dispatch({
      type: REMOVE_FROM_PLAYLIST,
      payload: { videoId, playlistId: currPlaylist.id },
    });
  }

  return (
    <div className="p-4 mb-16 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <button
          className="hover:bg-slate-100 text-gray-500 p-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-xl">Playlist</h2>
      </div>

      <div className="flex items-center justify-between mb-4 border-b border-gray-200 p-2">
        <h1 className="font-bold text-3xl">{currPlaylist.name}</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white flex gap-2 px-3 py-2 rounded"
          onClick={handleDeletePlaylist}
        >
          <AiFillDelete size={24} /> Delete Playlist
        </button>
      </div>

      {playlistVideos.length === 0 ? (
        <p>No videos in this playlist.</p>
      ) : (
        <div>
          {playlistVideos.map((video) => (
            <div
              key={video._id}
              className="flex flex-col p-2 justify-center border-y border-gray-200 md:flex-row items-center mb-2"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 aspect-video mr-4 object-cover"
              />
              <p className="flex-1">{video.title}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white flex gap-2 px-3 py-2 rounded"
                onClick={() => handleDeleteVideoFromPlaylist(video._id)}
              >
                <AiFillDelete size={20} /> Delete Video From Playlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SinglePlaylistPage;
