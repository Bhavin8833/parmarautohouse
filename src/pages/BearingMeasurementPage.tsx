import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Subscript as Script, PenTool as Tool, Ruler, Disc, AlertCircle, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Comprehensive sample database of bearing dimensions
const bearingDB = [
  // Deep Groove Ball Bearings - 600 Miniature Series
  { number: "603", id: 3, od: 9, th: 3, type: "Deep Groove Ball Bearing" },
  { number: "604", id: 4, od: 12, th: 4, type: "Deep Groove Ball Bearing" },
  { number: "605", id: 5, od: 14, th: 5, type: "Deep Groove Ball Bearing" },
  { number: "606", id: 6, od: 17, th: 6, type: "Deep Groove Ball Bearing" },
  { number: "607", id: 7, od: 19, th: 6, type: "Deep Groove Ball Bearing" },
  { number: "608", id: 8, od: 22, th: 7, type: "Deep Groove Ball Bearing" },
  { number: "609", id: 9, od: 24, th: 7, type: "Deep Groove Ball Bearing" },

  // Deep Groove Ball Bearings - 6000 Series
  { number: "6000", id: 10, od: 26, th: 8, type: "Deep Groove Ball Bearing" },
  { number: "6001", id: 12, od: 28, th: 8, type: "Deep Groove Ball Bearing" },
  { number: "6002", id: 15, od: 32, th: 9, type: "Deep Groove Ball Bearing" },
  { number: "6003", id: 17, od: 35, th: 10, type: "Deep Groove Ball Bearing" },
  { number: "6004", id: 20, od: 42, th: 12, type: "Deep Groove Ball Bearing" },
  { number: "6005", id: 25, od: 47, th: 12, type: "Deep Groove Ball Bearing" },
  { number: "6006", id: 30, od: 55, th: 13, type: "Deep Groove Ball Bearing" },
  { number: "6007", id: 35, od: 62, th: 14, type: "Deep Groove Ball Bearing" },
  { number: "6008", id: 40, od: 68, th: 15, type: "Deep Groove Ball Bearing" },
  { number: "6009", id: 45, od: 75, th: 16, type: "Deep Groove Ball Bearing" },
  { number: "6010", id: 50, od: 80, th: 16, type: "Deep Groove Ball Bearing" },
  
  // Deep Groove Ball Bearings - 6200 Series
  { number: "6200", id: 10, od: 30, th: 9, type: "Deep Groove Ball Bearing" },
  { number: "6201", id: 12, od: 32, th: 10, type: "Deep Groove Ball Bearing" },
  { number: "6202", id: 15, od: 35, th: 11, type: "Deep Groove Ball Bearing" },
  { number: "6203", id: 17, od: 40, th: 12, type: "Deep Groove Ball Bearing" },
  { number: "6204", id: 20, od: 47, th: 14, type: "Deep Groove Ball Bearing" },
  { number: "6205", id: 25, od: 52, th: 15, type: "Deep Groove Ball Bearing" },
  { number: "6206", id: 30, od: 62, th: 16, type: "Deep Groove Ball Bearing" },
  { number: "6207", id: 35, od: 72, th: 17, type: "Deep Groove Ball Bearing" },
  { number: "6208", id: 40, od: 80, th: 18, type: "Deep Groove Ball Bearing" },
  { number: "6209", id: 45, od: 85, th: 19, type: "Deep Groove Ball Bearing" },
  { number: "6210", id: 50, od: 90, th: 20, type: "Deep Groove Ball Bearing" },
  { number: "6211", id: 55, od: 100, th: 21, type: "Deep Groove Ball Bearing" },
  { number: "6212", id: 60, od: 110, th: 22, type: "Deep Groove Ball Bearing" },
  { number: "6213", id: 65, od: 120, th: 23, type: "Deep Groove Ball Bearing" },
  { number: "6214", id: 70, od: 125, th: 24, type: "Deep Groove Ball Bearing" },
  { number: "6215", id: 75, od: 130, th: 25, type: "Deep Groove Ball Bearing" },
  
  // Deep Groove Ball Bearings - 6300 Series
  { number: "6300", id: 10, od: 35, th: 11, type: "Deep Groove Ball Bearing" },
  { number: "6301", id: 12, od: 37, th: 12, type: "Deep Groove Ball Bearing" },
  { number: "6302", id: 15, od: 42, th: 13, type: "Deep Groove Ball Bearing" },
  { number: "6303", id: 17, od: 47, th: 14, type: "Deep Groove Ball Bearing" },
  { number: "6304", id: 20, od: 52, th: 15, type: "Deep Groove Ball Bearing" },
  { number: "6305", id: 25, od: 62, th: 17, type: "Deep Groove Ball Bearing" },
  { number: "6306", id: 30, od: 72, th: 19, type: "Deep Groove Ball Bearing" },
  { number: "6307", id: 35, od: 80, th: 21, type: "Deep Groove Ball Bearing" },
  { number: "6308", id: 40, od: 90, th: 23, type: "Deep Groove Ball Bearing" },
  { number: "6309", id: 45, od: 100, th: 25, type: "Deep Groove Ball Bearing" },
  { number: "6310", id: 50, od: 110, th: 27, type: "Deep Groove Ball Bearing" },
  { number: "6311", id: 55, od: 120, th: 29, type: "Deep Groove Ball Bearing" },
  { number: "6312", id: 60, od: 130, th: 31, type: "Deep Groove Ball Bearing" },
  { number: "6313", id: 65, od: 140, th: 33, type: "Deep Groove Ball Bearing" },
  { number: "6314", id: 70, od: 150, th: 35, type: "Deep Groove Ball Bearing" },
  { number: "6315", id: 75, od: 160, th: 37, type: "Deep Groove Ball Bearing" },

  // Deep Groove Ball Bearings - 6800 Series (Thin Section)
  { number: "6800", id: 10, od: 19, th: 5, type: "Deep Groove Ball Bearing" },
  { number: "6801", id: 12, od: 21, th: 5, type: "Deep Groove Ball Bearing" },
  { number: "6802", id: 15, od: 24, th: 5, type: "Deep Groove Ball Bearing" },
  { number: "6803", id: 17, od: 26, th: 5, type: "Deep Groove Ball Bearing" },
  { number: "6804", id: 20, od: 32, th: 7, type: "Deep Groove Ball Bearing" },
  { number: "6805", id: 25, od: 37, th: 7, type: "Deep Groove Ball Bearing" },

  // Deep Groove Ball Bearings - 6900 Series (Thin Section)
  { number: "6900", id: 10, od: 22, th: 6, type: "Deep Groove Ball Bearing" },
  { number: "6901", id: 12, od: 24, th: 6, type: "Deep Groove Ball Bearing" },
  { number: "6902", id: 15, od: 28, th: 7, type: "Deep Groove Ball Bearing" },
  { number: "6903", id: 17, od: 30, th: 7, type: "Deep Groove Ball Bearing" },
  { number: "6904", id: 20, od: 37, th: 9, type: "Deep Groove Ball Bearing" },
  { number: "6905", id: 25, od: 42, th: 9, type: "Deep Groove Ball Bearing" },

  // Tapered Roller Bearings - 30200 Series
  { number: "30202", id: 15, od: 35, th: 11.75, type: "Tapered Roller Bearing" },
  { number: "30203", id: 17, od: 40, th: 13.25, type: "Tapered Roller Bearing" },
  { number: "30204", id: 20, od: 47, th: 15.25, type: "Tapered Roller Bearing" },
  { number: "30205", id: 25, od: 52, th: 16.25, type: "Tapered Roller Bearing" },
  { number: "30206", id: 30, od: 62, th: 17.25, type: "Tapered Roller Bearing" },
  { number: "30207", id: 35, od: 72, th: 18.25, type: "Tapered Roller Bearing" },
  { number: "30208", id: 40, od: 80, th: 19.75, type: "Tapered Roller Bearing" },
  { number: "30209", id: 45, od: 85, th: 20.75, type: "Tapered Roller Bearing" },
  { number: "30210", id: 50, od: 90, th: 21.75, type: "Tapered Roller Bearing" },
  { number: "30211", id: 55, od: 100, th: 22.75, type: "Tapered Roller Bearing" },
  { number: "30212", id: 60, od: 110, th: 23.75, type: "Tapered Roller Bearing" },
  { number: "30213", id: 65, od: 120, th: 24.75, type: "Tapered Roller Bearing" },
  { number: "30214", id: 70, od: 125, th: 26.25, type: "Tapered Roller Bearing" },

  // Tapered Roller Bearings - 32200 Series
  { number: "32204", id: 20, od: 47, th: 19.25, type: "Tapered Roller Bearing" },
  { number: "32205", id: 25, od: 52, th: 19.25, type: "Tapered Roller Bearing" },
  { number: "32206", id: 30, od: 62, th: 21.25, type: "Tapered Roller Bearing" },
  { number: "32207", id: 35, od: 72, th: 24.25, type: "Tapered Roller Bearing" },
  { number: "32208", id: 40, od: 80, th: 24.75, type: "Tapered Roller Bearing" },
  { number: "32209", id: 45, od: 85, th: 24.75, type: "Tapered Roller Bearing" },
  { number: "32210", id: 50, od: 90, th: 24.75, type: "Tapered Roller Bearing" },
  { number: "32211", id: 55, od: 100, th: 26.75, type: "Tapered Roller Bearing" },
  { number: "32212", id: 60, od: 110, th: 29.75, type: "Tapered Roller Bearing" },
  { number: "32213", id: 65, od: 120, th: 32.75, type: "Tapered Roller Bearing" },
  { number: "32214", id: 70, od: 125, th: 33.25, type: "Tapered Roller Bearing" },
  { number: "32215", id: 75, od: 130, th: 33.25, type: "Tapered Roller Bearing" },
  { number: "32216", id: 80, od: 140, th: 35.25, type: "Tapered Roller Bearing" },
  { number: "32217", id: 85, od: 150, th: 38.5, type: "Tapered Roller Bearing" },
  { number: "32218", id: 90, od: 160, th: 42.5, type: "Tapered Roller Bearing" },

  // Tapered Roller Bearings - 32300 Series
  { number: "32304", id: 20, od: 52, th: 22.25, type: "Tapered Roller Bearing" },
  { number: "32305", id: 25, od: 62, th: 25.25, type: "Tapered Roller Bearing" },
  { number: "32306", id: 30, od: 72, th: 28.75, type: "Tapered Roller Bearing" },
  { number: "32307", id: 35, od: 80, th: 32.75, type: "Tapered Roller Bearing" },
  { number: "32308", id: 40, od: 90, th: 35.25, type: "Tapered Roller Bearing" },
  { number: "32309", id: 45, od: 100, th: 38.25, type: "Tapered Roller Bearing" },
  { number: "32310", id: 50, od: 110, th: 42.25, type: "Tapered Roller Bearing" },

  // Agricultural/Pillow Block Insert Bearings - UC Series
  { number: "UC201", id: 12, od: 47, th: 31, type: "Insert Ball Bearing" },
  { number: "UC202", id: 15, od: 47, th: 31, type: "Insert Ball Bearing" },
  { number: "UC203", id: 17, od: 47, th: 31, type: "Insert Ball Bearing" },
  { number: "UC204", id: 20, od: 47, th: 31, type: "Insert Ball Bearing" },
  { number: "UC205", id: 25, od: 52, th: 34.1, type: "Insert Ball Bearing" },
  { number: "UC206", id: 30, od: 62, th: 38.1, type: "Insert Ball Bearing" },
  { number: "UC207", id: 35, od: 72, th: 42.9, type: "Insert Ball Bearing" },
  { number: "UC208", id: 40, od: 80, th: 49.2, type: "Insert Ball Bearing" },
  { number: "UC209", id: 45, od: 85, th: 49.2, type: "Insert Ball Bearing" },
  { number: "UC210", id: 50, od: 90, th: 51.6, type: "Insert Ball Bearing" },
  { number: "UC211", id: 55, od: 100, th: 55.6, type: "Insert Ball Bearing" },
  { number: "UC212", id: 60, od: 110, th: 65.1, type: "Insert Ball Bearing" },
  { number: "UC213", id: 65, od: 120, th: 65.1, type: "Insert Ball Bearing" },

  // Angular Contact Bearings - 7200 Series
  { number: "7200", id: 10, od: 30, th: 9, type: "Angular Contact Bearing" },
  { number: "7201", id: 12, od: 32, th: 10, type: "Angular Contact Bearing" },
  { number: "7202", id: 15, od: 35, th: 11, type: "Angular Contact Bearing" },
  { number: "7203", id: 17, od: 40, th: 12, type: "Angular Contact Bearing" },
  { number: "7204", id: 20, od: 47, th: 14, type: "Angular Contact Bearing" },
  { number: "7205", id: 25, od: 52, th: 15, type: "Angular Contact Bearing" },

  // Angular Contact Bearings - 7300 Series
  { number: "7303", id: 17, od: 47, th: 14, type: "Angular Contact Bearing" },
  { number: "7304", id: 20, od: 52, th: 15, type: "Angular Contact Bearing" },
  { number: "7305", id: 25, od: 62, th: 17, type: "Angular Contact Bearing" },
  { number: "7306", id: 30, od: 72, th: 19, type: "Angular Contact Bearing" },
  { number: "7307", id: 35, od: 80, th: 21, type: "Angular Contact Bearing" }
];

interface SearchResult {
  exact: any[];
  around: any[];
}

const BearingMeasurementPage = () => {
  const [formData, setFormData] = useState({
    number: "",
    id: "",
    od: "",
    th: "",
    type: "All"
  });

  const [result, setResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);

    setTimeout(() => {
      const inputId = formData.id ? parseFloat(formData.id) : null;
      const inputOd = formData.od ? parseFloat(formData.od) : null;
      const inputTh = formData.th ? parseFloat(formData.th) : null;

      // Filter exact matches based on provided criteria
      const exactMatches = bearingDB.filter((b) => {
        const numberMatch = !formData.number || b.number.toLowerCase() === formData.number.toLowerCase().trim();
        const idMatch = inputId === null || b.id === inputId;
        const odMatch = inputOd === null || b.od === inputOd;
        const thMatch = inputTh === null || b.th === inputTh;
        const typeMatch = formData.type === "All" || b.type === formData.type;

        return numberMatch && idMatch && odMatch && thMatch && typeMatch;
      });

      let aroundMatches: any[] = [];

      // If no exact match but we have some dimensional input and no number input, suggest closest available sizes
      if (exactMatches.length === 0 && !formData.number && (inputId !== null || inputOd !== null || inputTh !== null)) {
        const typeFiltered = bearingDB.filter(b => formData.type === "All" || b.type === formData.type);
        
        const scoredMatches = typeFiltered.map(b => {
          let dist = 0;
          if (inputId !== null) dist += Math.abs(b.id - inputId) * 1.5; // weight ID higher
          if (inputOd !== null) dist += Math.abs(b.od - inputOd);
          if (inputTh !== null) dist += Math.abs(b.th - inputTh);
          return { ...b, dist };
        });

        // Lowest distance first
        scoredMatches.sort((a, b) => a.dist - b.dist);
        
        // Take up to 4 closest matching
        aroundMatches = scoredMatches.slice(0, 4);
      }

      setResult({
        exact: exactMatches,
        around: aroundMatches
      });
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16 max-w-5xl">
      <Link
        to="/tools"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tools
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
          <Ruler className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
          Bearing Size Measurement
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Enter your bearing dimensions below. We'll find exact matches or suggest the closest standard sizes.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-500" />
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number" className="text-sm font-semibold flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />Bearing Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  type="text"
                  placeholder="e.g. 6204 (Optional)"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="bg-background/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-wider font-semibold">OR DIMENSIONS</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id" className="text-sm font-semibold flex items-center gap-2">
                  <Disc className="h-4 w-4 text-primary" />Inner Diameter (ID) in mm
                </Label>
                <Input
                  id="id"
                  name="id"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 50"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="bg-background/50 focus:bg-background transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="od" className="text-sm font-semibold flex items-center gap-2">
                  <Disc className="h-4 w-4 text-primary" />Outer Diameter (OD) in mm
                </Label>
                <Input
                  id="od"
                  name="od"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 110"
                  value={formData.od}
                  onChange={handleInputChange}
                  className="bg-background/50 focus:bg-background transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="th" className="text-sm font-semibold flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-primary" />Thickness / Width (B) in mm
                </Label>
                <Input
                  id="th"
                  name="th"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 27"
                  value={formData.th}
                  onChange={handleInputChange}
                  className="bg-background/50 focus:bg-background transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-semibold flex items-center gap-2">
                  <Tool className="h-4 w-4 text-primary" />Bearing Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, type: val }))}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Deep Groove Ball Bearing">Deep Groove Ball Bearing</SelectItem>
                    <SelectItem value="Tapered Roller Bearing">Tapered Roller Bearing</SelectItem>
                    <SelectItem value="Angular Contact Bearing">Angular Contact Bearing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-md font-semibold relative overflow-hidden group"
              disabled={isSearching}
              size="lg"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Calculating...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Bearing Number
                </span>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Results / Image Section */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="flex flex-col gap-6"
        >
          {/* Output Results */}
          <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0 pointer-events-none" />
             
             <div className="z-10 w-full">
                <AnimatePresence mode="wait">
                  {result === null && !isSearching && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-muted-foreground flex flex-col items-center gap-3 py-6"
                    >
                      <Search className="h-8 w-8 opacity-20" />
                      <p>Enter dimensions and search to find matching bearings.</p>
                    </motion.div>
                  )}

                  {isSearching && (
                    <motion.div
                      key="searching"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <div className="absolute inset-4 rounded-full border-4 border-primary-hover border-b-transparent animate-spin-reverse delay-150" />
                      </div>
                      <p className="mt-4 text-sm text-primary font-medium animate-pulse">Scanning database...</p>
                    </motion.div>
                  )}

                  {/* Rendering Exact Matches */}
                  {result !== null && !isSearching && result.exact.length > 0 && (
                    <motion.div
                      key="exact-match"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-center border-b border-border pb-2 mb-4">Exact Match Found</h3>
                      {result.exact.slice(0, 5).map((b, idx) => (
                        <div 
                           key={idx}
                           className="bg-background rounded-xl p-4 border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl font-bold text-primary">{b.number}</span>
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-medium">
                                  {b.type}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground font-medium">
                                ID: {b.id}mm • OD: {b.od}mm • Th: {b.th}mm
                              </p>
                           </div>
                           <Button size="sm" variant="outline" asChild className="shrink-0">
                             <Link to={`/shop?search=${b.number}`}>
                               View in Shop
                             </Link>
                           </Button>
                        </div>
                      ))}
                      {result.exact.length > 5 && (
                        <p className="text-xs text-center text-muted-foreground">Showing top 5 exact matches. Refine type for specific series.</p>
                      )}
                    </motion.div>
                  )}

                  {/* Rendering Around (Nearest) Matches */}
                  {result !== null && !isSearching && result.exact.length === 0 && (
                    <motion.div
                      key="around-match"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {result.around.length > 0 ? (
                        <>
                          <div className="text-center py-2 mb-2">
                             <div className="inline-flex bg-amber-500/10 text-amber-500 p-2 rounded-full mb-2">
                               <AlertCircle className="h-5 w-5" />
                             </div>
                             <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400">No Exact Match</h3>
                             <p className="text-sm font-medium text-muted-foreground">We found these closest standard sizes:</p>
                          </div>
                          
                          <div className="space-y-3">
                            {result.around.map((b, idx) => (
                              <div 
                                key={idx}
                                className="bg-background rounded-xl p-3 border border-amber-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden"
                              >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/40" />
                                <div className="pl-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <span className="text-xl font-bold text-foreground">{b.number}</span>
                                      <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded font-medium">
                                        {b.type}
                                      </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                      ID: {b.id}mm • OD: {b.od}mm • Th: {b.th}mm
                                    </p>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 text-xs shrink-0" asChild>
                                  <Link to={`/shop?search=${b.number}`}>View</Link>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-6">
                           <div className="inline-flex bg-destructive/10 text-destructive p-3 rounded-full mb-3">
                             <ArrowLeft className="h-6 w-6 rotate-45" />
                           </div>
                           <p className="font-medium">No matches found.</p>
                           <p className="text-sm text-muted-foreground mt-1">Try adjusting the dimensions or type.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Reference Image Container with Animation */}
          <Dialog>
            <DialogTrigger asChild>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm flex items-center justify-center p-6 aspect-video relative group h-[220px] cursor-zoom-in"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <motion.img 
                  key={formData.type}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={
                    formData.type === "Tapered Roller Bearing" ? "/tapered_bearing.png" : 
                    formData.type === "Angular Contact Bearing" ? "/angular_contact_bearing.png" : 
                    "/bearing_drawing.png"
                  } 
                  alt={`${formData.type === "All" ? "Standard" : formData.type} Technical Reference`} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="h-4 w-4" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Reference Drawing: {formData.type === "All" ? "General" : formData.type}
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-1 flex items-center justify-center border-none shadow-2xl bg-white/95 backdrop-blur-md">
              <img 
                key={formData.type}
                src={
                  formData.type === "Tapered Roller Bearing" ? "/tapered_bearing.png" : 
                  formData.type === "Angular Contact Bearing" ? "/angular_contact_bearing.png" : 
                  "/bearing_drawing.png"
                } 
                alt={`${formData.type === "All" ? "Standard" : formData.type} Technical Reference Fullscreen`} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
};

export default BearingMeasurementPage;
