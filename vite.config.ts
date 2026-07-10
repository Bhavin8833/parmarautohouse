import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Copy media assets from conversation folder to src/assets and public
const brainDir = "C:/Users/Bhavin Parmar/.gemini/antigravity-ide/brain/f66da201-b30b-4355-8f99-b31fd0154566";
const targetAssetsDir = path.resolve(__dirname, "./src/assets");
const targetPublicDir = path.resolve(__dirname, "./public");

try {
  if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    files.forEach(file => {
      if (file.startsWith("media__")) {
        const srcPath = path.join(brainDir, file);
        let destName = file;
        if (file === "media__1783675940075.jpg" || file === "media__1783677996587.jpg") {
          destName = "swaraj_724_xm.png";
        } else if (file === "media__1783676031848.png") {
          destName = "swaraj_724_xm_info.png";
        }
        // Copy to src/assets
        const destAssetsPath = path.join(targetAssetsDir, destName);
        fs.copyFileSync(srcPath, destAssetsPath);
        // Copy to public
        const destPublicPath = path.join(targetPublicDir, destName);
        fs.copyFileSync(srcPath, destPublicPath);
        console.log(`Copied ${file} to both locations`);
      }
    });
  }
} catch (e) {
  console.error("Error copying files in vite.config.ts:", e);
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
