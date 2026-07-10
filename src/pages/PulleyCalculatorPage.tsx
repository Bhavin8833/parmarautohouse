import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, RotateCw, Wrench, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VisualPulleySystem = ({ driverDia, drivenDia, rpm }: { driverDia: number, drivenDia: number, rpm: number | null }) => {
  const d1 = driverDia || 7;
  const d2 = drivenDia || 9;
  
  const maxD = Math.max(d1, d2, 1);
  const scale = 120 / maxD;
  
  const r1 = (d1 * scale) / 2;
  const r2 = (d2 * scale) / 2;

  const cx1 = 90;
  const cx2 = 270;
  const cy = 100;

  const dist = cx2 - cx1; 
  const angle = Math.asin((r2 - r1) / dist);
  
  const x1_top = cx1 + r1 * Math.sin(angle);
  const y1_top = cy - r1 * Math.cos(angle);
  const x1_bot = cx1 - r1 * Math.sin(angle);
  const y1_bot = cy + r1 * Math.cos(angle);

  const x2_top = cx2 + r2 * Math.sin(angle);
  const y2_top = cy - r2 * Math.cos(angle);
  const x2_bot = cx2 - r2 * Math.sin(angle);
  const y2_bot = cy + r2 * Math.cos(angle);

  const isAnimating = rpm !== null && rpm > 0;
  const driverDuration = 1.5; 
  const drivenDuration = d1 > 0 ? driverDuration * (d2 / d1) : driverDuration;

  return (
    <div className="w-full h-[200px] bg-muted/30 rounded-2xl border border-border shadow-inner flex items-center justify-center overflow-hidden mb-6 relative">
       <svg width="360" height="200" viewBox="0 0 360 200" className="overflow-visible">
          {/* Belt Path */}
          <line x1={x1_top} y1={y1_top} x2={x2_top} y2={y2_top} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1={x1_bot} y1={y1_bot} x2={x2_bot} y2={y2_bot} stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          
          {/* Driver Pulley */}
          <g style={{ transformOrigin: `${cx1}px ${cy}px`, animation: isAnimating ? `spin ${driverDuration}s linear infinite` : 'none' }}>
             <circle cx={cx1} cy={cy} r={r1} fill="#e2e8f0" stroke="#64748b" strokeWidth="4" />
             <circle cx={cx1} cy={cy} r={r1 * 0.15} fill="#334155" />
             <line x1={cx1} y1={cy - r1} x2={cx1} y2={cy + r1} stroke="#94a3b8" strokeWidth="3" />
             <line x1={cx1 - r1} y1={cy} x2={cx1 + r1} y2={cy} stroke="#94a3b8" strokeWidth="3" />
          </g>

          {/* Driven Pulley */}
          <g style={{ transformOrigin: `${cx2}px ${cy}px`, animation: isAnimating ? `spin ${drivenDuration}s linear infinite` : 'none' }}>
             <circle cx={cx2} cy={cy} r={r2} fill="#e2e8f0" stroke="#64748b" strokeWidth="4" />
             <circle cx={cx2} cy={cy} r={r2 * 0.15} fill="#334155" />
             <line x1={cx2} y1={cy - r2} x2={cx2} y2={cy + r2} stroke="#94a3b8" strokeWidth="3" />
             <line x1={cx2 - r2} y1={cy} x2={cx2 + r2} y2={cy} stroke="#94a3b8" strokeWidth="3" />
          </g>
       </svg>
       
       <div className="absolute top-3 left-4 text-xs font-bold text-muted-foreground bg-background/80 px-2 py-1 rounded">Driver: {d1}"</div>
       <div className="absolute top-3 right-4 text-xs font-bold text-muted-foreground bg-background/80 px-2 py-1 rounded">Driven: {d2}"</div>
       
       <style>{`
         @keyframes spin {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
         }
       `}</style>
    </div>
  );
};

const PulleyCalculatorPage = () => {
  // --- RPM Calculator State ---
  const [rpmData, setRpmData] = useState({
    motorRpm: "",
    driverDia: "",
    drivenDia: ""
  });
  const [rpmResult, setRpmResult] = useState<number | null>(null);

  const handleRpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpmData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateRPM = (e: React.FormEvent) => {
    e.preventDefault();
    const r1 = parseFloat(rpmData.motorRpm);
    const d1 = parseFloat(rpmData.driverDia);
    const d2 = parseFloat(rpmData.drivenDia);

    if (r1 > 0 && d1 > 0 && d2 > 0) {
      const r2 = (d1 / d2) * r1;
      setRpmResult(Math.round(r2 * 100) / 100);
    }
  };

  // --- Pulley Size Finder State ---
  const [sizeData, setSizeData] = useState({
    motorRpm: "",
    targetRpm: "",
    knownPulleyType: "driver",
    knownPulleyDia: ""
  });
  const [sizeResult, setSizeResult] = useState<{ dia: number, type: string } | null>(null);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSizeData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const r1 = parseFloat(sizeData.motorRpm);
    const r2 = parseFloat(sizeData.targetRpm);
    const knownDia = parseFloat(sizeData.knownPulleyDia);

    if (r1 > 0 && r2 > 0 && knownDia > 0) {
      if (sizeData.knownPulleyType === "driver") {
        const resultDia = (r1 * knownDia) / r2;
        setSizeResult({ dia: Math.round(resultDia * 100) / 100, type: "driven" });
      } else {
        const resultDia = (r2 * knownDia) / r1;
        setSizeResult({ dia: Math.round(resultDia * 100) / 100, type: "driver" });
      }
    }
  };

  // --- Belt Size Replacer State ---
  const [beltData, setBeltData] = useState({
    driverDia: "",
    oldDrivenDia: "",
    oldBeltLength: "",
    newDrivenDia: ""
  });
  const [beltResult, setBeltResult] = useState<{ length: number, c: number } | null>(null);

  const handleBeltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeltData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateBeltChange = (e: React.FormEvent) => {
    e.preventDefault();
    const d1 = parseFloat(beltData.driverDia);
    const d2_old = parseFloat(beltData.oldDrivenDia);
    const L_old = parseFloat(beltData.oldBeltLength);
    const d2_new = parseFloat(beltData.newDrivenDia);

    if (d1 > 0 && d2_old > 0 && L_old > 0 && d2_new > 0) {
      // 1. Calculate original Center Distance (C)
      // b = 4L - 6.28*(D1+D2)
      const b = 4 * L_old - 6.28 * (d1 + d2_old);
      // C = (b + sqrt(b^2 - 32*(D1-D2)^2)) / 16
      const discriminant = Math.pow(b, 2) - 32 * Math.pow(d1 - d2_old, 2);
      
      if (discriminant < 0) {
         // Impossible geometry (belt too short for the pulleys)
         setBeltResult({ length: -1, c: 0 });
         return;
      }

      const c = (b + Math.sqrt(discriminant)) / 16;

      // 2. Calculate New Belt Length (L_new) with new driven pulley Dia (d2_new)
      // L = 2C + 1.57*(D1+D2_new) + (D2_new - D1)^2 / (4C)
      const L_new = 2 * c + 1.57 * (d1 + d2_new) + Math.pow(d2_new - d1, 2) / (4 * c);

      setBeltResult({ 
         length: Math.round(L_new * 10) / 10, // round to 1 decimal
         c: Math.round(c * 100) / 100 
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-16 max-w-4xl">
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
          <RotateCw className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
          Pulley & Belt Calculators
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Easily calculate running RPMs or figure out the exact replacement belt size when swapping pulleys.
        </p>
      </motion.div>

      <Tabs defaultValue="size" className="w-full">
        <TabsList className="flex flex-col md:flex-row w-full mb-8 h-auto bg-muted p-1 rounded-lg md:rounded-md">
          <TabsTrigger value="rpm" className="text-base font-medium flex-1 py-3 md:py-2">RPM Calculator</TabsTrigger>
          <TabsTrigger value="size" className="text-base font-medium flex-1 py-3 md:py-2">Pulley Size Finder</TabsTrigger>
          <TabsTrigger value="belt" className="text-base font-medium flex-1 py-3 md:py-2">Belt Size Replacer</TabsTrigger>
        </TabsList>

        {/* RPM CALCULATOR TAB */}
        <TabsContent value="rpm" className="mt-0">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm relative overflow-hidden group"
            >
              <form onSubmit={calculateRPM} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="motorRpm" className="text-sm font-semibold">Motor RPM (Speed)</Label>
                    <Input id="motorRpm" name="motorRpm" type="number" step="0.1" placeholder="e.g. 2500" value={rpmData.motorRpm} onChange={handleRpmChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverDia" className="text-sm font-semibold">Driver Pulley Size (Motor side)</Label>
                    <Input id="driverDia" name="driverDia" type="number" step="0.1" placeholder="e.g. 7 (inches or mm)" value={rpmData.driverDia} onChange={handleRpmChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drivenDia" className="text-sm font-semibold">Driven Pulley Size (Machine side)</Label>
                    <Input id="drivenDia" name="drivenDia" type="number" step="0.1" placeholder="e.g. 9 (inches or mm)" value={rpmData.drivenDia} onChange={handleRpmChange} required />
                  </div>
                </div>

                <Button type="submit" className="w-full text-md" size="lg">
                  <Calculator className="h-5 w-5 mr-2" /> Calculate RPM
                </Button>
              </form>
            </motion.div>

            <AnimatePresence mode="wait">
                 <motion.div
                   key="rpm-result"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col h-full"
                 >
                    <VisualPulleySystem 
                      driverDia={parseFloat(rpmData.driverDia) || 7} 
                      drivenDia={parseFloat(rpmData.drivenDia) || 9} 
                      rpm={rpmResult} 
                    />
                    
                    {rpmResult !== null ? (
                      <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 flex flex-col items-center justify-center flex-grow text-center">
                        <h3 className="text-xl font-medium text-muted-foreground mb-4">Final Machine Speed</h3>
                        <div className="text-5xl font-bold text-primary mb-2">{rpmResult}</div>
                        <div className="text-lg font-semibold uppercase tracking-widest text-primary/80">RPM</div>
                        <p className="mt-6 text-sm text-muted-foreground px-4">
                          Based on a {rpmData.driverDia}" driver pulley turning a {rpmData.drivenDia}" driven pulley at {rpmData.motorRpm} RPM.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-8 rounded-2xl border border-border flex flex-col items-center justify-center flex-grow text-center text-muted-foreground">
                        Enter your measurements to calculate RPM.
                      </div>
                    )}
                 </motion.div>
            </AnimatePresence>
          </div>
        </TabsContent>
        {/* PULLEY SIZE FINDER TAB */}
        <TabsContent value="size" className="mt-0">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm relative overflow-hidden group"
            >
              <form onSubmit={calculateSize} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="sizeMotorRpm" className="text-sm font-semibold">Motor RPM (Speed)</Label>
                     <Input id="sizeMotorRpm" name="motorRpm" type="number" step="0.1" placeholder="e.g. 1440" value={sizeData.motorRpm} onChange={handleSizeChange} required />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="targetRpm" className="text-sm font-semibold">Target Output RPM</Label>
                     <Input id="targetRpm" name="targetRpm" type="number" step="0.1" placeholder="e.g. 2100" value={sizeData.targetRpm} onChange={handleSizeChange} required />
                  </div>
                  <div className="h-px bg-border w-full my-4" />
                  <div className="space-y-2">
                     <Label htmlFor="knownPulleyType" className="text-sm font-semibold">I currently know my:</Label>
                     <select id="knownPulleyType" name="knownPulleyType" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={sizeData.knownPulleyType} onChange={handleSizeChange}>
                        <option value="driver">Driver Pulley Size (Motor Side)</option>
                        <option value="driven">Driven Pulley Size (Machine Side)</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="knownPulleyDia" className="text-sm font-semibold">
                        {sizeData.knownPulleyType === "driver" ? "Driver Pulley Size (in/mm)" : "Driven Pulley Size (in/mm)"}
                     </Label>
                     <Input id="knownPulleyDia" name="knownPulleyDia" type="number" step="0.1" placeholder={sizeData.knownPulleyType === "driver" ? "e.g. 5" : "e.g. 8"} value={sizeData.knownPulleyDia} onChange={handleSizeChange} required />
                  </div>
                </div>

                <Button type="submit" className="w-full text-md" size="lg">
                  <Calculator className="h-5 w-5 mr-2" /> Find Missing Pulley Size
                </Button>
              </form>
            </motion.div>

            <AnimatePresence mode="wait">
                 <motion.div
                   key="size-result"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col h-full"
                 >
                    <VisualPulleySystem 
                      driverDia={sizeResult ? (sizeResult.type === "driver" ? sizeResult.dia : parseFloat(sizeData.knownPulleyDia)) : 5} 
                      drivenDia={sizeResult ? (sizeResult.type === "driven" ? sizeResult.dia : parseFloat(sizeData.knownPulleyDia)) : 8} 
                      rpm={sizeResult ? parseFloat(sizeData.targetRpm) : null} 
                    />
                    
                    {sizeResult !== null ? (
                      <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 flex flex-col items-center justify-center flex-grow text-center">
                        <h3 className="text-xl font-medium text-muted-foreground mb-4">Required {sizeResult.type === "driver" ? "Driver" : "Driven"} Pulley Size</h3>
                        <div className="text-5xl font-bold text-primary mb-2">{sizeResult.dia}</div>
                        <div className="text-lg font-semibold uppercase tracking-widest text-primary/80">Inches / mm</div>
                        <p className="mt-6 text-sm text-muted-foreground px-4">
                          To get {sizeData.targetRpm} RPM from a {sizeData.motorRpm} RPM motor using a {sizeData.knownPulleyDia}" {sizeData.knownPulleyType} pulley, you need a <strong>{sizeResult.dia}" {sizeResult.type} pulley</strong>.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-8 rounded-2xl border border-border flex flex-col items-center justify-center flex-grow text-center text-muted-foreground">
                        Enter your motor RPM, target RPM, and known pulley size to find the required missing pulley size.
                      </div>
                    )}
                 </motion.div>
            </AnimatePresence>
          </div>
        </TabsContent>


        {/* BELT SIZE REPLACER TAB */}
        <TabsContent value="belt" className="mt-0">
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm space-y-6"
            >
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <Wrench className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use this when you want to change the size of one pulley and need to know the exact new V-Belt size to buy without changing the motor's position!
                </p>
              </div>

              <form onSubmit={calculateBeltChange} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">Constant Variables</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="driverDia" className="text-xs text-muted-foreground">Driver Pulley Size (in)</Label>
                        <Input id="driverDia" name="driverDia" type="number" step="0.1" placeholder="e.g. 7" value={beltData.driverDia} onChange={handleBeltChange} required />
                      </div>
                      <div>
                        <Label htmlFor="oldBeltLength" className="text-xs text-muted-foreground">Original Belt Length (in)</Label>
                        <Input id="oldBeltLength" name="oldBeltLength" type="number" step="0.1" placeholder="e.g. 68" value={beltData.oldBeltLength} onChange={handleBeltChange} required />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border w-full my-4" />

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">The Modification</Label>
                    <div className="grid grid-cols-2 gap-4 items-end">
                      <div>
                        <Label htmlFor="oldDrivenDia" className="text-xs text-muted-foreground relative">
                          Old Driven Pulley (in)
                          <div className="absolute right-[-14px] top-[30px] z-10 hidden sm:block">
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Label>
                        <Input id="oldDrivenDia" name="oldDrivenDia" type="number" step="0.1" placeholder="e.g. 9" value={beltData.oldDrivenDia} onChange={handleBeltChange} required />
                      </div>
                      <div>
                        <Label htmlFor="newDrivenDia" className="text-xs text-primary font-bold">New Driven Pulley (in)</Label>
                        <Input id="newDrivenDia" name="newDrivenDia" type="number" step="0.1" placeholder="e.g. 12" value={beltData.newDrivenDia} onChange={handleBeltChange} required 
                           className="border-primary/50 focus-visible:ring-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full text-md" size="lg">
                  <Calculator className="h-5 w-5 mr-2" /> Find New Belt Size
                </Button>
              </form>
            </motion.div>

            <AnimatePresence mode="wait">
                 <motion.div
                   key="belt-result"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col h-full"
                 >
                    <VisualPulleySystem 
                      driverDia={parseFloat(beltData.driverDia) || 7} 
                      drivenDia={parseFloat(beltData.newDrivenDia) || parseFloat(beltData.oldDrivenDia) || 9} 
                      rpm={beltResult ? 1000 : null} 
                    />

                    {beltResult !== null ? (
                      <div className={`p-8 rounded-2xl flex-grow border flex flex-col items-center justify-center text-center ${beltResult.length === -1 ? 'bg-destructive/5 border-destructive/20' : 'bg-green-500/5 border-green-500/20'}`}>
                        {beltResult.length === -1 ? (
                           <>
                              <h3 className="text-xl font-medium text-destructive mb-4">Impossible Geometry</h3>
                              <p className="text-muted-foreground">The original belt length provided is too short to even wrap around those original pulleys. Please check your measurements!</p>
                           </>
                        ) : (
                           <>
                              <h3 className="text-lg font-medium text-muted-foreground mb-4">Required New Belt Size</h3>
                              <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-2">{beltResult.length}"</div>
                              <div className="text-sm font-semibold uppercase tracking-widest text-green-600/80 mb-6">Inches (Outside Circumference)</div>
                              
                              <div className="bg-background/80 p-4 rounded-lg w-full text-left border border-border relative overflow-hidden">
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                 <p className="text-sm font-semibold mb-1">Calculated Center Distance:</p>
                                 <p className="text-2xl font-bold text-foreground">{beltResult.c}" <span className="text-xs font-normal text-muted-foreground">(remains unchanged)</span></p>
                              </div>
                              
                              <p className="mt-4 text-xs text-muted-foreground text-center">
                                When buying a V-belt, look for a size nearest to {beltResult.length}". E.g., if it's 73", look for a B70 or B71 (since B-section belt pitch lengths differ from outer by roughly 2-3 inches).
                              </p>
                           </>
                        )}
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-8 flex-grow rounded-2xl border border-border flex flex-col items-center justify-center text-center text-muted-foreground">
                        Enter your measurements to calculate new belt length.
                      </div>
                    )}
                 </motion.div>
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PulleyCalculatorPage;
