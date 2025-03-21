const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

// Function to copy a file preserving directory structure
function copyFile(src, dest) {
  const targetDir = path.dirname(dest);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

// Main build script
console.log('Starting Netlify build process...');

// Ensure .next directory exists
if (!fs.existsSync('.next')) {
  console.log('Creating .next directory...');
  fs.mkdirSync('.next');
}

// Copy public directory to .next/static
console.log('Copying public directory to .next/static...');
const publicFiles = getAllFiles('public');
publicFiles.forEach((file) => {
  const relativePath = path.relative('public', file);
  const targetPath = path.join('.next/static', relativePath);
  copyFile(file, targetPath);
});

// Copy necessary files for PWA
console.log('Copying PWA files...');
const pwaFiles = ['manifest.json', 'firebase-messaging-sw.js'];
pwaFiles.forEach((file) => {
  if (fs.existsSync(`public/${file}`)) {
    copyFile(`public/${file}`, `.next/${file}`);
  }
});

console.log('Build process completed successfully!');
