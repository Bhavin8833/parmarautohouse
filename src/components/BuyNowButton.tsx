import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface BuyNowButtonProps {
    product: Product;
    qty?: number;
    className?: string;
}

const BuyNowButton = ({ product, qty = 1, className }: BuyNowButtonProps) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
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

        // Navigate to cart after a short delay so the success animation is visible
        setTimeout(() => {
            navigate("/cart");
        }, 800);
    };

    return (
        <motion.button
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
            onClick={handleClick}
            className={cn(
                "relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 p-2 rounded-md font-semibold",
                product.stock === 0
                    ? "hidden" // Hide Buy Now if out of stock, or could show disabled
                    : status === "success"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
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
                        <span>Buy Now</span>
                    </motion.div>
                )}

                {status === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Loader2 className="animate-spin h-5 w-5" />
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
                        <Check className="h-5 w-5" />
                        <span>Redirecting...</span>
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

export default BuyNowButton;
