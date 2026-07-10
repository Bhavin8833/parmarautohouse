import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { Category, Product } from "@/data/products";
import { 
  Plus, Search, Edit2, Trash2, Save, X, 
  Package, IndianRupee, Tag, BarChart3, 
  CheckCircle2, AlertCircle, TrendingDown,
  LayoutGrid, LogOut, Lock, Image as ImageIcon,
  Star, FileText, Settings2
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const AdminPage = () => {
  const { isAdmin, login, logout } = useAuth();
  const { 
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory 
  } = useProducts();
  
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Login State
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(adminId, password)) {
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid credentials. Access denied.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border w-full max-w-md p-8 rounded-2xl shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-muted-foreground text-center mb-8">Enter your credentials to access the portal.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Admin ID</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-background"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <input 
                type="password"
                className="w-full px-4 py-2 border rounded-md bg-background"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-bold hover:bg-primary/90 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">Store Management System</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={logout}
            className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <button 
            onClick={() => activeTab === "products" ? setIsAdding(true) : setIsAddingCat(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" /> {activeTab === "products" ? "Add Item" : "Add Category"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Inventory" value={products.length} icon={Package} color="blue" />
        <StatCard title="Low Stock" value={products.filter(p => p.stock > 0 && p.stock <= 10).length} icon={AlertCircle} color="amber" />
        <StatCard title="Categories" value={categories.length} icon={LayoutGrid} color="purple" />
        <StatCard title="Valuation" value={`₹${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`} icon={BarChart3} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6 w-fit">
        <button 
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "products" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Package className="h-4 w-4 inline mr-2" /> Products
        </button>
        <button 
          onClick={() => setActiveTab("categories")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "categories" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <LayoutGrid className="h-4 w-4 inline mr-2" /> Categories
        </button>
      </div>

      {activeTab === "products" ? (
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm" 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-muted-foreground">
                  <th className="p-4 font-semibold">Product Details</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold text-right">Pricing (₹)</th>
                  <th className="p-4 font-semibold text-right">Stock</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(p => (
                  <ProductRow 
                    key={p.id} 
                    product={p} 
                    categories={categories}
                    isEditing={editingId === p.id}
                    onEdit={() => setEditingId(p.id)}
                    onSave={(updates: any) => {
                      updateProduct(p.id, updates);
                      setEditingId(null);
                      toast.success("Updated successfully");
                    }}
                    onCancel={() => setEditingId(null)}
                    onDelete={() => {
                      if(confirm("Are you sure you want to delete this product?")) deleteProduct(p.id);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onDelete={() => {
                if(confirm("Delete category? This won't delete products but will leave them without a category.")) deleteCategory(cat.id);
              }}
              onUpdate={(updates: any) => {
                updateCategory(cat.id, updates);
                toast.success("Category updated");
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {isAdding && (
          <AddProductModal 
            categories={categories}
            onClose={() => setIsAdding(false)} 
            onAdd={(newP: any) => { addProduct(newP); setIsAdding(false); toast.success("Product created!"); }} 
          />
        )}
        {isAddingCat && (
          <AddCategoryModal 
            onClose={() => setIsAddingCat(false)} 
            onAdd={(newC: any) => { addCategory(newC); setIsAddingCat(false); toast.success("Category added!"); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
    red: "bg-red-50 text-red-600 dark:bg-red-900/20",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20"
  };

  return (
    <div className="bg-card border rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`p-2 rounded-md ${colors[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

const ProductRow = ({ product, categories, isEditing, onEdit, onSave, onCancel, onDelete }: any) => {
  const [formData, setFormData] = useState({ 
    ...product, 
    images: product.images && product.images.length > 0 ? product.images : [product.image].filter(Boolean) 
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const newImage = canvas.toDataURL('image/jpeg', 0.7);

          const newImages = [...(formData.images || []), newImage];
          setFormData({ ...formData, image: newImages[0], images: newImages });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, image: newImages[0] || "", images: newImages });
  };

  if (isEditing) {
    return (
      <tr className="bg-primary/5">
        <td className="p-3 align-top min-w-[300px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Name:</span>
               <input className="w-full px-2 py-1 border rounded text-sm font-bold bg-background" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2 p-2 border rounded bg-background">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Images:</span>
                  <label className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded cursor-pointer hover:bg-primary/20 transition-colors font-bold">
                    + Add Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
               </div>
               <div className="flex flex-wrap gap-2">
                 {(formData.images || []).map((img: string, idx: number) => (
                    <div key={idx} className="relative w-12 h-12 bg-muted rounded border flex-shrink-0 group">
                       <img src={img} alt="" className="w-full h-full object-contain rounded" />
                       <button 
                         onClick={() => removeImage(idx)} 
                         className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground w-4 h-4 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <X className="w-3 h-3" />
                       </button>
                    </div>
                 ))}
               </div>
               <input 
                 className="w-full text-[10px] outline-none bg-transparent border-t pt-2 text-muted-foreground" 
                 placeholder="Paste URL and press enter..." 
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     e.preventDefault();
                     const url = e.currentTarget.value;
                     if (url) {
                        const newImages = [...(formData.images || []), url];
                        setFormData({ ...formData, image: newImages[0], images: newImages });
                        e.currentTarget.value = "";
                     }
                   }
                 }} 
               />
            </div>
            <textarea className="w-full px-2 py-1 border rounded text-xs h-16 bg-background" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" />
          </div>
        </td>
        <td className="p-3 align-top">
          <select className="w-full px-2 py-1 border rounded text-sm bg-background" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </td>
        <td className="p-3 align-top">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground w-12 uppercase font-bold">Sale:</span>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm text-right bg-background" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground w-12 uppercase font-bold">MRP:</span>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm text-right bg-background" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})} />
            </div>
          </div>
        </td>
        <td className="p-3 align-top">
           <input type="number" className="w-full px-2 py-1 border rounded text-sm text-right font-bold bg-background" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
        </td>
        <td className="p-3 align-top">
          <div className="flex flex-col gap-2">
            <button onClick={() => onSave(formData)} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-1 text-xs font-bold">
              <Save className="h-3 w-3" /> Save
            </button>
            <button onClick={onCancel} className="p-2 bg-muted text-muted-foreground rounded hover:bg-muted-foreground hover:text-white transition-colors flex items-center justify-center gap-1 text-xs font-bold">
              <X className="h-3 w-3" /> Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 border shadow-sm">
          <img src={product.image} className="max-h-full max-w-full object-contain" alt="" />
        </div>
        <div>
          <span className="font-semibold block text-sm">{product.name}</span>
          <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1 rounded">{product.id}</span>
        </div>
      </td>
      <td className="p-4 uppercase text-[10px] font-bold text-muted-foreground">
        {product.category.replace("-", " ")}
      </td>
      <td className="p-4 text-right">
        <div className="font-bold text-base">₹{product.price.toLocaleString()}</div>
        <div className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</div>
      </td>
      <td className="p-4 text-right">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock === 0 ? "bg-red-50 text-red-600" : product.stock <= 10 ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}>
          {product.stock}
        </span>
      </td>
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <button onClick={onEdit} className="p-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"><Edit2 className="h-4 w-4" /></button>
          <button onClick={onDelete} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"><Trash2 className="h-4 w-4" /></button>
        </div>
      </td>
    </tr>
  );
};

const CategoryCard = ({ category, onDelete, onUpdate }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm group hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          <LayoutGrid className="h-6 w-6" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors"><Edit2 className="h-4 w-4" /></button>
          <button onClick={onDelete} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded text-muted-foreground transition-colors"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <input className="flex-1 px-3 py-1.5 border rounded-md text-sm bg-background" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={() => { onUpdate({name}); setIsEditing(false); }} className="bg-primary text-white p-2 rounded-md hover:bg-primary/90"><Save className="h-4 w-4" /></button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold">{category.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-1 font-mono uppercase tracking-wider">{category.id}</p>
        </>
      )}
    </div>
  );
};

const AddProductModal = ({ categories, onClose, onAdd }: any) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: "PROD-" + Math.floor(1000 + Math.random() * 9000),
    name: "",
    price: 0,
    originalPrice: 0,
    category: categories[0]?.id || "",
    stock: 0,
    rating: 5,
    reviews: 0,
    description: "",
    specifications: {},
    image: "https://placehold.co/600x600/f3f4f6/374151?text=Product+Image",
    images: ["https://placehold.co/600x600/f3f4f6/374151?text=Product+Image"]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const newImage = canvas.toDataURL('image/jpeg', 0.7);

          const currentImages = formData.images || [];
          const isPlaceholder = currentImages.length === 1 && currentImages[0].includes("placehold.co");
          const newImages = isPlaceholder ? [newImage] : [...currentImages, newImage];
          setFormData({ ...formData, image: newImages[0], images: newImages });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, image: newImages[0] || "", images: newImages });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b flex items-center justify-between bg-muted/30">
          <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="text-primary h-5 w-5" strokeWidth={3} /> Add New Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-5 w-5" /></button>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8 overflow-y-auto">
           <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Product Title</label>
                <input className="w-full px-4 py-2.5 border rounded-lg bg-background font-semibold" placeholder="e.g. Hydraulic Pump Assembly" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Category</label>
                <select className="w-full px-4 py-2.5 border rounded-lg bg-background" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Product Images</label>
                <div className="flex flex-col gap-3">
                   <div className="flex flex-wrap gap-2">
                     {(formData.images || []).map((img: string, idx: number) => (
                        <div key={idx} className="relative w-20 h-20 bg-muted rounded-lg border flex items-center justify-center group overflow-hidden">
                           <img src={img} alt="Preview" className="max-h-full max-w-full object-contain" />
                           <button 
                             onClick={() => removeImage(idx)} 
                             className="absolute top-1 right-1 bg-black/50 hover:bg-destructive text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                           >
                             <X className="w-3 h-3" />
                           </button>
                        </div>
                     ))}
                     <label className="w-20 h-20 bg-muted/50 rounded-lg border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                        <Plus className="h-5 w-5 text-muted-foreground mb-1" />
                        <span className="text-[10px] font-bold text-muted-foreground">Add</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                     </label>
                   </div>
                   
                   <input 
                     className="w-full px-3 py-2 border rounded-lg text-[10px] bg-background" 
                     placeholder="Or paste image URL and press Enter..." 
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') {
                         e.preventDefault();
                         const url = e.currentTarget.value;
                         if (url) {
                            const currentImages = formData.images || [];
                            const isPlaceholder = currentImages.length === 1 && currentImages[0].includes("placehold.co");
                            const newImages = isPlaceholder ? [url] : [...currentImages, url];
                            setFormData({ ...formData, image: newImages[0], images: newImages });
                            e.currentTarget.value = "";
                         }
                       }
                     }} 
                   />
                </div>
              </div>
           </div>
           <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Sale Price (₹)</label>
                    <input type="number" className="w-full px-4 py-2.5 border rounded-lg bg-background font-bold text-primary" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">MRP / Original (₹)</label>
                    <input type="number" className="w-full px-4 py-2.5 border rounded-lg bg-background" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})} />
                 </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Initial Stock Level</label>
                <input type="number" className="w-full px-4 py-2.5 border rounded-lg font-bold bg-background" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block tracking-widest">Detailed Description</label>
                <textarea className="w-full px-4 py-2.5 border rounded-lg h-24 resize-none bg-background text-sm" placeholder="Tell customers about this product..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
           </div>
        </div>
        
        <div className="p-6 border-t flex justify-end gap-3 bg-muted/30">
          <button onClick={onClose} className="px-8 py-2.5 rounded-lg border bg-background hover:bg-muted font-bold transition-all">Cancel</button>
          <button 
            disabled={!formData.name}
            onClick={() => onAdd(formData as Product)} 
            className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            Create Product <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AddCategoryModal = ({ onClose, onAdd }: any) => {
  const [name, setName] = useState("");
  
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2"><LayoutGrid className="text-primary h-5 w-5" /> Add Category</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-8">
           <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-widest">Category Name</label>
           <input className="w-full px-4 py-2.5 border rounded-lg bg-background font-semibold" placeholder="e.g. Spare Parts" value={name} onChange={e => setName(e.target.value)} />
           <p className="text-[10px] text-muted-foreground mt-2 italic">A URL-friendly ID will be automatically generated.</p>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 bg-muted/10">
          <button onClick={onClose} className="px-6 py-2 rounded-lg border font-bold">Cancel</button>
          <button 
            disabled={!name}
            onClick={() => onAdd({ id: name.toLowerCase().replace(/ /g, "-"), name, iconName: "LayoutGrid", count: 0 })} 
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md"
          >
            Add Category
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default AdminPage;
