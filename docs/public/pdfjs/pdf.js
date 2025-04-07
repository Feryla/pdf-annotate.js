
    // This is a wrapper to load the ESM version of pdf.js
    import('../../node_modules/pdfjs-dist/build/pdf.mjs')
      .then(module => {
        window.pdfjsLib = module;
        // Manually trigger any listeners waiting for the script to load
        const event = new Event('pdfjsloaded');
        document.dispatchEvent(event);
      });
  