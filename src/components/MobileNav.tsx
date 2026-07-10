import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Grid, User, ShoppingCart, Wrench, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MobileNav = () => {
    const location = useLocation();
    const { totalItems } = useCart();

    const links = [
        { to: "/", label: "Home", icon: Home },
        { to: "/shop", label: "Shop", icon: ShoppingBag },
        { to: "/tools", label: "Tools", icon: Wrench },
        { to: "/cart", label: "Cart", icon: ShoppingCart, badge: totalItems },
        { to: "/login", label: "Account", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden safe-area-bottom">
            <div className="flex justify-around items-center h-16">
                {links.map((link) => {
                    const isActive = location.pathname === link.to;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                                }`}
                        >
                            <div className="relative">
                                <Icon className="h-5 w-5" />
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {link.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;
