// scripts/copy-pdfjs-assets.js
import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// Ensure destination directories exist
const ensureDirectoryExists = (filePath) => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

// Copy PDF.js files to public directories for dev server
const copyPDFJSAssets = () => {
  // ES modules need to be converted to regular scripts for the browser
  // We'll create JS wrappers that load the ESM files
  
  // Create public directories
  ensureDirectoryExists('docs/public/pdfjs');
  ensureDirectoryExists('sandbox/public/pdfjs');
  
  // Copy CSS file directly
  try {
    const cssSource = 'node_modules/pdfjs-dist/web/pdf_viewer.css';
    const cssTargets = ['docs/public/pdfjs/pdf_viewer.css', 'sandbox/public/pdfjs/pdf_viewer.css'];
    
    cssTargets.forEach(target => {
      ensureDirectoryExists(target);
      console.log(`Copying ${cssSource} to ${target}`);
      copyFileSync(cssSource, target);
    });
  } catch (error) {
    console.error(`Error copying CSS file:`, error);
  }
  
  // Create wrapper for pdf.js
  const pdfWrapper = `
    // This is a wrapper to load the ESM version of pdf.js
    import('../../node_modules/pdfjs-dist/build/pdf.mjs')
      .then(module => {
        window.pdfjsLib = module;
        // Manually trigger any listeners waiting for the script to load
        const event = new Event('pdfjsloaded');
        document.dispatchEvent(event);
      });
  `;
  
  // Create wrapper for pdf.worker.js
  const workerWrapper = `
    // This is a wrapper to load the ESM version of pdf.worker.js
    import('../../node_modules/pdfjs-dist/build/pdf.worker.mjs');
  `;
  
  // Create wrapper for pdf_viewer.js
  const viewerWrapper = `
    // This is a wrapper to load the ESM version of pdf_viewer.js
    import('../../node_modules/pdfjs-dist/web/pdf_viewer.mjs')
      .then(module => {
        window.pdfjsViewer = module;
        // Manually trigger any listeners waiting for the script to load
        const event = new Event('pdfjsviewerloaded');
        document.dispatchEvent(event);
      });
  `;
  
  // Define the wrappers to create
  const wrappers = [
    {
      content: pdfWrapper,
      targets: ['docs/public/pdfjs/pdf.js', 'sandbox/public/pdfjs/pdf.js']
    },
    {
      content: workerWrapper,
      targets: ['docs/public/pdfjs/pdf.worker.js', 'sandbox/public/pdfjs/pdf.worker.js']
    },
    {
      content: viewerWrapper,
      targets: ['docs/public/pdfjs/pdf_viewer.js', 'sandbox/public/pdfjs/pdf_viewer.js']
    }
  ];
  
  // Write wrapper files
  wrappers.forEach(wrapper => {
    wrapper.targets.forEach(target => {
      try {
        ensureDirectoryExists(target);
        console.log(`Writing wrapper to ${target}`);
        writeFileSync(target, wrapper.content, 'utf8');
      } catch (error) {
        console.error(`Error writing wrapper ${target}:`, error);
      }
    });
  });

  console.log('PDF.js assets prepared for development server');
};

// Execute the copy function
copyPDFJSAssets();