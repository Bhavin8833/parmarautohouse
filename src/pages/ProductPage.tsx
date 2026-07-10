import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground text-lg">Product not found.</p>
      <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col gap-4">
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center aspect-square">
            <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 bg-muted rounded-md border-2 flex-shrink-0 flex items-center justify-center p-2 transition-colors ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-border'}`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category.replace("-", " ")}</p>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
            ))}</div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
            {discount > 0 && <>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm font-medium text-primary">-{discount}% OFF</span>
            </>}
          </div>

          <div className="mb-6">
            {product.stock > 10 ? (
              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                In Stock ({product.stock} units available)
              </span>
            ) : product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Low Stock (Only {product.stock} left!)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          {Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="bg-muted rounded-md p-3">
                    <span className="text-xs text-muted-foreground">{k}</span>
                    <p className="font-medium text-sm">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-input rounded-md">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
              <span className="px-4 text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="flex gap-3">
            <AddToCartButton product={product} qty={qty} showText={true} className="flex-1 px-6 py-3 h-12" />
            <BuyNowButton product={product} qty={qty} className="flex-1 px-6 py-3 h-12" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
