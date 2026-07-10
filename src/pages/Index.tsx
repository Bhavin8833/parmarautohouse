import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, HeadphonesIcon, Award, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { useProducts } from "@/context/ProductContext";
import { categories } from "@/data/products";
import storePhoto from "@/assets/store-photo.jpg";

const features = [
  { icon: ShieldCheck, title: "Genuine Parts", desc: "100% authentic products from trusted brands" },
  { icon: Truck, title: "Fast Delivery", desc: "Quick shipping across India" },
  { icon: HeadphonesIcon, title: "Expert Support", desc: "Technical guidance from our specialists" },
  { icon: Award, title: "Quality Assured", desc: "Every product passes quality checks" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

import * as Icons from "lucide-react";

const HomePage = () => {
  const { products, categories } = useProducts();
  const featured = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);

  return (
    <div>
      {/* Hero Slider (Bambulab Style) */}
      <HeroSlider />

      {/* Categories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const Icon = (Icons as any)[cat.iconName] || Icons.LayoutGrid;
              return (
                <motion.div key={cat.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link to="/shop" className="flex flex-col items-center gap-2 p-5 rounded-lg bg-card border border-border hover:shadow-md hover:border-primary/30 transition-all text-center group">
                    <Icon className="h-12 w-12 mb-2 text-[#39ff14] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="font-semibold text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{cat.count} Products</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Featured */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl">Featured Products</h2>
            <Link to="/shop" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#2a2a72] text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-center p-6">
                <f.icon className="h-10 w-10 mx-auto mb-4 text-[#39ff14]" />
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-200 opacity-90">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-10">Best Sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <h2 className="font-display font-bold text-2xl mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">Get the latest deals and new arrivals in your inbox.</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
