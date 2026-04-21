import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from 'react-router'; // Ensure correct import for your setup

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
        <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] via-[#f2f0ea] to-[#e8e4d9] text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex items-center justify-center relative overflow-hidden p-4">
            
            {/* Soft Warm Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-orange-200/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-yellow-200/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* --- Main Container --- */}
            <div className="container mx-auto max-w-5xl z-10 flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-12">
                
                {/* RIGHT SIDE (Editorial Card) */}
                <div className="relative group w-full lg:w-5/12 max-w-sm">
                    <div className="relative h-[540px] bg-white rounded-[32px] overflow-hidden border border-white/50 shadow-xl shadow-neutral-200/50">
                        <img 
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                            alt="Fashion Model Editorial" 
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent"></div>
                        
                        <div className="relative h-full flex flex-col justify-end p-8">
                            <span className="text-neutral-900 font-black text-xl tracking-widest uppercase mb-4">Snitch.</span>
                            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter mb-4 uppercase italic text-neutral-900">
                                WELCOME <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">BACK.</span>
                            </h2>
                            <p className="text-neutral-600 text-[13px] leading-relaxed max-w-xs font-medium">
                                Access your vault, track your orders, and explore exclusive member-only drops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LEFT SIDE (Login Form) */}
                <div className="w-full lg:w-7/12 max-w-xl">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-8 lg:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                        
                        <header className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-1 text-neutral-900">Enter the Vault</h1>
                            <p className="text-neutral-500 text-sm font-medium">Secure access to your fashion profile.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all placeholder:text-neutral-300 shadow-sm"
                                    placeholder="name@exclusive.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400">Password</label>
                                    <Link to="#" className="text-[9px] uppercase tracking-widest font-bold text-[#AA004F] hover:text-[#88003f] transition-colors">Forgot Password?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all placeholder:text-neutral-300 shadow-sm"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button - Updated to #AA004F */}
                            <div className="pt-4 relative">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: '#AA004F' }}
                                    className="w-full hover:brightness-110 text-white font-bold uppercase tracking-[0.15em] py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-pink-900/20 text-sm"
                                >
                                    Sign In
                                </button>
                                
                                {/* Keyhole Detail Overlay - Color matched to Magenta */}
                                <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 bg-white border border-neutral-100 rounded-full flex items-center justify-center shadow-md">
                                    <div className="w-1 h-3 bg-[#AA004F] rounded-full"></div>
                                </div>
                            </div>

                            <footer className="pt-6 text-center">
                                <p className="text-xs text-neutral-400 font-medium">
                                    Don't have an account? 
                                    <Link to="/register" className="ml-1.5 text-neutral-900 font-bold hover:text-[#AA004F] transition-colors border-b border-neutral-200 hover:border-[#AA004F] pb-0.5">
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