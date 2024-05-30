const fs = require("fs");
const path = require("path");

// Read the index.js file
const filePath = path.join(__dirname, "dist", "esm", "index.js");
let fileContent = fs.readFileSync(filePath, "utf8");

// Replace the CSS import path
fileContent = fileContent.replace(
  /import\s+['"]styles\.css['"];/,
  "import '../styles.css';"
);

// Write the updated content back to index.js
fs.writeFileSync(filePath, fileContent, "utf8");

console.log("CSS import path updated successfully.");
