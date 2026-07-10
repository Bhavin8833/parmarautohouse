import { Link } from "react-router-dom";
import { PenTool as Tool, Ruler, Wrench, Settings } from "lucide-react";
import { motion } from "framer-motion";

const ToolsPage = () => {
  const tools = [
    {
      title: "Bearing Size Measurement",
      description: "Find bearing numbers (e.g., 6204, 32210) by entering the inner diameter, outer diameter, and thickness.",
      icon: Ruler,
      link: "/tools/bearing-measurement",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Pulley & Belt Calculators",
      description: "Calculate rotating RPMs or find the exact replacement belt size when swapping a pulley.",
      icon: Settings,
      link: "/tools/pulley-belt",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 mt-16 max-w-6xl min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary rounded-full mb-6 relative">
          <Tool className="h-10 w-10 relative z-10" />
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Tools</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Use our specialized tools to find exactly what you need for your machinery and vehicles.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          const isComingSoon = tool.link === "#";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={tool.link}
                className={`group block p-6 h-full bg-card rounded-2xl border ${isComingSoon ? "border-border/50 opacity-80 cursor-default" : "border-border hover:border-primary/50 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"}`}
                onClick={(e) => isComingSoon && e.preventDefault()}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${tool.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  {tool.title}
                  {isComingSoon && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-muted text-muted-foreground rounded-full">Soon</span>
                  )}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsPage;
