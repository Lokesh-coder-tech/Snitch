import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from 'react-router';

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
            await handleLogin({
                email: formData.email,
                password: formData.password
            });
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center relative overflow-hidden p-4">
            
            {/* --- Background Decorative Elements --- */}
            <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Floating 3D Geometric Accents */}
            <div className="absolute right-10 bottom-20 opacity-30 animate-pulse hidden lg:block">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                    <path d="M50 5L90 30V70L50 95L10 70V30L50 5Z" fill="url(#gold_grad_login)" />
                    <defs>
                        <linearGradient id="gold_grad_login" x1="10" y1="5" x2="90" y2="95">
                            <stop stopColor="#FFD700" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#B8860B" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* --- Main Container --- */}
            <div className="container mx-auto max-w-6xl z-10 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
                
                {/* LEFT SIDE: Editorial Card (Flipped for Login) */}
                <div className="relative group w-full lg:w-5/12 max-w-md">
                    {/* Golden Ring behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-yellow-500/10 rounded-full blur-sm group-hover:border-yellow-500/20 transition-all duration-700"></div>
                    
                    <div className="relative h-150 bg-neutral-950 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                            alt="Fashion Model Editorial" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-20 group-hover:scale-105 transition-transform duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                        
                        <div className="relative h-full flex flex-col justify-end p-12">
                            <span className="text-yellow-400 font-black text-2xl tracking-widest uppercase mb-6">Snitch.</span>
                            <h2 className="text-6xl font-black leading-[0.9] tracking-tighter mb-6 uppercase italic">
                                WELCOME <br /> 
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-white">BACK.</span>
                            </h2>
                            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                                Access your vault, track your orders, and explore exclusive member-only drops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="w-full lg:w-7/12">
                    <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 p-10 lg:p-16 rounded-[40px] shadow-2xl">
                        
                        <header className="mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Enter the Vault</h1>
                            <p className="text-neutral-500">Secure access to your fashion profile.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Email */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-400/40 transition-all placeholder:text-neutral-700"
                                    placeholder="name@exclusive.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Password</label>
                                    <a href="#" className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-yellow-500 transition-colors">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-400/40 transition-all placeholder:text-neutral-700"
                                        placeholder="••••••••••••"
                                    />
                                    <div className="absolute right-4 bottom-4 text-yellow-500/30">
                                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 relative">
                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(234,179,8,0.2)] group"
                                >
                                    Sign In
                                </button>
                                {/* Keyhole Detail */}
                                <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 bg-[#0a0a0a] border border-white/5 rounded-full flex items-center justify-center shadow-lg">
                                    <div className="w-1 h-3 bg-yellow-500 rounded-full blur-[1px]"></div>
                                </div>
                            </div>

                            <footer className="mt-12 text-center">
                                <p className="text-sm text-neutral-500">
                                    Don't have an account? 
                                    <Link to="/register" className="ml-2 text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-white/5 hover:border-yellow-400 pb-1">
                                        Sign Up
                                    </Link>
                                </p>
                            </footer>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;