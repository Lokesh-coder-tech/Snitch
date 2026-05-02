import React, { useEffect, useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useParams } from 'react-router';

// Helper icons - Made slightly thinner for elegance
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

const SellerProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);

  // UI state for inputs to maintain focus
  const [attributeInputs, setAttributeInputs] = useState([{ key: '', value: '' }]);

  // New variant state
  const [newVariant, setNewVariant] = useState({
    images: [],
    stock: 0,
    attributes: {}, // Strictly an object
    price: { amount: '', currency: 'INR' }
  });

  const { productId } = useParams();
  const { handleGetProductById, handleAddProductVariant } = useProduct();

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const data = await handleGetProductById(productId);
      const prod = data?.product || data;
      setProduct(prod);
      if (prod?.variants) {
        setLocalVariants(prod.variants);
      }
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleStockChange = (index, newStock) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = { ...updatedVariants[index], stock: Number(newStock) };
    setLocalVariants(updatedVariants);
  };

  const handleAddNewVariant = async () => {
    const hasValidAttribute = attributeInputs.some(attr => attr.key.trim() && attr.value.trim());
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    const cleanImages = newVariant.images.map(img => ({ url: img.previewUrl, file: img.file }));
    const cleanAttributes = { ...newVariant.attributes };

    const variantToSave = {
      images: cleanImages,
      stock: Number(newVariant.stock),
      attributes: cleanAttributes,
      price: newVariant.price.amount ? Number(newVariant.price.amount) : undefined
    };

    setLocalVariants([...localVariants, variantToSave]);
    setIsAddingVariant(false);

    await handleAddProductVariant(productId, variantToSave);

    setAttributeInputs([{ key: '', value: '' }]);
    setNewVariant({
      images: [],
      stock: 0,
      attributes: {},
      price: { amount: '', currency: 'INR' }
    });
  };

  const handleAddAttribute = () => {
    setAttributeInputs(prev => [...prev, { key: '', value: '' }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = [...attributeInputs];
    updatedInputs[index][field] = value;
    setAttributeInputs(updatedInputs);

    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setNewVariant(prev => ({
      ...prev,
      images: [...prev.images, ...newImageObjects]
    }));

    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[index];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant(prev => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-neutral-400 text-sm tracking-widest uppercase">Loading gallery...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-neutral-400 text-sm tracking-widest uppercase">Product Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-32 selection:bg-neutral-900 selection:text-white">
      
      {/* Refined Subtle Breadcrumb / Header */}
      <header className="border-b border-neutral-100 px-8 py-4">
        <p className="text-[10px] tracking-widest text-neutral-400 uppercase">
          Dashboard / Products / <span className="text-neutral-900">{product.title?.substring(0, 20)}</span>
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-20">

        {/* Base Product Info */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          
          {/* Left: Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-3/4 bg-neutral-50 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm tracking-widest uppercase">No Image</div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt={`Thumb ${i}`} className="w-20 aspect-3/4 object-cover bg-neutral-50 shrink-0 cursor-pointer hover:opacity-80 transition-opacity" />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start pt-4">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6 uppercase tracking-wide">{product.title}</h2>
            <div className="text-xl tracking-wider font-light text-neutral-600 mb-8">
              {product.price?.amount} {product.price?.currency}
            </div>
            <div className="w-12 h-px bg-neutral-200 mb-8"></div>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light max-w-lg">
              {product.description}
            </p>
          </div>
        </section>

        {/* Variants & Inventory */}
        <section className="border-t border-neutral-100 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h3 className="font-serif text-2xl uppercase tracking-wide">Inventory Management</h3>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="border border-neutral-900 text-neutral-900 px-6 py-3 uppercase tracking-widest text-[11px] hover:bg-neutral-900 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon /> Add Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form - Minimal Styling */}
          {isAddingVariant && (
            <div className="bg-neutral-50 border border-neutral-100 p-8 md:p-12 mb-16">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-200">
                <h4 className="text-sm uppercase tracking-widest text-neutral-900 font-medium">Create New Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-neutral-400 hover:text-neutral-900 text-[11px] uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-10">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-neutral-500 mb-4">Attributes *</label>
                    <div className="space-y-4">
                      {attributeInputs.map((attr, index) => (
                        <div key={index} className="flex gap-4 items-end">
                          <div className="w-1/2">
                            <input
                              type="text"
                              placeholder="e.g. Size"
                              value={attr.key}
                              onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                              className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-300"
                            />
                          </div>
                          <div className="w-1/2 flex items-end gap-2">
                            <input
                              type="text"
                              placeholder="e.g. M"
                              value={attr.value}
                              onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                              className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-300"
                            />
                            {attributeInputs.length > 1 && (
                              <button onClick={() => handleRemoveAttribute(index)} className="text-neutral-400 pb-2 hover:text-red-500 transition-colors">
                                <TrashIcon />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddAttribute}
                      className="mt-6 text-neutral-500 text-[11px] uppercase tracking-widest flex items-center gap-2 hover:text-neutral-900 transition-colors"
                    >
                      <PlusIcon /> Add Attribute Row
                    </button>
                  </div>

                  <div className="flex gap-8">
                    <div className="w-1/2">
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-500 mb-2">Initial Stock</label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-[11px] uppercase tracking-widest text-neutral-500 mb-2">Price (Optional)</label>
                      <input
                        type="number"
                        value={newVariant.price.amount}
                        onChange={(e) => setNewVariant({ ...newVariant, price: { ...newVariant.price, amount: e.target.value } })}
                        placeholder="Base price"
                        className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Right Col: Images */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-[11px] uppercase tracking-widest text-neutral-500">Gallery (Max 7)</label>
                    <span className="text-[10px] text-neutral-400 tracking-widest">{newVariant.images.length}/7</span>
                  </div>

                  {newVariant.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {newVariant.images.map((img, index) => (
                        <div key={index} className="relative aspect-3/4 bg-neutral-100 group">
                          <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-white/90 p-1.5 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {newVariant.images.length < 7 && (
                    <div className="relative border border-dashed border-neutral-300 hover:border-neutral-500 transition-colors bg-white p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-2">
                      <PlusIcon />
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500">Upload Images</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 flex justify-end pt-8 border-t border-neutral-200">
                <button
                  onClick={handleAddNewVariant}
                  className="bg-neutral-900 text-white px-10 py-3 uppercase tracking-widest text-[11px] hover:bg-black transition-colors"
                >
                  Save Variant
                </button>
              </div>
            </div>
          )}

          {/* Variants List - Clean Cards */}
          {localVariants.length === 0 ? (
            <div className="py-20 text-center text-neutral-400 border border-dashed border-neutral-200">
              <p className="text-sm tracking-wider font-light">No variants configured for this product.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localVariants.map((variant, idx) => (
                <div key={idx} className="border border-neutral-200 p-5 flex flex-col hover:border-neutral-400 transition-colors bg-white">
                  
                  <div className="flex gap-5 mb-6">
                    <div className="w-16 aspect-3/4 bg-neutral-50 shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-300">N/A</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                        {Object.entries(variant.attributes || {}).map(([key, val]) => (
                          <span key={key} className="text-[11px] uppercase tracking-widest text-neutral-900">
                            <span className="text-neutral-400">{key}:</span> {val}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm font-light text-neutral-600">
                        {variant.price?.amount ? `${variant.price.amount} ${variant.price.currency}` : 'Base Price'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-neutral-100 pt-4 flex items-center justify-between">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest">Stock</label>
                    <input
                      type="number"
                      value={variant.stock || 0}
                      onChange={(e) => handleStockChange(idx, e.target.value)}
                      className="w-16 bg-transparent border-b border-neutral-200 py-1 text-right text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>
      </main>
    </div>
  )
}

export default SellerProductDetails;