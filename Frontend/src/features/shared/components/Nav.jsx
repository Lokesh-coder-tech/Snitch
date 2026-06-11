import React, { useState, useEffect } from "react";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router"; 
import { useAuth } from "../../auth/hook/useAuth";

const Nav = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDesktopSearch, setOpenDesktopSearch] = useState(false);

  const products = useSelector((state) => state.product.products || []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [openMobileMenu]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearch("");
    setSuggestions([]);
    setOpenMobileMenu(false);
    setOpenDesktopSearch(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredProducts.slice(0, 5));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      navigate(`/product/${suggestions[0]._id}`);
      setOpenDesktopSearch(false);
      setOpenMobileMenu(false);
    }
  };

  const navLinkClass =
    "relative py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1b1c1a] transition-colors duration-300 hover:text-[#C9A96E] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100/80 shadow-sm"
            : "bg-white border-b border-[#e4e2df]/40"
        }`}
      >
        <nav className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left Side: Mobile Menu Toggle & Desktop Search Trigger */}
          <div className="flex items-center gap-4 md:w-1/4">
            <button
              className="md:hidden p-2 -ml-2 text-[#1b1c1a]"
              onClick={() => setOpenMobileMenu(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            
            {/* Desktop Dynamic Search Trigger */}
            <button 
              onClick={() => setOpenDesktopSearch(!openDesktopSearch)}
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#1b1c1a] transition-colors duration-300 text-xs tracking-widest uppercase font-medium"
            >
              <Search size={16} strokeWidth={1.5} className="text-[#1b1c1a]" />
              <span>Search</span>
            </button>
          </div>

          {/* Center: Elegant Brand Logo */}
          <div className="flex justify-center md:w-2/4 text-center">
            <Link
              to="/"
              className="group"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="text-xl sm:text-2xl font-medium tracking-[0.3em] uppercase text-[#1b1c1a] group-hover:opacity-70 transition-opacity duration-500">
                Velora<span className="text-[#C9A96E]">.</span>
              </span>
            </Link>
          </div>

          {/* Right Side: Navigation Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 md:w-1/4">
            {user && (
              <span className="hidden lg:inline-block text-[10px] text-[#7A6E63] font-medium tracking-[0.2em] uppercase truncate max-w-37.5">
                Hi, {user.fullname.split(" ")[0]}
              </span>
            )}

            {user?.role === "seller" && (
              <Link to="/seller/dashboard" className={`${navLinkClass} hidden md:inline-block text-[10px]`}>
                Dashboard
              </Link>
            )}

            {/* Desktop Auth Links */}
            {!user && (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className={navLinkClass}>Sign In</Link>
              </div>
            )}

            {/* Cart Icon (Always visible) */}
            <Link
              to="/cart"
              className="group relative p-2 text-[#1b1c1a] hover:text-[#C9A96E] transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} strokeWidth={1.2} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              {cartItems?.length > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center rounded-full bg-[#1b1c1a] text-white text-[9px] font-bold shadow-sm"
                  style={{ width: "14px", height: "14px", fontFamily: "'Inter', sans-serif" }}
                >
                  {cartItems.length > 9 ? "9+" : cartItems.length}
                </span>
              )}
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 hover:text-[#C9A96E] transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Desktop Expandable Overlay Search Panel */}
        {openDesktopSearch && (
          <div className="hidden md:block absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-fadeIn duration-200 z-50">
            <div className="max-w-3xl mx-auto px-6 py-8 relative">
              <div className="flex items-center border-b border-gray-200 pb-2">
                <Search size={18} className="text-gray-400 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="START TYPING TO SEARCH..."
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                 className=" w-full bg-transparent text-sm tracking-widest outline-none text-[#1b1c1a] normal-case"
                />
                <button onClick={() => { setOpenDesktopSearch(false); setSearch(""); setSuggestions([]); }}>
                  <X size={18} className="text-gray-400 hover:text-black transition-colors" />
                </button>
              </div>

              {/* Desktop Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-4 divide-y divide-gray-50 max-h-80 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-50/80 px-2 transition-colors rounded"
                    >
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.title}
                        className="w-12 h-16 object-cover bg-gray-50"
                      />
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-gray-800">{product.title}</p>
                        <p className="text-xs text-gray-500 mt-1">₹{product.price?.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Slide-Over Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          openMobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop background Blur */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpenMobileMenu(false)} />

        {/* Drawer Panel Container */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-500 ease-out ${
            openMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <span className="text-lg font-medium tracking-[0.2em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                MENU
              </span>
              <button onClick={() => setOpenMobileMenu(false)} className="p-1 text-gray-500">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Search input inside drawer */}
            <div className="relative flex items-center border border-gray-200 rounded-none px-3 py-2.5 bg-gray-50/50 mb-6">
              <Search size={16} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-xs tracking-wider normal-case outline-none text-[#1b1c1a]"
              />
            </div>

            {/* Mobile Live Suggestions list inside drawer */}
            {suggestions.length > 0 && (
              <div className="border border-gray-100 rounded bg-white shadow-sm max-h-48 overflow-y-auto mb-6 p-1 divide-y divide-gray-50">
                {suggestions.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="flex items-center gap-3 p-2 cursor-pointer active:bg-gray-50"
                  >
                    <img src={product.images?.[0]?.url} alt={product.title} className="w-8 h-10 object-cover" />
                    <span className="text-[11px] uppercase tracking-wider text-gray-700 truncate">{product.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Drawer Links */}
            <div className="flex flex-col gap-5 mt-4">
              {user && (
                <div className="text-[11px] tracking-widest text-[#7A6E63] font-medium uppercase border-b border-gray-50 pb-2">
                  Welcome, {user.fullname}
                </div>
              )}
              <Link to="/" onClick={() => setOpenMobileMenu(false)} className="text-xs font-semibold uppercase tracking-widest py-1">
                Home
              </Link>
              {user?.role === "seller" && (
                <Link to="/seller/dashboard" onClick={() => setOpenMobileMenu(false)} className="text-xs font-semibold uppercase tracking-widest py-1 text-[#C9A96E]">
                  Seller Dashboard
                </Link>
              )}
              {!user && (
                <>
                  <Link to="/login" onClick={() => setOpenMobileMenu(false)} className="text-xs font-semibold uppercase tracking-widest py-1">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setOpenMobileMenu(false)} className="text-xs font-semibold uppercase tracking-widest py-1">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          {user && (
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => { handleLogout(); setOpenMobileMenu(false); }}
                className="w-full text-center bg-[#1b1c1a] text-white text-xs font-semibold uppercase tracking-widest py-3 hover:bg-[#C9A96E] transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;