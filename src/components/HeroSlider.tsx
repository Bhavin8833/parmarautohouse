import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder imports - will be replaced by generated images
import img1 from "@/assets/hero_hydraulic.png";
import img2 from "@/assets/hero_tractor.png";
import img3 from "@/assets/hero_bearings.png";
// Fallback if generated images fail (using existing assets for now to prevent build errors)
// import img1 from "@/assets/store-photo.jpg";
// import img2 from "@/assets/Slider-img-1.jpg";
// import img3 from "@/assets/Slider-img-2.jpg";

const slides = [
    {
        id: 1,
        image: img1,
        title: "Premium Hydraulics",
        subtitle: "Engineered for Power",
        description: "High-pressure hoses and precision fittings for heavy-duty industrial applications.",
        link: "/shop?category=hydraulics",
        color: "from-blue-600/20 to-transparent"
    },
    {
        id: 2,
        image: img2,
        title: "Agricultural Excellence",
        subtitle: "Swaraj 724 XM & Attachments",
        description: "Boost your farm's productivity with our top-tier tractor parts and attachments.",
        link: "/shop?category=agriculture",
        color: "from-green-600/20 to-transparent"
    },
    {
        id: 3,
        image: img3,
        title: "Industrial Bearings",
        subtitle: "Smooth Operation",
        description: "Precision-engineered bearings ensuring longevity and efficiency for your machinery.",
        link: "/shop?category=bearings",
        color: "from-orange-600/20 to-transparent"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const duration = 5000; // 5 seconds per slide

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
            setProgress(0);
        }, duration);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + (100 / (duration / 50));
            });
        }, 50);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
    }, [current]);

    const handleManualChange = (index: number) => {
        setCurrent(index);
        setProgress(0);
    };

    return (
        <section className="relative h-[calc(100vh-64px)] min-h-[600px] bg-[#0a0a0a] text-white overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 z-0"
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-radial ${slides[current].color} opacity-30`} />

                    <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center relative z-10">
                        {/* Text Content */}
                        <div className="w-full md:w-1/2 pt-20 md:pt-0 space-y-6 z-20">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-primary font-bold tracking-wider uppercase text-sm"
                            >
                                {slides[current].subtitle}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="font-display font-bold text-5xl md:text-7xl leading-tight"
                            >
                                {slides[current].title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-400 text-lg max-w-md"
                            >
                                {slides[current].description}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-4 pt-4"
                            >
                                <Link to={slides[current].link} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                    Buy now
                                </Link>
                                <Link to="/contact" className="border border-gray-600 px-8 py-3 rounded-full font-bold hover:border-white transition-colors flex items-center gap-2">
                                    Learn more <ChevronRight size={16} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Product Image */}
                        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                src={slides[current].image}
                                alt={slides[current].title}
                                className="max-h-[500px] w-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 left-0 right-0 z-30">
                <div className="container mx-auto px-4 flex justify-center gap-4">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => handleManualChange(index)}
                            className="group relative h-1 w-16 bg-gray-800 rounded-full overflow-hidden transition-all hover:h-2"
                        >
                            <div
                                className={`absolute left-0 top-0 bottom-0 bg-white transition-all duration-100 ${index === current ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                                style={{ width: index === current ? `${progress}%` : "100%" }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
