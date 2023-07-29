/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { useData } from "../Context/DataContext";
import { Dialog, Transition } from "@headlessui/react";
import { CREATE_PLAYLIST } from "../Utils/constants";

function CreatePlaylistModal({ isOpen, closeModal }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { dispatch } = useData();

  function handleCreatePlaylist() {
    dispatch({
      type: CREATE_PLAYLIST,
      payload: { playlistName: newPlaylistName },
    });
    setNewPlaylistName("");
    closeModal();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 mr-2"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CreatePlaylistModal;
