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

    const labelStyle = "text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-800 mb-2 block";
    const inputStyle = "w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-all text-sm placeholder:text-neutral-400 placeholder:font-light";

    return (
        <div className="min-h-screen bg-[#F0EDE8] flex items-center justify-center p-4 md:p-8 font-sans">
            {/* Modal Container */}
            <div className="bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden relative">
                
                {/* Close Button */}
                <button 
                    onClick={() => navigate('/seller/dashboard')}
                    className="absolute top-6 right-8 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                    <span className="text-xl font-light">×</span>
                </button>

                {/* Left Side: Hero Image */}
                <div className="w-full md:w-[45%] p-5 md:p-8">
                    <div className="w-full h-full min-h-75 md:min-h-125 rounded-4xl overflow-hidden">
                        <img 
                            src="https://i.pinimg.com/736x/51/97/4f/51974f55f087b3bcf6cf99b938d17a75.jpg" 
                            alt="Product context" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[55%] p-8 md:p-12 md:pl-4 flex flex-col justify-center">
                    <header className="mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2">Inventory</p>
                        <h1 className="text-4xl font-serif text-black leading-tight">List a New Piece</h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Title */}
                        <div>
                            <label className={labelStyle}>Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Oversized Heavyweight Tee"
                                className={inputStyle}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelStyle}>Description & Details</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Fabric specs, fit, and aesthetic notes..."
                                className={`${inputStyle} resize-none`}
                            />
                        </div>

                        {/* Price Row */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label className={labelStyle}>Amount</label>
                                <input
                                    type="number"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={inputStyle}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Currency</label>
                                <select
                                    name="priceCurrency"
                                    value={formData.priceCurrency}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div>
                            <label className={labelStyle}>Gallery ({images.length}/{MAX_IMAGES})</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border border-dashed border-neutral-300 rounded-xl p-4 bg-neutral-50/50 hover:bg-neutral-50 transition-all flex flex-col items-center justify-center cursor-pointer min-h-20"
                            >
                                {images.length === 0 ? (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">+ Click to Upload</span>
                                ) : (
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        {images.map((img, idx) => (
                                            <img key={idx} src={img.preview} className="w-12 h-12 object-cover rounded-md shadow-sm" alt="Preview" />
                                        ))}
                                        <div className="w-12 h-12 flex items-center justify-center border border-dashed border-neutral-300 rounded-md text-neutral-400">+</div>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Publish to Collection'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;