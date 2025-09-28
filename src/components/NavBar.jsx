import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 px-6 py-4 shadow-md">
      {/* Brand */}
      <div className="text-xl sm:text-2xl font-bold text-yellow-400 truncate">
        <Link to="/">Paws & Preferences</Link>
      </div>

      {/* Links */}
      <div className="flex gap-6 sm:gap-6">
        <Link
          to="/"
          className="text-white transition-colors duration-200 hover:text-yellow-400"
        >
          Home
        </Link>
        <Link
          to="/favourites"
          className="text-white transition-colors duration-200 hover:text-yellow-400"
        >
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
