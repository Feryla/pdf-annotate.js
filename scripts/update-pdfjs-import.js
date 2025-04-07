// scripts/update-pdfjs-import.js
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { globSync } from 'glob';

// Replace PDF.js references with npm package
const updateFiles = () => {
  // Find all HTML files in docs and sandbox folders
  const htmlFiles = [
    ...globSync('docs/**/*.html'),
    ...globSync('sandbox/**/*.html')
  ];

  console.log('Updating HTML files to use PDF.js from npm package:');
  
  htmlFiles.forEach(file => {
    console.log(`Updating ${file}`);
    let content = readFileSync(file, 'utf8');
    
    // Replace script src references with public paths for development
    content = content.replace(
      /<script src=".*\/pdf\.js"><\/script>/g, 
      '<script src="/pdfjs/pdf.js"></script>'
    );
    
    content = content.replace(
      /<script src=".*\/pdf\.worker\.js"><\/script>/g, 
      '<!-- PDF.js worker is loaded in JavaScript -->'
    );

    content = content.replace(
      /<script src=".*\/pdf_viewer\.js"><\/script>/g, 
      '<script src="/pdfjs/pdf_viewer.js"></script>'
    );
    
    // Replace CSS references
    content = content.replace(
      /<link rel="stylesheet" type="text\/css" href=".*\/pdf_viewer\.css"\/>/g, 
      '<link rel="stylesheet" type="text/css" href="/pdfjs/pdf_viewer.css"/>'
    );
    
    writeFileSync(file, content, 'utf8');
  });
  
  // Find all JS files that reference PDF.js
  const jsFiles = [
    ...globSync('docs/**/*.js'),
    ...globSync('sandbox/**/*.js')
  ];
  
  console.log('\nUpdating JavaScript files:');
  
  jsFiles.forEach(file => {
    let content = readFileSync(file, 'utf8');
    
    // Replace worker source references
    if (content.includes('PDFJS.workerSrc')) {
      console.log(`Updating ${file}`);
      content = content.replace(
        /PDFJS\.workerSrc = '.*\/pdf\.worker\.js';/g, 
        "PDFJS.workerSrc = '/pdfjs/pdf.worker.js';"
      );
      
      writeFileSync(file, content, 'utf8');
    }
  });
  
  console.log('\nUpdate completed!');
};

// Execute the update function
updateFiles();