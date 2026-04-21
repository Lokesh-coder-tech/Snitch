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
        <div className="h-screen bg-[#faf9f6] font-sans text-[#1a1a1a] overflow-hidden flex flex-col">
            {/* ── MODERN NAV / HEADER ── */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="h-px w-6 bg-[#b30052]"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b30052]">
                                Seller Dashboard
                            </span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 italic uppercase">
                            Your Vault<span className="text-[#b30052]">.</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* ── STATS CAPSULES ── */}
                        <div className="hidden sm:flex bg-gray-100/50 p-1 rounded-2xl border border-gray-100">
                            {[
                                { label: 'Items', value: sellerProducts?.length || 0 },
                                { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}` },
                            ].map((stat, i) => (
                                <div key={i} className="px-4 py-2 text-center">
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-sm font-black text-gray-800">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="bg-[#b30052] hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-[11px] tracking-[0.15em] uppercase shadow-xl shadow-pink-100 transition-all duration-500 hover:-translate-y-1 active:scale-95"
                        >
                            + New Listing
                        </button>
                    </div>
                </div>
            </div>

            {/* ── PRODUCT GALLERY ── */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 overflow-y-auto scrollbar-hide">
                {sellerProducts && sellerProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sellerProducts.map(product => {
                            const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x500';

                            return (
                                <div 
                                    key={product._id}
                                    onClick={() => navigate(`/seller/product/${product._id}`)}
                                    className="group relative bg-white rounded-[32px] p-3 border border-transparent hover:border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-50">
                                        <img
                                            src={imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        
                                        {/* Floating Price Tag */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                                            <span className="text-[10px] font-black text-gray-900 tracking-tighter">
                                                {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <div className="bg-white text-black h-12 w-12 rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Meta */}
                                    <div className="px-3 py-4">
                                        <p className="text-[9px] font-bold text-[#b30052] uppercase tracking-[0.2em] mb-1">
                                            Premium Collection
                                        </p>
                                        <h3 className="text-[15px] font-bold text-gray-900 truncate">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex gap-1">
                                                <div className="w-3 h-3 rounded-full bg-gray-900" />
                                                <div className="w-3 h-3 rounded-full bg-gray-200" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase italic">Edit Item</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            🛍️
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter">Your collection is empty</h2>
                        <p className="text-gray-400 text-xs mt-2 max-w-[200px]">Time to drop your first fashion masterpiece.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;