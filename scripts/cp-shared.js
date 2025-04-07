// scripts/cp-shared.js
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Ensure destination directories exist
const ensureDirectoryExists = (filePath) => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

// Copy shared files to docs and sandbox folders
const copySharedFiles = () => {
  // List of files to copy from shared folder
  const sharedFiles = [
    'initColorPicker.js',
    'toolbar.css'
  ];

  // Copy files to docs/shared
  sharedFiles.forEach(file => {
    const source = join('shared', file);
    const docsTarget = join('docs/shared', file);
    
    ensureDirectoryExists(docsTarget);
    console.log(`Copying ${source} to ${docsTarget}`);
    copyFileSync(source, docsTarget);
  });
  
  // Copy files to sandbox/shared if needed
  sharedFiles.forEach(file => {
    const source = join('shared', file);
    const sandboxTarget = join('sandbox/shared', file);
    
    ensureDirectoryExists(sandboxTarget);
    console.log(`Copying ${source} to ${sandboxTarget}`);
    copyFileSync(source, sandboxTarget);
  });
};

// Execute the copy function
copySharedFiles();