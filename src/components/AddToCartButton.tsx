import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: Product;
    qty?: number;
    className?: string; // Allow overriding styles
    showText?: boolean;
}

const AddToCartButton = ({ product, qty = 1, className, showText = false }: AddToCartButtonProps) => {
    const { addToCart } = useCart();
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a Link
        e.stopPropagation();

        if (status !== "idle") return;

        setStatus("loading");

        // Simulate a brief network/processing delay for the animation
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Add to cart
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }

        setStatus("success");

        // Reset to idle after a delay
        setTimeout(() => {
            setStatus("idle");
        }, 1500);
    };

    return (
        <motion.button
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
            onClick={handleClick}
            className={cn(
                "relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 p-2 rounded-md", // Added default p-2 and rounded-md
                product.stock === 0
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : status === "success"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary-hover",
                className
            )}
            disabled={status !== "idle" || product.stock === 0}
        >
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <ShoppingCart className={cn("h-5 w-5", !showText && "h-4 w-4")} />
                        {showText && <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>}
                    </motion.div>
                )}

                {status === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Loader2 className={cn("animate-spin", !showText ? "h-4 w-4" : "h-5 w-5")} />
                    </motion.div>
                )}

                {status === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <Check className={cn(!showText ? "h-4 w-4" : "h-5 w-5")} />
                        {showText && <span>Added</span>}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating +1 Particle Animation */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.span
                        initial={{ opacity: 1, y: 0, x: 10 }}
                        animate={{ opacity: 0, y: -20, x: 20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-1/2 right-4 text-xs font-bold text-white pointer-events-none"
                        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.3)" }}
                    >
                        +{qty}
                    </motion.span>
                )}
            </AnimatePresence>

        </motion.button>
    );
};

export default AddToCartButton;
