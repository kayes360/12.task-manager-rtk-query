import { Link } from "react-router-dom";
import Logo from "/logo.gif";
import { IoIosSearch } from "react-icons/io";
export default function Navbar({ handleSearch }) {
  return (
    <nav className="container relative py-3  ">
      <div className="flex items-center justify-between ">
        <Link to="/">
          <img src={Logo} className="h-24" />
        </Link>
        <div className="flex-1 max-w-xs   group">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
