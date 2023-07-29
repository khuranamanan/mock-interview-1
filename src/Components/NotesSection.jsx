import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  ADD_NOTE_TO_VIDEO,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "../Utils/constants";
import { useData } from "../Context/DataContext";

/* eslint-disable react/prop-types */
function NotesSection({ videoId }) {
  const {
    state: { notes },
    dispatch,
  } = useData();

  const [newNote, setNewNote] = useState("");
  const [editNote, setEditNote] = useState(null);

  function handleSaveNotes() {
    if (newNote.trim() !== "") {
      const noteId = uuid();
      const newNoteObj = { id: noteId, message: newNote };
      dispatch({
        type: ADD_NOTE_TO_VIDEO,
        payload: { videoId, note: newNoteObj },
      });
      setNewNote("");
    }
  }

  function handleUpdateNotes() {
    if (editNote && newNote.trim() !== "") {
      dispatch({
        type: UPDATE_NOTE,
        payload: { videoId, noteId: editNote.id, message: newNote },
      });
      setNewNote("");
      setEditNote(null);
    }
  }

  function handleEditNote(note) {
    setEditNote(note);
    setNewNote(note.message);
  }

  function handleDeleteNotes(noteId) {
    dispatch({
      type: DELETE_NOTE,
      payload: { videoId, noteId },
    });
  }

  function renderNotes() {
    const videoNotes = notes[videoId];
    if (!videoNotes || videoNotes.length === 0) {
      return <p className="mt-2">No notes for this video.</p>;
    }

    return (
      <ul className="mt-4">
        {videoNotes.map((note) => (
          <li key={note.id} className="mb-2">
            <>
              <span>{note.message}</span>
              <span
                className="ml-2 cursor-pointer text-blue-500"
                onClick={() => handleEditNote(note)}
              >
                Edit
              </span>
              <span
                className="ml-2 cursor-pointer text-red-500"
                onClick={() => handleDeleteNotes(note.id)}
              >
                Delete
              </span>
            </>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border p-2 rounded-lg flex-grow"
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
          onClick={editNote ? handleUpdateNotes : handleSaveNotes}
        >
          {editNote ? "Update Note" : "Add Note"}
        </button>
      </div>
      {renderNotes()}
    </div>
  );
}

export default NotesSection;
