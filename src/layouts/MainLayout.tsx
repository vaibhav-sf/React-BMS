import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";

const sidebarLinks = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/books",
    label: "All Books",
    icon: BookOpen,
  },
  {
    to: "/books/add",
    label: "Add Book",
    icon: Plus,
  },
];

const MainLayout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* Top Navbar */}
      <Navbar
        onMenuClick={() => setIsMobileOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileOpen}
      />

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 p-4 flex flex-col transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>BMS</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
          Navigation
        </p>

        <div className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="flex flex-1">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 p-4 shrink-0">

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Navigation
          </p>

          <div className="space-y-1">

            {sidebarLinks.map((link) => {
              const Icon = link.icon;

              const isActive =
                location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

          </div>

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