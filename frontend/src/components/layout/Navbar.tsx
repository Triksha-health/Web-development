import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../public/logo (3).png";
import { HashLink } from "react-router-hash-link";

interface NavbarProps {
  scrolled: boolean;
}

function Navbar({ scrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close menu/dropdown on route change
  useEffect(() => {
    closeMenu();
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "header-scroll" : "header-transparent"}`}>
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img src={logo} alt="Triksha Logo" className="w-20 h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <HashLink to="/#about" className="text-gray-700 hover:text-primary-500 font-medium">About</HashLink>
            <HashLink to="/#usecases" className="text-gray-700 hover:text-primary-500 font-medium">Use Cases</HashLink>
            <HashLink to="/#whytriksha" className="text-gray-700 hover:text-primary-500 font-medium">Why Triksha</HashLink>
            <Link to="/teams" className="text-gray-700 hover:text-primary-500 font-medium">Team</Link>
            <HashLink to="/#faq" className="text-gray-700 hover:text-primary-500 font-medium">FAQ</HashLink>
          </nav>

          {/* Desktop CTA / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center text-gray-700 hover:text-primary-500 font-medium"
                >
                  {user?.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
                    <Link
                      to="/userdashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-primary-500 font-medium">Sign in</Link>
                <Link to="/pre-order" className="btn-primary">Pre-order Now</Link>
              
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              <HashLink smooth to="/#about" onClick={closeMenu} className="text-gray-700 hover:text-primary-500 font-medium">About</HashLink>
              <HashLink smooth to="/#usecases" onClick={closeMenu} className="text-gray-700 hover:text-primary-500 font-medium">Use Cases</HashLink>
              <HashLink smooth to="/#whytriksha" onClick={closeMenu} className="text-gray-700 hover:text-primary-500 font-medium">Why Triksha</HashLink>
              <Link to="/teams" onClick={closeMenu} className="text-gray-700 hover:text-primary-500 font-medium">Team</Link>
              <HashLink smooth to="/#faq" onClick={closeMenu} className="text-gray-700 hover:text-primary-500 font-medium">FAQ</HashLink>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/userdashboard" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-primary-500 font-medium">Dashboard</Link>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="block py-2 text-gray-700 hover:text-primary-500 font-medium">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-primary-500 font-medium">Sign in</Link>
                    <Link to="/pre-order" onClick={closeMenu} className="btn-primary mt-4 w-full flex justify-center">Pre-order Now</Link>
                   
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
