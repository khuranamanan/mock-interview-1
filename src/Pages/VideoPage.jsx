import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useData } from "../Context/DataContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  ADD_TO_PLAYLIST,
  ADD_TO_WATCH_LATER,
  CREATE_PLAYLIST,
  REMOVE_FROM_WATCH_LATER,
} from "../Utils/constants";
import PlaylistModal from "../Components/PlaylistModal";
import NotesSection from "../Components/NotesSection";

function VideoPage() {
  const { vidId } = useParams();
  const {
    videos,
    state: { watchLater, playlists },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  const currVideo = videos.find(({ _id }) => _id === Number(vidId));

  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  function closePlaylistModal() {
    setPlaylistModalOpen(false);
  }

  function handleAddtoWatchLater(e) {
    e.stopPropagation();
    dispatch({ type: ADD_TO_WATCH_LATER, payload: { videoId: currVideo._id } });
  }

  function handleRemoveFromWL(e) {
    e.stopPropagation();
    dispatch({
      type: REMOVE_FROM_WATCH_LATER,
      payload: { videoId: currVideo._id },
    });
  }

  const watchLaterBtn = watchLater.includes(currVideo._id) ? (
    <button
      className="px-4 py-2 border text-blue-500 border-blue-500 rounded-lg"
      onClick={handleRemoveFromWL}
    >
      Remove from Watch Later
    </button>
  ) : (
    <button
      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
      onClick={handleAddtoWatchLater}
    >
      Watch Later
    </button>
  );

  function handleCreatePlaylist() {
    dispatch({
      type: CREATE_PLAYLIST,
      payload: { playlistName: newPlaylistName },
    });
    setNewPlaylistName("");
  }

  function handleAddToPlaylist() {
    dispatch({
      type: ADD_TO_PLAYLIST,
      payload: { videoId: currVideo._id, playlistId: selectedPlaylist },
    });
    setSelectedPlaylist("");
    closePlaylistModal();
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
        <h1 className="font-bold text-2xl">Video</h1>
      </div>

      <div className="w-full">
        <iframe
          src={currVideo.src}
          title={currVideo.title}
          allowFullScreen
          className="w-full  aspect-video mx-auto"
        ></iframe>
      </div>

      <h1 className="text-2xl font-medium">{currVideo.title}</h1>

      <div className="flex gap-5 justify-end">
        {watchLaterBtn}
        <div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
            onClick={() => {
              setPlaylistModalOpen(true);
            }}
          >
            Save To Playlist
          </button>
          <PlaylistModal
            isOpen={playlistModalOpen}
            closeModal={closePlaylistModal}
            playlists={playlists}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
            selectedPlaylist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
            handleCreatePlaylist={handleCreatePlaylist}
            handleAddToPlaylist={handleAddToPlaylist}
          />
        </div>
      </div>
      <NotesSection videoId={currVideo._id} />
    </div>
  );
}

export default VideoPage;
