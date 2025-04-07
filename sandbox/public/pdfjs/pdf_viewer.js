
    // This is a wrapper to load the ESM version of pdf_viewer.js
    import('../../node_modules/pdfjs-dist/web/pdf_viewer.mjs')
      .then(module => {
        window.pdfjsViewer = module;
        // Manually trigger any listeners waiting for the script to load
        const event = new Event('pdfjsviewerloaded');
        document.dispatchEvent(event);
      });
  