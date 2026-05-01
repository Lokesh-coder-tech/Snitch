import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../auth/hook/useAuth'; // Note: Ensure it's 'react-router-dom' in v6+

const Nav = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth?.user);
    const cartItems = useSelector(state => state.cart?.items);
    const [scrolled, setScrolled] = useState(false);

    // Add a subtle border shadow when scrolling down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reusable class for elegant hover links
    const navLinkClass = "relative py-1 transition-colors duration-300 hover:text-[#C9A96E] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";

    return (
        <header 
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${
                scrolled ? 'bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent border-b border-[#e4e2df]/60'
            }`}
        >
            <nav className="max-w-400 mx-auto px-8 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
                
                {/* Brand Logo */}
                <Link 
                    to="/"
                    className="group flex items-center"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    <span className="text-2xl font-medium tracking-[0.35em] uppercase text-[#1b1c1a] group-hover:opacity-80 transition-opacity duration-500">
                        Snitch<span className="text-[#C9A96E]">.</span>
                    </span>
                </Link>

                {/* Navigation Links & Actions */}
                <div className="flex gap-8 items-center text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1b1c1a]">
                    {user ? (
                        <>
                            <span className="text-[#7A6E63] font-medium tracking-[0.2em]">
                                Welcome, {user.fullname}
                            </span>
                            {user.role === 'seller' && (
                                <Link to="/seller/dashboard" className={navLinkClass}>
                                    Seller Dashboard
                                </Link>
                            )}
                            
                            {/* Cart Icon */}
                            <Link
                                to="/cart"
                                className="group relative flex items-center ml-2 p-2 hover:text-[#C9A96E] transition-colors duration-300"
                                aria-label="Shopping cart"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="1.2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                                >
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                
                                {/* Refined Cart Badge */}
                                {cartItems?.length > 0 && (
                                    <span
                                        className="absolute top-0 right-0 flex items-center justify-center rounded-full bg-[#1b1c1a] text-white shadow-md transform scale-100 transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            fontSize: '9px',
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {cartItems.length > 9 ? '9+' : cartItems.length}
                                    </span>
                                )}
                            </Link>
                            <a href="#" onClick={handleLogout} className="text-xs font-medium uppercase tracking-widest text-gray-900 hover:text-[#C9A96E] transition-colors duration-300" >
                                Logout
                            </a>
                        </>
                    ) : (
                        <div className="flex items-center gap-6">
                            <Link to="/login" className={navLinkClass}>Sign In</Link>
                            <Link to="/register" className="border border-[#1b1c1a] px-5 py-2.5 hover:bg-[#1b1c1a] hover:text-white transition-all duration-300">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Nav;