import { Outlet, useLocation } from "react-router";
// import NavigationBar from "../Components/NavigationBar";
import SideBar from "../Components/SideBar";
import { useEffect } from "react";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative max-w-7xl mx-auto h-full grid sm:grid-cols-[auto_minmax(200px,_1fr)]">
      <div className="fixed bottom-0 left-0 right-0 border-solid border-t border-darkGray sm:sticky sm:top-0 sm:bottom-0 sm:h-screen sm:overflow-y-scroll sm:border-r sm:border-t-0 no-scrollbar">
        <SideBar />
      </div>

      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
