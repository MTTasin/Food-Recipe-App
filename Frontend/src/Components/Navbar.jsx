import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { RecipeContext } from "../Context/Context";
import { useParams } from "react-router-dom";

export default function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [dropdown, setDropdown] = useState(false);
  const { searchParams, setSearchParams } = useContext(RecipeContext);
  const params = useParams();
  
  

  const navList = (
    <ul className="menu sm:menu-vertical md:menu-vertical lg:menu-horizontal p-0">
      <li>
        <Link
          to="/"
          onClick={() => setActiveLink("home")}
          className={
            activeLink === "home"
              ? "bg-blue-500 focus:bg-blue-600 text-white focus:text-white"
              : ""
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="../Favourites/Favourites.jsx"
          onClick={() => setActiveLink("favourites")}
          className={
            activeLink === "favourites"
              ? "bg-blue-500 focus:bg-blue-600 text-white focus:text-white"
              : ""
          }
        >
          Favourites
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <div className="navbar sticky top-0 z-50 w-full text-black bg-slate-200 rounded-xl">
        <div className="navbar-start">
          <Link
            to="/"
            onClick={() => setActiveLink("home")}
            className="flex items-center normal-case text-lg"
          >
            <img src="/recipe.png" alt="" className="h-10 sm:h-10" />
            
          </Link>
        </div>
        <div className="navbar-center">
         {params.id ? null : ( <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              type="text"
              placeholder="Search"
              className="input input-bordered rounded-full text-center bg-slate-200"
            />
          </form>)}
        </div>

        <div className="navbar-end hidden lg:flex">{navList}</div>
        <div className="navbar-end lg:hidden">
          <button className="dropdown" onClick={() => setDropdown(!dropdown)}>
            <RxDropdownMenu className="text-2xl mx-2" />
          </button>
        </div>
      </div>
      <div className="dropdown-content z-50 bg-slate-200 rounded-xl absolute right-0 top-18 lg:hidden">
        <div className="w-56">{dropdown && navList}</div>
      </div>
    </>
  );
}
