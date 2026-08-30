import { Link } from "react-router-dom";
import { Menu, X, Bell, User, BookOpen } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  isMobileMenuOpen?: boolean;
}

const Navbar = ({ onMenuClick, isMobileMenuOpen = false }: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-3">

          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-slate-900 hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>BMS</span>
          </Link>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification */}
          <button
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-slate-200" />

          {/* Admin */}
          <div className="flex items-center gap-2">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">
                Admin
              </p>
              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <User size={18} />
            </div>

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;