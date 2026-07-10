import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-card rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-muted p-4 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
        {discount > 0 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </Link>
      <div className="p-3 md:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category.replace("-", " ")}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
