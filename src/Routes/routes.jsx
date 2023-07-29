import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import PageNotFound from "../Pages/PageNotFound";
import CategoryPage from "../Pages/CategoryPage";
import WatchLaterPage from "../Pages/WatchLaterPage";
import ExplorePage from "../Pages/ExplorePage";
import VideoPage from "../Pages/VideoPage";
import PlaylistsPage from "../Pages/PlaylistsPage";
import SinglePlaylistPage from "../Pages/SinglePlaylistPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="category/:categoryName" element={<CategoryPage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="watch-later" element={<WatchLaterPage />} />
      <Route path="video/:vidId" element={<VideoPage />} />
      <Route path="playlists" element={<PlaylistsPage />} />
      <Route path="playlists/:playlistId" element={<SinglePlaylistPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
