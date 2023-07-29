import { useState } from "react";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import CreatePlaylistModal from "../Components/CreatePlaylistModal";

function PlaylistsPage() {
  const { state } = useData();
  const { playlists } = state;
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  return (
    <div className="p-4 mb-16 flex flex-col gap-4">
      <h1 className="font-bold text-2xl mb-4">Playlists</h1>

      <button
        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 inline-block w-fit"
        onClick={openCreateModal}
      >
        Create Playlist
      </button>

      <CreatePlaylistModal
        isOpen={createModalOpen}
        closeModal={closeCreateModal}
      />

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-2">No playlists created yet.</p>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
            onClick={() => navigate("/explore")}
          >
            Explore and Create Playlists
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >
              <h2 className="text-xl font-bold mb-2">{playlist.name}</h2>
              <p className="text-gray-600">
                Videos in this playlist: {playlist.videos.length}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistsPage;
