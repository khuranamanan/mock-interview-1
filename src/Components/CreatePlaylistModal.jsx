/* eslint-disable react/prop-types */
import { useState } from "react";
import { useData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { CREATE_PLAYLIST } from "../Utils/constants";

function CreatePlaylistModal({ isOpen, closeModal }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useData();

  function handleCreatePlaylist() {
    dispatch({
      type: CREATE_PLAYLIST,
      payload: { playlistName: newPlaylistName },
    });
    setNewPlaylistName("");
    closeModal();
    navigate("/playlists");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      as="div"
      className="fixed inset-0 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

      <div className="bg-white p-6 rounded-md shadow-lg z-10">
        <Dialog.Title as="h2" className="text-xl font-bold mb-4">
          Create Playlist
        </Dialog.Title>
        <input
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 mr-2"
            onClick={handleCreatePlaylist}
          >
            Create
          </button>
          <button
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default CreatePlaylistModal;
