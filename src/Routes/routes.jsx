import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import HomePage from "../Pages/HomePage";
import PageNotFound from "../Pages/PageNotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
