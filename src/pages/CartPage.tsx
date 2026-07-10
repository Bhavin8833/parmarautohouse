import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
      <h2 className="font-display font-bold text-2xl mb-2">Your Cart is Empty</h2>
      <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="font-display font-bold text-3xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
              <Link to={`/product/${product.id}`} className="shrink-0 w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain p-1" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">{product.name}</Link>
                <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-input rounded">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-xs font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-destructive hover:text-destructive/80 ml-auto p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-bold text-sm whitespace-nowrap">₹{(product.price * quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
          <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary font-medium">Free</span></div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="block text-center w-full px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
