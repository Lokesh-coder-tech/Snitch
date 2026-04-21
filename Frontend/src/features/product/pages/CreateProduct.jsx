import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(e.target.files).slice(0, remaining);
        const newImages = toAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
        setImages(prev => [...prev, ...newImages]);
        e.target.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);
            images.forEach(img => data.append('images', img.file));
            await handleCreateProduct(data);
            navigate('/seller/dashboard');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Compact styles
    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none text-sm focus:border-pink-200 transition-all placeholder:text-gray-300";
    const labelClass = "text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1 block";

    return (
        <div className="h-screen bg-[#f3f0eb] flex items-center justify-center p-4 font-sans overflow-hidden">
            <div className="bg-white rounded-[32px] shadow-2xl flex max-w-4xl w-full max-h-[90vh] overflow-hidden">
                
                {/* LEFT SIDE - Brand Panel (Fixed Height) */}
                <div className="hidden md:flex w-[38%] relative p-4">
                    <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                            className="w-full h-full object-cover"
                            alt="Fashion"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-6 left-6 text-white pr-4">
                            <p className="text-[9px] font-bold tracking-[0.2em] mb-1">#FASHION EDITORIAL</p>
                            <h2 className="text-xl font-black italic tracking-tighter leading-none mb-2">SNITCH.</h2>
                            <h3 className="text-2xl font-black uppercase leading-tight">NEW<br />COLLECTION.</h3>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Form Panel (Compressed) */}
                <div className="w-full md:w-[62%] p-6 lg:p-10 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-5">
                        <h1 className="text-2xl font-bold text-gray-900 leading-none">Create Product</h1>
                        <p className="text-gray-400 text-[13px] mt-1">Add a new masterpiece to your store.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className={labelClass}>Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Oversized Linen Shirt"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Describe the product details..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className={labelClass}>Amount</label>
                                <input
                                    type="number"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className="w-28">
                                <label className={labelClass}>Currency</label>
                                <select
                                    name="priceCurrency"
                                    value={formData.priceCurrency}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Ultra-compact Image Area */}
                        <div>
                            <label className={labelClass}>Images ({images.length}/{MAX_IMAGES})</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                {images.length === 0 ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">+</div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase">Tap to upload</span>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 w-full overflow-x-auto pb-1 scrollbar-hide">
                                        {images.map((img, idx) => (
                                            <img key={idx} src={img.preview} className="w-10 h-10 rounded-md object-cover flex-shrink-0 shadow-sm" alt="" />
                                        ))}
                                        <div className="w-10 h-10 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-300 flex-shrink-0 text-lg">+</div>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-[#b30052] text-white rounded-xl font-bold text-[12px] tracking-widest uppercase shadow-lg shadow-pink-100 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 mt-2"
                        >
                            {isSubmitting ? 'Processing...' : 'Create Product'}
                        </button>

                        <p className="text-center text-[11px] text-gray-400 mt-2">
                            <button type="button" onClick={() => navigate('/seller/dashboard')} className="text-gray-900 font-bold underline underline-offset-2">Cancel & Go Back</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;