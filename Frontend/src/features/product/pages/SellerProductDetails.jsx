import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import { useParams, useNavigate } from 'react-router';

const SellerProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const data = await handleGetProductById(productId);
      const prod = data?.product || data;
      setProduct(prod);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center">
        <div className="text-[#B5ADA3] text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Loading Metadata...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center font-serif">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] selection:bg-[#C9A96E]/20 pb-24 font-['Inter']">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-[#fbf9f6]/90 backdrop-blur-md border-b border-[#e4e2df] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-[#B5ADA3] hover:text-[#1b1c1a] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7A6E63]">
            Product Management / <span className="text-[#1b1c1a]">{product.title}</span>
          </h1>
        </div>
        <button className="text-[10px] uppercase tracking-widest px-4 py-2 border border-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white transition-all duration-300">
          Edit Details
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Product Visuals (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-4/5 bg-[#f5f3f0] overflow-hidden rounded-sm group relative">
              {product.images?.[0]?.url ? (
                <img 
                  src={product.images[0].url} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-[#B5ADA3]">
                  No Primary Image
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-4 gap-2">
              {product.images?.slice(1, 5).map((img, i) => (
                <div key={i} className="aspect-square bg-[#f5f3f0] overflow-hidden rounded-sm">
                  <img src={img.url} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Metadata (7 columns) */}
          <div className="lg:col-span-7 pt-4">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-semibold mb-2 block">
                Listing Information
              </span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-[#1b1c1a] font-['Cormorant_Garamond']">
                {product.title}
              </h2>
              <p className="text-2xl font-light text-[#1b1c1a]">
                {product.price?.currency} {product.price?.amount?.toLocaleString()}
              </p>
            </div>

            <div className="h-px w-full bg-[#e4e2df] mb-8" />

            <div className="space-y-10">
              {/* Description Section */}
              <section>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-[#1b1c1a]">
                  Product Description
                </h3>
                <p className="text-sm leading-relaxed text-[#7A6E63] font-light max-w-xl italic">
                  {product.description || "No description provided for this listing."}
                </p>
              </section>

              {/* Data Table */}
              <section className="bg-[#f5f3f0] p-6 rounded-sm">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-[#1b1c1a] border-b border-[#e4e2df] pb-2">
                  System Attributes
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <label className="block text-[9px] uppercase text-[#B5ADA3] tracking-tighter">Product ID</label>
                    <span className="text-xs font-mono text-[#1b1c1a]">{productId}</span>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#B5ADA3] tracking-tighter">Category</label>
                    <span className="text-xs text-[#1b1c1a]">{product.category || 'General'}</span>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#B5ADA3] tracking-tighter">Status</label>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                      Active Listing
                    </span>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase text-[#B5ADA3] tracking-tighter">Inventory Type</label>
                    <span className="text-xs text-[#1b1c1a]">Standard</span>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <button className="flex-1 bg-[#1b1c1a] text-white py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-[#1b1c1a] transition-all duration-500 font-medium">
                  Update Inventory
                </button>
                <button className="flex-1 border border-[#e4e2df] text-[#1b1c1a] py-4 text-[10px] uppercase tracking-[0.2em] hover:border-[#1b1c1a] transition-all duration-300 font-medium">
                  View On Storefront
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default SellerProductDetails