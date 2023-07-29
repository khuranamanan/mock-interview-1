import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { RiPlayListAddLine } from "react-icons/ri";
import { PlayBoxIcon } from "../assets/icons";

function SideBar() {
  const navigate = useNavigate();

  function handleNavLinkStyle({ isActive }) {
    return `navlink flex items-center  ${
      isActive ? "font-bold stroke-2" : "stroke-[1.5]"
    }`;
  }

  return (
    <div className="relative bg-white bg-opacity-90 z-50  font-medium flex px-2 py-2 gap-10 items-center sm:px-3 sm:py-4 sm:flex-col lg:items-start sm:h-full lg:w-[16rem]">
      <div
        className="hidden px-3 sm:flex cursor-pointer h-10 lg:h-14 justify-center w-full items-center"
        onClick={() => navigate("/")}
      >
        <PlayBoxIcon />
        <span className="hidden lg:block items-center font-light text-blue-700 text-3xl">
          PlayBox
        </span>
      </div>

      <nav className="text-xl flex gap-4 w-full justify-around items-center sm:justify-normal sm:flex-col lg:items-start sm:pb-10">
        <NavLink className={handleNavLinkStyle} to="/">
          <AiOutlineHome />{" "}
          <span className="hidden lg:block items-center">Home</span>
        </NavLink>

        <NavLink to="/explore" className={handleNavLinkStyle}>
          <AiOutlineCompass />{" "}
          <span className="hidden lg:block items-center">Explore</span>
        </NavLink>

        <NavLink to="/playlists" className={handleNavLinkStyle}>
          <RiPlayListAddLine />{" "}
          <span className="hidden lg:block items-center">Playlists</span>
        </NavLink>

        <NavLink to="/watch-later" className={handleNavLinkStyle}>
          <AiOutlineClockCircle />{" "}
          <span className="hidden lg:block items-center">Watch Later</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBar;
