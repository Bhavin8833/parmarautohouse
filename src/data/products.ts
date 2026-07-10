import pipeImg from "@/assets/products/pipe.png";
import rotavatorImg from "@/assets/products/rotavator.png";
import universalJointImg from "@/assets/products/universal-joint.png";
import ballBearingImg from "@/assets/products/ball-bearing.png";
import pillowBearingImg from "@/assets/products/pillow-bearing.png";
import boltImg from "@/assets/products/bolt.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string; // Keep as primary image for backward compatibility
  images?: string[]; // Allow multiple images
  category: string;
  rating: number;
  reviews: number;
  description: string;
  specifications: Record<string, string>;
  featured?: boolean;
  bestSeller?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Store name as string for serialization
  count: number;
}

export const categories: Category[] = [
  { id: "bearings", name: "Bearings", iconName: "Disc", count: 45 },
  { id: "pipes-hoses", name: "Pipes & Hoses", iconName: "Cable", count: 32 },
  { id: "bolts-nuts", name: "Bolts & Nuts", iconName: "Hexagon", count: 120 },
  { id: "farm-equipment", name: "Farm Equipment", iconName: "Tractor", count: 28 },
  { id: "joints", name: "Joints & Couplings", iconName: "Link", count: 56 },
  { id: "engine-parts", name: "Engine Parts", iconName: "Car", count: 78 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Hydraulic Hose Pipe Assembly",
    price: 850,
    originalPrice: 1200,
    image: pipeImg,
    category: "pipes-hoses",
    rating: 4.5,
    reviews: 128,
    description: "Premium quality hydraulic hose pipe assembly for heavy-duty applications. Suitable for tractors, JCBs, and industrial machinery.",
    specifications: { "Material": "Synthetic Rubber", "Pressure Rating": "250 Bar", "Temperature Range": "-40°C to 100°C", "Length": "1 Meter" },
    featured: true,
    bestSeller: true,
    stock: 25,
  },
  {
    id: "2",
    name: "Rotavator - Heavy Duty",
    price: 45000,
    originalPrice: 55000,
    image: rotavatorImg,
    category: "farm-equipment",
    rating: 4.8,
    reviews: 64,
    description: "Heavy-duty rotavator for efficient soil preparation. Compatible with most tractor models.",
    specifications: { "Working Width": "5 Feet", "Blades": "36 Pieces", "HP Range": "35-55 HP", "Weight": "320 Kg" },
    featured: true,
    stock: 5,
  },
  {
    id: "3",
    name: "Universal Joint Cross",
    price: 320,
    originalPrice: 450,
    image: universalJointImg,
    category: "joints",
    rating: 4.3,
    reviews: 256,
    description: "High-quality universal joint cross bearing for drive shafts. Precision engineered for smooth power transmission.",
    specifications: { "Material": "Chrome Steel", "Cap Diameter": "27mm", "Overall Length": "74.6mm", "Grease Fitting": "Yes" },
    bestSeller: true,
    stock: 150,
  },
  {
    id: "4",
    name: "Deep Groove Ball Bearing 6205",
    price: 180,
    originalPrice: 280,
    image: ballBearingImg,
    category: "bearings",
    rating: 4.7,
    reviews: 342,
    description: "Premium deep groove ball bearing suitable for high-speed applications. Low noise and vibration operation.",
    specifications: { "Inner Diameter": "25mm", "Outer Diameter": "52mm", "Width": "15mm", "Max Speed": "15000 RPM" },
    featured: true,
    bestSeller: true,
    stock: 85,
  },
  {
    id: "5",
    name: "Pillow Block Bearing UCP205",
    price: 450,
    originalPrice: 650,
    image: pillowBearingImg,
    category: "bearings",
    rating: 4.6,
    reviews: 189,
    description: "Cast iron pillow block bearing unit with set screw locking. Ideal for conveyor systems and agricultural machinery.",
    specifications: { "Bore Size": "25mm", "Housing Material": "Cast Iron", "Seal Type": "Double Lip", "Lubrication": "Pre-greased" },
    featured: true,
    stock: 42,
  },
  {
    id: "6",
    name: "Hex Bolt & Nut Set (M10)",
    price: 15,
    originalPrice: 25,
    image: boltImg,
    category: "bolts-nuts",
    rating: 4.4,
    reviews: 520,
    description: "High tensile hex bolt with matching nut. Grade 8.8 for heavy-duty fastening applications.",
    specifications: { "Size": "M10 x 40mm", "Grade": "8.8", "Material": "Carbon Steel", "Finish": "Zinc Plated" },
    bestSeller: true,
    stock: 1200,
  },
];
