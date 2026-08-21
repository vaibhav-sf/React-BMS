import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/books", label: "Books" },
  { to: "/books/add", label: "Add Book" },
];

const Navbar = () => {

  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-slate-200 border-b border-slate-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Brand */}
          <Link
            to="/"
            className="text-lg font-bold text-slate-900 tracking-wide"
          >
            📚 BMS
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-sm text-white font-medium bg-blue-400 transition-colors ${location.pathname === link.to
                  ? "bg-blue-600 text-white"
                  : "text-slate-900 hover:text-slate-900 hover:bg-blue-300"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="md:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to
                ? "bg-blue-600 text-white"
                : "text-slate-900 hover:text-slate-900 hover:bg-blue-200"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;