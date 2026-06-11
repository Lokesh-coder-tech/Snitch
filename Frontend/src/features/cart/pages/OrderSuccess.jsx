import React from "react";
import { useLocation, Link } from "react-router";
import { useSelector } from "react-redux";

const tokens = {
  surface: "#FAFAFA",
  surfaceLow: "#F4F4F4",
  surfaceLowest: "#FFFFFF",
  surfaceHigh: "#EAEAEA",
  onSurface: "#111111",
  onSurfaceVariant: "#555555",
  secondary: "#767676",
  muted: "#9E9E9E",
  primary: "#C5A264", 
  primaryDark: "#111111", 
  outlineVariant: "#E5E5E5",
  outline: "#222222",
};

const OrderSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id") || "ToAp1pe6Bfj2WH";

  // Dynamic Data Source: Pulling directly from verified cart state 
  const cart = useSelector((state) => state.cart);

  const formatCurrency = (amount, currency = "INR") =>
    `${currency} ${Number(amount).toLocaleString("en-IN")}`;

  // Helper selectors identical to Cart parsing logic
  const getVariantDetails = (product, variantId) => {
    if (!product?.variants || !variantId) return null;
    if (Array.isArray(product.variants)) {
      return product.variants.find((v) => v._id === variantId) || product.variants[0];
    }
    return product.variants;
  };

  const getDisplayImage = (product, variant) => {
    if (variant?.images?.length) return variant.images[0].url;
    if (product?.images?.length) return product.images[0].url;
    return null;
  };

  const cartItems = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <div
        className="h-full p-7 flex flex-col overflow-hidden selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: tokens.surface,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Viewport-Centered Content Section */}
        <main className="grow flex items-center justify-center px-6 md:px-12 lg:px-20 max-w-7xl w-full mx-auto overflow-hidden py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full max-h-full overflow-hidden">
            
            {/* Left Column: Confirmation Header & Summary */}
            <div className="lg:col-span-7 space-y-6 flex flex-col max-h-full overflow-hidden">
              <section className="space-y-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span
                    className="uppercase tracking-[0.25em] text-[10px] font-semibold"
                    style={{ color: tokens.primary }}
                  >
                    Order Confirmed
                  </span>
                </div>
                
                <h1
                  className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-[1.2]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Thank you for your order. <br />
                  A piece of our <span className="italic font-normal text-neutral-700">Atelier</span> is yours.
                </h1>

                <div className="pt-3 border-t border-neutral-200/60 max-w-md inline-block pr-12">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-0.5">
                    Order Reference
                  </p>
                  <p className="font-mono text-xs tracking-tight text-neutral-800">
                    #{orderId}
                  </p>
                </div>
              </section>

              {/* Minimalist Order Summary List */}
              <section className="space-y-4 flex flex-col overflow-hidden grow">
                <div className="flex justify-between items-baseline border-b pb-2 shrink-0" style={{ borderColor: tokens.outlineVariant }}>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                    Your Selection
                  </h3>
                  <span className="text-xs font-medium text-neutral-500">
                    {cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)} Products
                  </span>
                </div>

                {/* Self-contained scroll section for product listing */}
                <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[180px] pr-2 scrollbar-thin">
                  {cartItems.map((item) => {
                    const productId = item.product?._id || item.product;
                    const safeVariantId = typeof item.variant === "object" ? item.variant?._id : item.variant;
                    const variantDetail = getVariantDetails(item.product, safeVariantId);
                    const imageUrl = getDisplayImage(item.product, variantDetail);
                    const displayPrice = item.price ?? variantDetail?.price ?? item.product?.price;

                    return (
                      <div key={item._id || productId} className="flex gap-4 py-3 first:pt-0 last:pb-0 group">
                        <div className="w-14 h-20 shrink-0 bg-neutral-100 overflow-hidden relative">
                          {imageUrl ? (
                            <img
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              alt={item.product?.title || "Product"}
                              src={imageUrl}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-200" />
                          )}
                        </div>
                        <div className="grow flex flex-col justify-between py-0.5">
                          <div className="space-y-0.5">
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="text-sm font-medium text-neutral-900">
                                {item.product?.title || "Product Asset"}
                              </h4>
                              <span className="font-medium text-neutral-900 text-xs">
                                {displayPrice?.amount ? formatCurrency(displayPrice.amount, displayPrice.currency) : "—"}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-light">
                              Variant: <span className="font-medium text-neutral-700">
                                {variantDetail?.attributes ? Object.values(variantDetail.attributes).join(" / ") : "Default"}
                              </span>
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[11px] text-neutral-400">
                            <span>Quantity: <span className="font-medium text-neutral-700">{item.quantity ?? 1}</span></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Table breakdown */}
                <div className="pt-3 border-t space-y-2 shrink-0" style={{ borderColor: tokens.outlineVariant }}>
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span className="font-light">Subtotal</span>
                    <span className="font-medium text-neutral-900">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span className="font-light">Shipping</span>
                    <span className="text-[10px] uppercase tracking-wider font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {totalPrice >= 15000 ? "Complimentary" : "Standard Flat Rate"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span className="font-light">Duties & Taxes</span>
                    <span className="text-[10px] text-neutral-400">Included</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-neutral-200/40">
                    <span className="font-medium text-neutral-900">Total Amount</span>
                    <span className="text-base font-semibold text-neutral-950">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Premium Side Panel Details */}
            <div 
              className="lg:col-span-5 space-y-6 bg-white p-6 md:p-8 border rounded-none shadow-sm max-h-full overflow-y-auto" 
              style={{ borderColor: tokens.outlineVariant }}
            >
              <div className="space-y-6 divide-y divide-neutral-100">
                
                {/* Delivery Estimate */}
                <div className="space-y-2 pb-4">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                    Arrival Estimate
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Your curated selection is safely packed and ready for transit. Expect premium white-glove arrival between:
                  </p>
                  <p className="text-sm font-medium text-neutral-900 mt-1">
                    October 24th — October 26th
                  </p>
                </div>

                {/* Shipping Destination */}
                <div className="space-y-2 pt-4">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                    Shipping Destination
                  </h3>
                  <div className="text-xs text-neutral-800 leading-relaxed space-y-0.5 font-light">
                    <p className="font-medium text-neutral-900">Julianne V. Sterling</p>
                    <p>742 Avenue Montaigne, Apt 4B</p>
                    <p className="tracking-wide">Paris, France 75008</p>
                  </div>
                </div>
              </div>

              {/* Seamless Action CTAs */}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/orders"
                  className="py-3 px-6 text-center text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm"
                  style={{
                    backgroundColor: tokens.primaryDark,
                    color: tokens.surfaceLowest,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2a2a2a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = tokens.primaryDark; }}
                >
                  Track Order Status
                </Link>

                <Link
                  to="/"
                  className="py-3 px-6 text-center text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 border"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: tokens.outlineVariant,
                    color: tokens.onSurface,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.surfaceLow; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  Continue Browsing
                </Link>
              </div>

              {/* Private Footer Disclaimer */}
              <div className="pt-4 border-t" style={{ borderColor: tokens.outlineVariant }}>
                <p className="text-[10px] text-neutral-400 tracking-wide leading-relaxed font-light">
                  A digital confirmation invoice has been sent to your registered account email. For tailored custom modifications or scheduling inquiries, please notify our private concierge desk.
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default OrderSuccess;