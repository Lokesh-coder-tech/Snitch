import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from 'react-router';

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
        <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] via-[#f2f0ea] to-[#e8e4d9] text-neutral-900 font-sans selection:bg-pink-100 selection:text-pink-900 flex items-center justify-center relative overflow-hidden p-4">
            
            {/* Soft Warm Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-orange-200/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-100 h-100 bg-pink-200/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* --- Main Container --- */}
            <div className="container mx-auto max-w-5xl z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                
                {/* LEFT SIDE: Editorial Card */}
                <div className="relative group w-full lg:w-5/12 max-w-sm">
                    <div className="relative h-[560px] bg-white rounded-[32px] overflow-hidden border border-white/50 shadow-xl shadow-neutral-200/50">
                        <img 
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop" 
                            alt="Fashion Model" 
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent"></div>
                        
                        <div className="relative h-full flex flex-col justify-end p-8">
                            <span className="text-neutral-800 font-bold text-[10px] tracking-[0.3em] uppercase mb-2">#Fashion Editorial</span>
                            <span className="text-neutral-900 font-black text-xl tracking-widest uppercase mb-4">Snitch.</span>
                            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter mb-4 uppercase italic text-neutral-900">
                                THE <br /> NEW <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">STANDARD.</span>
                            </h2>
                            <p className="text-neutral-600 text-[13px] leading-relaxed max-w-xs font-medium">
                                Access curated collections and exclusive drops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Register Form */}
                <div className="w-full lg:w-7/12 max-w-xl">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-8 lg:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                        
                        <header className="mb-6">
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-1 text-neutral-900">Create Account</h1>
                            <p className="text-neutral-500 text-sm font-medium">Join the elite fashion circle today.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-[#AA004F]/30 transition-all placeholder:text-neutral-300"
                                        placeholder="Johnathan Doe"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-[#AA004F]/30 transition-all placeholder:text-neutral-300"
                                        placeholder="+1 234 567"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-[#AA004F]/30 transition-all placeholder:text-neutral-300"
                                    placeholder="name@exclusive.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5 relative">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-1">Secure Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-[#AA004F]/30 transition-all placeholder:text-neutral-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Seller Option */}
                            <div className="flex items-center gap-3 pt-1">
                                <input
                                    type="checkbox"
                                    name="isSeller"
                                    id="isSeller"
                                    checked={formData.isSeller}
                                    onChange={handleChange}
                                    className="peer appearance-none w-4 h-4 border border-neutral-300 rounded bg-white checked:bg-[#AA004F] checked:border-[#AA004F] transition-all cursor-pointer"
                                />
                                <label htmlFor="isSeller" className="text-[11px] text-neutral-500 hover:text-[#AA004F] transition-colors cursor-pointer select-none font-medium">
                                    Register as Seller
                                </label>
                            </div>

                            {/* Submit Button - Updated to #AA004F */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: '#AA004F' }}
                                    className="w-full hover:brightness-110 text-white font-bold uppercase tracking-[0.15em] py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-pink-900/20 text-sm"
                                >
                                    Create My Account
                                </button>
                            </div>

                            <footer className="pt-2 text-center">
                                <p className="text-xs text-neutral-400 font-medium">
                                    Already a member? 
                                    <Link to="/login" className="ml-1.5 text-neutral-900 font-bold hover:text-[#AA004F] transition-colors border-b border-neutral-200 hover:border-[#AA004F] pb-0.5">
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