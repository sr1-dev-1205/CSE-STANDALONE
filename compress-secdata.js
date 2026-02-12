// Run: node compress-secdata.js
// Compresses SecData.json by removing whitespace/comments

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src/data/SecData.json');
const outputPath = path.join(__dirname, 'src/data/SecData.min.json');

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Minify JSON (no pretty print)
fs.writeFileSync(outputPath, JSON.stringify(data));

const originalSize = fs.statSync(inputPath).size;
const compressedSize = fs.statSync(outputPath).size;

console.log(`✅ Original: ${(originalSize / 1024).toFixed(2)} KB`);
console.log(`✅ Compressed: ${(compressedSize / 1024).toFixed(2)} KB`);
console.log(`✅ Saved: ${(((originalSize - compressedSize) / originalSize) * 100).toFixed(1)}%`);
console.log('\n📝 Update DataTable.tsx:');
console.log('   Change: import("../data/SecData.json")');
console.log('   To:     import("../data/SecData.min.json")');
