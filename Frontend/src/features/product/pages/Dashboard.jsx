import React, { useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { handleGetSellerProduct } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetSellerProduct();
    }, []);

    const totalRevenue = sellerProducts?.reduce((acc, curr) => acc + (Number(curr.price?.amount) || 0), 0) || 0;

    return (
        <div className="min-h-screen bg-white font-sans text-[#1a1a1a] flex flex-col">
            
            {/* ── EDITORIAL HEADER ── */}
            <header className="border-b border-neutral-100 px-8 py-10 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-black"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                                Seller Management
                            </span>
                        </div>
                        <h1 className="text-5xl font-serif tracking-tight text-black">
                            The Dashboard
                        </h1>
                    </div>

                    {/* ── STATS SECTION ── */}
                    <div className="flex items-center gap-12 border-l border-neutral-100 pl-12 lg:flex">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Total Inventory</p>
                            <p className="text-2xl font-serif">{sellerProducts?.length || 0} <span className="text-sm font-sans text-neutral-400 uppercase">Units</span></p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Accumulated Revenue</p>
                            <p className="text-2xl font-serif">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-95"
                        >
                            + Add New Piece
                        </button>
                    </div>
                    
                    {/* Mobile Button */}
                    <button
                        onClick={() => navigate('/seller/create-product')}
                        className="lg:hidden w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        + Add New Piece
                    </button>
                </div>
            </header>

            {/* ── PRODUCT GRID (EDITORIAL STYLE) ── */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500">Active Listings</h2>
                    <div className="h-px flex-1 bg-neutral-100 mx-8"></div>
                    <span className="text-[11px] font-serif italic text-neutral-400">Showing {sellerProducts?.length || 0} items</span>
                </div>

                {sellerProducts && sellerProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                        {sellerProducts.map(product => {
                            const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x500';

                            return (
                                <div 
                                    key={product._id}
                                    onClick={() => navigate(`/seller/product/${product._id}`)}
                                    className="group cursor-pointer"
                                >
                                    {/* Sharp Image Container */}
                                    <div className="relative aspect-3/4 overflow-hidden bg-neutral-50 mb-6 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-black/5">
                                        <img
                                            src={imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                        />
                                        
                                        {/* Minimal Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                           <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-white/40 px-4 py-2 self-center backdrop-blur-sm">
                                               Edit Details
                                           </span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-bold uppercase tracking-tight text-black group-hover:underline underline-offset-4 decoration-1">
                                                {product.title}
                                            </h3>
                                            <p className="text-sm font-serif text-neutral-900">
                                                ₹{product.price?.amount?.toLocaleString()}
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                                            Premium Collection
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <h2 className="text-4xl font-serif italic text-neutral-300 mb-4 font-light">Your vault is currently empty.</h2>
                        <p className="text-neutral-400 text-xs uppercase tracking-widest mb-8">Ready to showcase your first masterpiece?</p>
                        <button 
                            onClick={() => navigate('/seller/create-product')}
                            className="border border-black px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                            Begin Creation
                        </button>
                    </div>
                )}
            </main>

            {/* ── FOOTER STYLE ── */}
            <footer className="border-t border-neutral-100 py-10 px-8 text-center">
                <p className="text-[10px] tracking-[0.5em] uppercase text-neutral-300">
                    Snitch. Dashboard &copy; 2026
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;