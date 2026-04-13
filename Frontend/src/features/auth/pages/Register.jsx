import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from 'react-router'; // Fixed import to 'react-router-dom'

const Register = () => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            isSeller: formData.isSeller,
            fullname: formData.fullName
        });
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-400 selection:text-black flex items-center justify-center relative overflow-hidden p-4">
            
            {/* --- Background Decorative Elements --- */}
            {/* Golden Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Floating 3D Geometric Accents (Using SVG for precision) */}
            <div className="absolute right-10 top-20 opacity-40 animate-pulse hidden lg:block">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <path d="M50 5L90 30V70L50 95L10 70V30L50 5Z" fill="url(#gold_grad)" />
                    <defs>
                        <linearGradient id="gold_grad" x1="10" y1="5" x2="90" y2="95">
                            <stop stopColor="#FFD700" stopOpacity="0.6" />
                            <stop offset="1" stopColor="#B8860B" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="absolute left-20 bottom-20 opacity-30 rotate-45 hidden lg:block">
                <div className="w-12 h-12 border border-yellow-500/30 blur-[1px]"></div>
            </div>

            {/* --- Main Container --- */}
            <div className="container mx-auto max-w-6xl z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                
                {/* LEFT SIDE: Editorial Card with Glowing Ring */}
                <div className="relative group w-full lg:w-5/12 max-w-md">
                    {/* The Golden Ring behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-yellow-500/10 rounded-full blur-sm group-hover:border-yellow-500/20 transition-all duration-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border-2 border-yellow-500/20 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
                    
                    <div className="relative h-162.5 bg-neutral-950 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop" 
                            alt="Fashion Model" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-40 group-hover:scale-105 transition-transform duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
                        
                        <div className="relative h-full flex flex-col justify-end p-12">
                            <span className="text-yellow-500 font-bold text-sm tracking-[0.3em] uppercase mb-4">#Fashion Editorial</span>
                            <span className="text-yellow-400 font-black text-2xl tracking-widest uppercase mb-8">Snitch.</span>
                            <h2 className="text-6xl font-black leading-[0.9] tracking-tighter mb-6 uppercase italic">
                                THE <br /> NEW <br /> 
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-400 to-neutral-100">STANDARD.</span>
                            </h2>
                            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                                Access curated collections and exclusive drops. Join the elite fashion circle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Obsidian Form Card */}
                <div className="w-full lg:w-7/12">
                    <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 p-10 lg:p-16 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        
                        <header className="mb-12">
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Create Account</h1>
                            <p className="text-neutral-500">Fill in the details to start your journey.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name */}
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-400/40 transition-all placeholder:text-neutral-700"
                                        placeholder="Johnathan Doe"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-400/40 transition-all placeholder:text-neutral-700"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                            </div>

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
                            <div className="space-y-3 relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Secure Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-400/40 transition-all placeholder:text-neutral-700"
                                    placeholder="••••••••••••"
                                />
                                <div className="absolute right-4 bottom-4 text-yellow-500/50">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5" /></svg>
                                </div>
                            </div>

                            {/* Seller Option */}
                            <div className="flex items-center gap-4 group cursor-pointer pt-2">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isSeller"
                                        id="isSeller"
                                        checked={formData.isSeller}
                                        onChange={handleChange}
                                        className="peer appearance-none w-5 h-5 border border-white/20 rounded-lg bg-transparent checked:bg-yellow-500 checked:border-yellow-500 transition-all cursor-pointer"
                                    />
                                    <svg className="absolute left-1 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <label htmlFor="isSeller" className="text-xs text-neutral-500 group-hover:text-white transition-colors cursor-pointer select-none">
                                    I want to list my own brand (Register as Seller)
                                </label>
                            </div>

                            {/* Submit Button with Keyhole Detail */}
                            <div className="pt-6 relative">
                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(234,179,8,0.2)] group"
                                >
                                    Create My Account
                                </button>
                                {/* Keyhole Icon Overlay for that "Elite/Locked" feel */}
                                <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 bg-[#0a0a0a] border border-white/5 rounded-full flex items-center justify-center shadow-lg">
                                    <div className="w-1 h-3 bg-yellow-500 rounded-full blur-[1px]"></div>
                                </div>
                            </div>

                            <footer className="mt-12 text-center">
                                <p className="text-sm text-neutral-500">
                                    Already a member? 
                                    <Link to="/login" className="ml-2 text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-white/5 hover:border-yellow-400 pb-1">
                                        Sign In
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

export default Register;