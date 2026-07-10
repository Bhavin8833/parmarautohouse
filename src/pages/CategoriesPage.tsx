import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import * as Icons from "lucide-react";

const CategoriesPage = () => {
  const { categories } = useProducts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-3xl mb-8">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => {
          const Icon = (Icons as any)[cat.iconName] || Icons.LayoutGrid;
          return (
            <Link key={cat.id} to="/shop"
              className="flex flex-col items-center gap-3 p-8 rounded-lg bg-card border border-border hover:shadow-lg hover:border-primary/30 transition-all group">
              <Icon className="h-12 w-12 text-primary/80 group-hover:text-primary transition-colors" />
              <h3 className="font-display font-semibold text-lg">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.count} Products</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
