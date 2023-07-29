import { RouterProvider } from "react-router";
import { router } from "./Routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="h-dvh-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
