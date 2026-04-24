import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from 'react-router'; // Using react-router-dom

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await handleLogin({ email: formData.email, password: formData.password });
            if (user.role === "buyer") {
                navigate("/");
            } else if (user.role === "seller") {
                navigate("/seller/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-white text-[#2D3436] font-sans flex items-center justify-center overflow-hidden">
            <div className="flex w-full h-screen">
                
                {/* LEFT SIDE: Clean, Editorial Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32 bg-white">
                    <div className="max-w-md w-full mx-auto">
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-px w-12 bg-black"></div>
                                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">
                                    Our Community
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mb-6">
                                Welcome Back
                            </h1>
                            <p className="text-neutral-500 font-light leading-relaxed">
                                Sign in to access your curated collections and latest arrivals.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs">
                                    Email Address
                                </label>
                            </div>

                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Password"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs">
                                    Password
                                </label>
                                <div className="mt-2 text-right">
                                    <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-6">
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-neutral-800 transition-all active:scale-[0.99]"
                                >
                                    Sign In
                                </button>
                                
                                <p className="text-center text-xs text-neutral-500">
                                    New to the collection? 
                                    <Link to="/register" className="ml-2 font-bold text-black border-b border-black pb-0.5 hover:text-neutral-600 hover:border-neutral-600 transition-colors">
                                        JOIN NOW
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE: Visual/Editorial Image */}
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#f4f4f4]">
                    <img 
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" 
                        alt="Fashion Minimal" 
                        className="absolute inset-0 w-full object-cover"
                    />
                    {/* Overlay to mimic the "Latest Arrivals" split-screen feel */}
                    <div className="absolute inset-0 bg-black/5"></div>
                    
                    <div className="absolute bottom-12 left-12 right-12 border border-white/30 backdrop-blur-md p-8 text-white">
                        <p className="text-[10px] tracking-[0.4em] uppercase mb-2">Editor's Pick</p>
                        <h3 className="text-2xl font-serif">"Style is a way to say who you are without having to speak."</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;