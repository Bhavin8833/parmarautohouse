import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Parmar Auto House" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
            Parmar Auto House
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${location.pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/shop" className="p-2 rounded-md hover:bg-muted transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link to="/cart" className="p-2 rounded-md hover:bg-muted transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/login" className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors">
            <User className="h-4 w-4" /> Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
