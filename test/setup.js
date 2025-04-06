import { beforeAll, afterAll, afterEach, beforeEach, vi } from 'vitest';

// Add Mocha compatibility for tests
global.before = beforeAll;
global.after = afterAll;

// For legacy test compatibility - sinon replacement
global.sinon = {
  spy: vi.fn,
  stub: vi.fn,
  createSandbox: () => ({
    spy: vi.fn,
    stub: vi.fn,
    restore: () => {
      vi.restoreAllMocks();
    }
  })
};

// Global setup - runs once before all tests
beforeAll(() => {
  // Set up global mocks or state if needed
  global.SVGElement = window.SVGElement;
  global.MouseEvent = window.MouseEvent;
  global.HTMLCanvasElement = window.HTMLCanvasElement;
  global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;
  
  // Add DOMMatrix polyfill for PDF.js
  if (typeof DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {
      constructor(transform) {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
        
        if (transform && transform.length === 6) {
          this.a = transform[0];
          this.b = transform[1];
          this.c = transform[2];
          this.d = transform[3];
          this.e = transform[4];
          this.f = transform[5];
        }
      }
      
      // Add needed methods
      translate(x, y) {
        this.e += x;
        this.f += y;
        return this;
      }
      
      scale(x, y) {
        this.a *= x;
        this.d *= y;
        return this;
      }
      
      // Add identity method
      static identity() {
        return new DOMMatrix();
      }
    };
  }
  
  // Set up global PDFJS object for the tests
  global.PDFJS = {
    DefaultTextLayerFactory: class DefaultTextLayerFactory {
      createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
        return {
          textLayerDiv,
          textContentStream: null,
          textContent: null,
          render: vi.fn(),
          setTextContent: vi.fn()
        };
      }
    }
  };
  
  // Add mocha-like globals
  global.before = beforeAll;
  global.after = afterAll;
  window.before = beforeAll;
  window.after = afterAll;
});

// Global teardown - runs once after all tests
afterAll(() => {
  // Clean up global mocks or state if needed
});

// Setup before each test
beforeEach(() => {
  // Create a sandbox for each test to avoid leaking stubs/spies
  global.sandbox = global.sinon.createSandbox();
});

// Clean up after each test
afterEach(() => {
  // Clean the DOM
  document.body.innerHTML = '';
  
  // Restore sinon stubs/spies
  if (global.sandbox) {
    global.sandbox.restore();
  }
  
  // Restore all vi mocks
  vi.restoreAllMocks();
});