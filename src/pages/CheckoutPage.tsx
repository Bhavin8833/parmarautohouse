import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (items.length === 0) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground mb-4">Your cart is empty.</p>
      <Link to="/shop" className="text-primary hover:underline">Go to Shop</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-3xl mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Shipping Address</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[["Full Name","text"],["Phone","tel"],["Address Line 1","text"],["Address Line 2","text"],["City","text"],["State","text"],["Pincode","text"]].map(([label, type]) => (
                <div key={label} className={label.includes("Address") ? "md:col-span-2" : ""}>
                  <label className="text-sm font-medium mb-1.5 block">{label}</label>
                  <input type={type} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              ))}
            </form>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[["cod","Cash on Delivery"],["upi","UPI Payment"],["card","Credit/Debit Card"]].map(([val,label]) => (
                <label key={val} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${paymentMethod === val ? "border-primary bg-primary/5" : "border-input"}`}>
                  <input type="radio" name="payment" value={val} checked={paymentMethod === val} onChange={() => setPaymentMethod(val)} className="accent-primary" />
                  <span className="text-sm font-medium">{label as string}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
          <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{product.name} × {quantity}</span>
                <span>₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button onClick={() => { clearCart(); alert("Order placed successfully!"); }}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
