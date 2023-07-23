import { Outlet } from "react-router";
import NavigationBar from "../Components/NavigationBar";

function RootLayout() {
  return (
    <div className="min-h-screen">
      <NavigationBar />

      <div className="container mx-auto p-2 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
