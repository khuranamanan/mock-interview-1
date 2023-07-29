import { v4 as uuid } from "uuid";
import {
  ADD_NOTE_TO_VIDEO,
  ADD_TO_PLAYLIST,
  ADD_TO_WATCH_LATER,
  CREATE_PLAYLIST,
  DELETE_NOTE,
  DELETE_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  REMOVE_FROM_WATCH_LATER,
  UPDATE_NOTE,
} from "../Utils/constants";

export const initialState = {
  watchLater: localStorage.getItem("watchLater")
    ? JSON.parse(localStorage.getItem("watchLater"))
    : [],
  playlists: localStorage.getItem("playlists")
    ? JSON.parse(localStorage.getItem("playlists"))
    : [],
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : {},
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WATCH_LATER: {
      const updatedWatchLater = [
        ...new Set([...state.watchLater, action.payload.videoId]),
      ];
      localStorage.setItem("watchLater", JSON.stringify(updatedWatchLater));
      return {
        ...state,
        watchLater: updatedWatchLater,
      };
    }

    case REMOVE_FROM_WATCH_LATER: {
      const updatedWatchLaterWithoutVideo = state.watchLater.filter(
        (videoId) => videoId !== action.payload.videoId
      );
      localStorage.setItem(
        "watchLater",
        JSON.stringify(updatedWatchLaterWithoutVideo)
      );
      return {
        ...state,
        watchLater: updatedWatchLaterWithoutVideo,
      };
    }

    case CREATE_PLAYLIST: {
      const newPlaylist = {
        id: uuid(),
        name: action.payload.playlistName,
        videos: [],
      };
      const updatedPlaylists = [...state.playlists, newPlaylist];
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
      return {
        ...state,
        playlists: updatedPlaylists,
      };
    }

    case DELETE_PLAYLIST: {
      const updatedPlaylistsWithoutDeleted = state.playlists.filter(
        (playlist) => playlist.id !== action.payload.playlistId
      );
      localStorage.setItem(
        "playlists",
        JSON.stringify(updatedPlaylistsWithoutDeleted)
      );
      return {
        ...state,
        playlists: updatedPlaylistsWithoutDeleted,
      };
    }

    case ADD_TO_PLAYLIST: {
      const updatedPlaylistsWithVideo = state.playlists.map((playlist) =>
        playlist.id === action.payload.playlistId
          ? {
              ...playlist,
              videos: [...playlist.videos, action.payload.videoId],
            }
          : playlist
      );
      localStorage.setItem(
        "playlists",
        JSON.stringify(updatedPlaylistsWithVideo)
      );
      return {
        ...state,
        playlists: updatedPlaylistsWithVideo,
      };
    }

    case REMOVE_FROM_PLAYLIST: {
      const updatedPlaylistsWithoutVideo = state.playlists.map((playlist) =>
        playlist.id === action.payload.playlistId
          ? {
              ...playlist,
              videos: playlist.videos.filter(
                (videoId) => videoId !== action.payload.videoId
              ),
            }
          : playlist
      );
      localStorage.setItem(
        "playlists",
        JSON.stringify(updatedPlaylistsWithoutVideo)
      );
      return {
        ...state,
        playlists: updatedPlaylistsWithoutVideo,
      };
    }
    case ADD_NOTE_TO_VIDEO: {
      const updatedNotesForVideo = {
        ...state.notes,
        [action.payload.videoId]: [
          ...(state.notes[action.payload.videoId] || []),
          action.payload.note,
        ],
      };
      localStorage.setItem("notes", JSON.stringify(updatedNotesForVideo));
      return {
        ...state,
        notes: updatedNotesForVideo,
      };
    }

    case UPDATE_NOTE: {
      const updatedNotesForVideoWithUpdate = {
        ...state.notes,
        [action.payload.videoId]: state.notes[action.payload.videoId].map(
          (note) =>
            note.id === action.payload.noteId
              ? { ...note, message: action.payload.message }
              : note
        ),
      };
      localStorage.setItem(
        "notes",
        JSON.stringify(updatedNotesForVideoWithUpdate)
      );
      return {
        ...state,
        notes: updatedNotesForVideoWithUpdate,
      };
    }

    case DELETE_NOTE: {
      const updatedNotesForVideoWithoutDelete = {
        ...state.notes,
        [action.payload.videoId]: state.notes[action.payload.videoId].filter(
          (note) => note.id !== action.payload.noteId
        ),
      };
      localStorage.setItem(
        "notes",
        JSON.stringify(updatedNotesForVideoWithoutDelete)
      );
      return {
        ...state,
        notes: updatedNotesForVideoWithoutDelete,
      };
    }
    default:
      return state;
  }
};
