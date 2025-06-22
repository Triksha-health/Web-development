import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../public/logo (3).png";

interface NavbarProps {
  scrolled: boolean;
}

function Navbar({ scrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scroll" : "header-transparent"
      }`}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="w-20 h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-primary-500 font-medium">
              About
            </Link>
            <a href="/#usecases" className="text-gray-700 hover:text-primary-500 font-medium">
              Use Cases
            </a>
            <a href="/#whytriksha" className="text-gray-700 hover:text-primary-500 font-medium">
              Why Triksha
            </a>
            <Link to="/teams" className="text-gray-700 hover:text-primary-500 font-medium">
              Team
            </Link>
            <a href="/#faq" className="text-gray-700 hover:text-primary-500 font-medium">
              FAQ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary-500 font-medium">
                  {user?.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 invisible group-hover:visible">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-primary-500 font-medium">
                  Sign in
                </Link>
                <Link to="/pre-order" className="btn-primary">
                  Pre-order Now
                </Link>
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
              <Link to="/" className="text-gray-700 hover:text-primary-500 font-medium">
                Home
              </Link>
              <a href="/#about" className="text-gray-700 hover:text-primary-500 font-medium">
                About
              </a>
              <a href="/#features" className="text-gray-700 hover:text-primary-500 font-medium">
                Features
              </a>
              <Link to="/teams" className="text-gray-700 hover:text-primary-500 font-medium">
                Team
              </Link>
              <a href="/#faq" className="text-gray-700 hover:text-primary-500 font-medium">
                FAQ
              </a>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-primary-500 font-medium">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 text-gray-700 hover:text-primary-500 font-medium"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="block py-2 text-gray-700 hover:text-primary-500 font-medium">
                      Sign in
                    </Link>
                    <Link to="/pre-order" className="btn-primary mt-4 w-full flex justify-center">
                      Pre-order Now
                    </Link>
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
