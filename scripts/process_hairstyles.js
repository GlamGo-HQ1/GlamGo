const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Target directory for all hairstyle images
const HAIRSTYLES_DIR = path.join(__dirname, '../public/images/hairstyles');
// Output file for the generated catalog
const OUTPUT_FILE = path.join(__dirname, 'generated_catalog.json');

async function processHairstyles() {
  console.log('💇🏾‍♀️ Starting GlamGo Hairstyle Image Processor...\n');
  
  if (!fs.existsSync(HAIRSTYLES_DIR)) {
    console.error(`Directory not found: ${HAIRSTYLES_DIR}`);
    return;
  }

  const catalog = [];
  const categories = fs.readdirSync(HAIRSTYLES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(HAIRSTYLES_DIR, category);
    
    // Within each category (e.g., braids), find the specific hairstyle folders (e.g., ball_braids)
    const styles = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const styleName of styles) {
      const stylePath = path.join(categoryPath, styleName);
      const files = fs.readdirSync(stylePath);
      
      const processedImages = [];
      let primaryImage = null;

      for (const file of files) {
        const filePath = path.join(stylePath, file);
        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, path.extname(file));
        
        let finalRelativePath = '';

        // Check if the image starts with "1" or is named "front" to mark it as the primary display image
        const isPrimary = baseName.startsWith('1') || baseName.toLowerCase() === 'front';

        // Convert PNG to JPG to save space/bandwidth
        if (ext === '.png') {
          console.log(`🔄 Converting 2K PNG to JPG: ${category}/${styleName}/${file}`);
          const newFileName = `${baseName}.jpg`;
          const newFilePath = path.join(stylePath, newFileName);
          
          try {
            await sharp(filePath)
              .jpeg({ quality: 80, progressive: true })
              .toFile(newFilePath);
            
            // Delete the original PNG after successful conversion
            fs.unlinkSync(filePath);
            finalRelativePath = `/images/hairstyles/${category}/${styleName}/${newFileName}`;
          } catch (err) {
            console.error(`❌ Failed to convert ${file}:`, err);
            continue;
          }
        } else if (ext === '.jpg' || ext === '.jpeg') {
          // Already a JPG, just register it
          finalRelativePath = `/images/hairstyles/${category}/${styleName}/${file}`;
        } else {
          // Ignore non-image files
          continue;
        }

        if (finalRelativePath) {
          if (isPrimary) {
            primaryImage = finalRelativePath;
          } else {
            processedImages.push(finalRelativePath);
          }
        }
      }

      // If we found a primary image, put it at the very front of the array
      if (primaryImage) {
        processedImages.unshift(primaryImage);
      }

      // Format name from "ball_braids" or "ball-braids" to "Ball Braids"
      const formattedName = styleName
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      // Only add to catalog if it actually has images
      if (processedImages.length > 0) {
        catalog.push({
          name: formattedName,
          category: category,
          images: processedImages,
          // Placeholder defaults that can be edited later
          description: `Beautiful ${formattedName} styling.`,
          price_min: 15000,
          price_max: 35000,
          duration_hrs: 4.0,
          is_trending: false
        });
        
        console.log(`✅ Processed: ${formattedName} (${processedImages.length} images)`);
      }
    }
  }

  // Write out the catalog file so it can be used for seeding later
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));
  console.log(`\n🎉 Done! Found and processed ${catalog.length} hairstyles.`);
  console.log(`File saved to: ${OUTPUT_FILE}`);
}

processHairstyles().catch(console.error);
