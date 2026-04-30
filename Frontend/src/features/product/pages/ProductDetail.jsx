import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const navigate = useNavigate();
    const { handleGetProductById } = useProduct();

    async function fetchProductDetails() {
        try {
            const data = await handleGetProductById(productId);
            setProduct(data?.product || data);
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium animate-pulse text-[#B5ADA3]">
                    Opening Gallery...
                </p>
            </div>
        );
    }

    const displayImages = product.images?.length > 0 
        ? product.images 
        : [{ url: '/placeholder.png' }];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div className="min-h-screen bg-white font-['Inter'] selection:bg-[#C9A96E]/20 pb-24">
                <div className="max-w-350 mx-auto px-6 lg:px-12 pt-8 lg:pt-8">
                    
                    {/* Back Navigation */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="group mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#B5ADA3] hover:text-[#1b1c1a] transition-all"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Return to Collection
                    </button>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                        
                        {/* ── LEFT: Visual Stage ── */}
                        <div className="w-full lg:w-[55%] flex flex-col md:flex-row gap-6">
                            
                            {/* Vertical Thumbnails */}
                            {displayImages.length > 1 && (
                                <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto scrollbar-hide">
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-14 h-20 shrink-0 transition-all duration-500 border ${selectedImage === idx ? 'border-[#1b1c1a]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                        >
                                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Hero Image Stage */}
                            <div className="flex-1 order-1 md:order-2 bg-[#fafafa] border border-[#f0f0f0] overflow-hidden">
                                <img
                                    src={displayImages[selectedImage]?.url}
                                    alt={product.title}
                                    className="w-full h-auto max-h-[80vh] object-contain transition-opacity duration-700 mx-auto"
                                />
                            </div>
                        </div>

                        {/* ── RIGHT: Product Narrative ── */}
                        <div className="w-full lg:w-[45%] flex flex-col pt-2">
                            <div className="lg:sticky lg:top-24 space-y-10">
                                
                                {/* Header */}
                                <section>
                                    <h1 className="text-4xl lg:text-6xl font-light leading-[1.1] mb-6 text-[#1b1c1a] font-['Cormorant_Garamond'] capitalize italic">
                                        {product.title}
                                    </h1>
                                    <p className="text-2xl font-light tracking-tight text-[#1b1c1a]">
                                        {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                    </p>
                                </section>

                                <div className="h-px w-full bg-[#f0f0f0]" />

                                {/* Description */}
                                <section>
                                    <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4 text-[#C9A96E]">
                                        The Story
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-[#7A6E63] font-light italic max-w-lg">
                                        {product.description || "A masterfully crafted piece, designed to bring a touch of timeless distinction to your space."}
                                    </p>
                                </section>

                                {/* Actions */}
                                <section className="space-y-4 pt-4">
                                    <button className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold bg-[#1b1c1a] text-white hover:bg-[#C9A96E] hover:text-[#1b1c1a] transition-all duration-500 shadow-xl shadow-black/5">
                                        Add to Cart
                                    </button>
                                    
                                    <button className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold border border-[#e4e2df] text-[#1b1c1a] hover:border-[#1b1c1a] transition-all duration-300">
                                        Buy It Now
                                    </button>
                                </section>

                                {/* Quality Indicators */}
                                <footer className="pt-10 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#C9A96E] mt-1.5 shrink-0"></div>
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#1b1c1a] mb-1">Materials & Care</span>
                                            <p className="text-[12px] text-[#B5ADA3] font-light">Museum-grade materials. Keep away from direct sunlight. Professional framing recommended.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between border-t border-[#f0f0f0] pt-6 text-[9px] uppercase tracking-[0.2em] text-[#B5ADA3] font-semibold">
                                        <span className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-[#B5ADA3] rounded-full"></div> Complimentary Shipping
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-[#B5ADA3] rounded-full"></div> Secure Payment
                                        </span>
                                    </div>
                                </footer>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;