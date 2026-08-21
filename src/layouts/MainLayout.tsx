import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const sidebarLinks = [
  { to: "/", label: "📊 Dashboard" },
  { to: "/books", label: "📖 All Books" },
  { to: "/books/add", label: "➕ Add Book" },
];

const MainLayout = () => {

  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">

        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:flex flex-col w-56 bg-slate-200 border-r border-slate-400 p-4 gap-1">

          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 px-3">
            Navigation
          </p>

          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm bg-blue-400 font-medium transition-colors ${location.pathname === link.to
                ? "bg-blue-600 text-white"
                : "text-white hover:text-slate-900 hover:bg-blue-300"
                }`}
            >
              {link.label}
            </Link>
          ))}

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default MainLayout;