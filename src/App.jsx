import { RouterProvider } from "react-router";
import { router } from "./Routes/routes";

function App() {
  return (
    <div className="h-dvh-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
