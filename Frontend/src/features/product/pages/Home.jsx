import React, { useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
    const products = useSelector(state => state.product.products);
    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    // Filter products for different sections (simulated)
    const latestCollections = products?.slice(0, 10) || [];
    const bestSellers = products?.slice(0, 5) || [];

    return (
        <div className="bg-white font-sans text-gray-900">
            {/* ── HERO SECTION ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="border border-gray-300 flex flex-col md:flex-row items-center">
                    {/* Left Text Side */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-20 px-10 text-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-0.5 bg-gray-700"></div>
                            <span className="text-sm font-medium tracking-widest text-gray-600 uppercase">Our Bestsellers</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif text-gray-800 mb-6">Latest Arrivals</h1>
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <span className="text-sm font-semibold uppercase tracking-wider">Shop Now</span>
                            <div className="w-10 h-px bg-gray-800 group-hover:w-14 transition-all"></div>
                        </div>
                    </div>
                    {/* Right Image Side */}
                    <div className="w-full md:w-1/2 bg-[#f9d5d3]">
                        <img 
                            src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Hero Model" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* ── LATEST COLLECTIONS ── */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <h2 className="text-3xl font-medium text-gray-500">LATEST <span className="text-gray-800">COLLECTIONS</span></h2>
                    <div className="w-12 h-0.5 bg-gray-700"></div>
                </div>
                <p className="text-gray-500 text-sm mb-12 max-w-2xl mx-auto">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {latestCollections.map((product) => (
                        <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer group">
                            <div className="overflow-hidden mb-3">
                                <img 
                                    src={product.images?.[0]?.url || '/fallback.png'} 
                                    alt={product.title} 
                                    className="w-full aspect-4/5 object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-700 mb-1">{product.title}</p>
                                <p className="text-sm font-semibold">${product.price?.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── BEST SELLERS ── */}
            <section className="max-w-7xl mx-auto px-4 py-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <h2 className="text-3xl font-medium text-gray-500">BEST <span className="text-gray-800">SELLERS</span></h2>
                    <div className="w-12 h-0.5 bg-gray-700"></div>
                </div>
                <p className="text-gray-500 text-sm mb-12 max-w-2xl mx-auto">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {bestSellers.map((product) => (
                        <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer">
                            <div className="overflow-hidden mb-3">
                                <img 
                                    src={product.images?.[0]?.url || '/fallback.png'} 
                                    alt={product.title} 
                                    className="w-full aspect-4/5 object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-gray-700 mb-1">{product.title}</p>
                                <p className="text-sm font-semibold">${product.price?.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── POLICIES ── */}
            <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/1053/1053210.png" alt="icon" className="w-10 mx-auto mb-4 opacity-80" />
                    <h3 className="font-bold text-sm">Easy Exchange Policy</h3>
                    <p className="text-gray-400 text-xs">We offer hassle free exchange policy</p>
                </div>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/709/709510.png" alt="icon" className="w-10 mx-auto mb-4 opacity-80" />
                    <h3 className="font-bold text-sm">7 Days Return Policy</h3>
                    <p className="text-gray-400 text-xs">We provide 7 days free return policy</p>
                </div>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" alt="icon" className="w-10 mx-auto mb-4 opacity-80" />
                    <h3 className="font-bold text-sm">Best customer support</h3>
                    <p className="text-gray-400 text-xs">we provide 24/7 customer support</p>
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="bg-white py-20 text-center">
                <h2 className="text-2xl font-semibold mb-2">Subscribe now & get 20% off</h2>
                <p className="text-gray-400 text-sm mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className="flex max-w-md mx-auto border border-gray-300">
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 outline-none" />
                    <button className="bg-black text-white px-8 py-2 text-xs uppercase tracking-widest">Subscribe</button>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="max-w-7xl mx-auto px-4 py-20 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold mb-6">SNITCH<span className="text-pink-500">.</span></h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase mb-6">Company</h3>
                        <ul className="text-gray-600 text-sm flex flex-col gap-2">
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase mb-6">Get In Touch</h3>
                        <ul className="text-gray-600 text-sm flex flex-col gap-2">
                            <li>+1-212-456-7890</li>
                            <li>contact@snitch.com</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
                    Copyright 2024@ snitch.com - All Right Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
