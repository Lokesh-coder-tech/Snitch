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
        try {
            await handleRegister({
                email: formData.email,
                contact: formData.contactNumber,
                password: formData.password,
                isSeller: formData.isSeller,
                fullname: formData.fullName
            });
            navigate("/");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] font-sans flex items-center justify-center overflow-hidden">
            <div className="flex w-full h-screen">
                
                {/* LEFT SIDE: Editorial Image (Flipped from Login for variety) */}
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#f4f4f4]">
                    <img 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                        alt="Fashion Editorial Register" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    
                    <div className="absolute bottom-12 left-12 right-12 border border-white/30 backdrop-blur-md p-8 text-white">
                        <p className="text-[10px] tracking-[0.4em] uppercase mb-2 text-white/80">Membership</p>
                        <h3 className="text-2xl font-serif">"Fashion is the armor to survive the reality of everyday life."</h3>
                    </div>
                </div>

                {/* RIGHT SIDE: Clean Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-24 bg-white overflow-y-auto py-12">
                    <div className="max-w-md w-full mx-auto">
                        <header className="mb-10">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-px w-12 bg-black"></div>
                                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">
                                    Join the Circle
                                </span>
                            </div>
                            <h1 className="text-5xl font-serif text-[#1a1a1a] mb-4">
                                Create Account
                            </h1>
                            <p className="text-neutral-500 font-light text-sm">
                                Become a part of the elite fashion standard.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Full Name"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-400 text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-[11px]">
                                    Full Name
                                </label>
                            </div>

                            {/* Contact Number */}
                            <div className="relative group">
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Contact Number"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-400 text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-[11px]">
                                    Contact Number
                                </label>
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Email Address"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-400 text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-[11px]">
                                    Email Address
                                </label>
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full bg-transparent border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors placeholder-transparent"
                                    placeholder="Password"
                                />
                                <label className="absolute left-0 -top-3.5 text-neutral-400 text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-[11px]">
                                    Password
                                </label>
                            </div>

                            {/* Seller Checkbox */}
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    name="isSeller"
                                    id="isSeller"
                                    checked={formData.isSeller}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-black cursor-pointer"
                                />
                                <label htmlFor="isSeller" className="text-xs text-neutral-500 uppercase tracking-widest cursor-pointer select-none">
                                    Register as Seller
                                </label>
                            </div>

                            <div className="pt-6 flex flex-col gap-6">
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-neutral-800 transition-all active:scale-[0.99]"
                                >
                                    Create My Account
                                </button>
                                
                                <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400">
                                    Already a member? 
                                    <Link to="/login" className="ml-2 font-bold text-black border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                                        SIGN IN
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;