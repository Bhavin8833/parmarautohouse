import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-footer text-footer-foreground">
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Parmar Auto House" className="h-10 w-10" />
            <span className="font-display font-bold text-lg">Parmar Auto House</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Your trusted partner for quality auto parts, bearings, pipes, and agricultural equipment since 2018.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {[["Home", "/"], ["Shop", "/shop"], ["Categories", "/categories"], ["About", "/about"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={h}><Link to={h} className="hover:text-primary transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-lg mb-4">Categories</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {["Bearings", "Pipes & Hoses", "Bolts & Nuts", "Farm Equipment", "Engine Parts"].map(c => (
              <li key={c}><Link to="/shop" className="hover:text-primary transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="tel:+919824835163" className="hover:text-primary transition-colors">+91 98248 35163</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="mailto:Parmarautohouse2018@gmail.com" className="hover:text-primary transition-colors">Parmarautohouse2018@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <a href="https://maps.app.goo.gl/NSzo8j8NUzxGzN4a9" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Parmar Auto House, Bhavnagar road, Botad Gujarat -364710
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/20 mt-10 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Parmar Auto House. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
