import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = "C:/Users/Bhavin Parmar/.gemini/antigravity-ide/brain/f66da201-b30b-4355-8f99-b31fd0154566";
const targetDir = path.resolve(__dirname, "./public");
const targetAssetsDir = path.resolve(__dirname, "./src/assets");

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
        
        // Copy to public
        const destPublicPath = path.join(targetDir, destName);
        fs.copyFileSync(srcPath, destPublicPath);
        
        // Copy to src/assets
        const destAssetsPath = path.join(targetAssetsDir, destName);
        fs.copyFileSync(srcPath, destAssetsPath);
        
        console.log(`Copied ${file} to both locations`);
      }
    });
    console.log("Media copy completed successfully!");
  } else {
    console.error(`Brain directory not found: ${brainDir}`);
  }
} catch (e) {
  console.error("Error copying files:", e);
}
