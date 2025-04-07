// scripts/pdfjs-dev-plugin.js
import fs from 'fs';
import path from 'path';

/**
 * Plugin to serve PDF.js files directly from node_modules during development
 */
export default function pdfjsDevPlugin() {
  return {
    name: 'pdfjs-dev-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle PDF.js file requests
        if (req.url.includes('/node_modules/pdfjs-dist/')) {
          const filePath = req.url.replace('/node_modules/', '');
          const fullPath = path.resolve(process.cwd(), 'node_modules', filePath);
          
          if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath);
            const contentType = getContentType(fullPath);
            
            res.setHeader('Content-Type', contentType);
            res.end(content);
            return;
          }
        }
        next();
      });
    }
  };
}

// Helper to determine content type based on file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.js':
      return 'application/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
}