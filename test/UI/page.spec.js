import PDFJSAnnotate from '../../src/PDFJSAnnotate';
import { createPage, renderPage } from '../../src/UI/page';
import mockPDFDocument from '../mockPDFDocument';
import mockPDFJS, { renderTextLayer } from '../mockPDFJS';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

// Mock the dynamic import of pdfjs-dist to use our mock
vi.mock('pdfjs-dist', () => {
  return {
    renderTextLayer
  };
});


let page;
let _PDFJS = window.PDFJS;
let getAnnotations = PDFJSAnnotate.getAnnotations;

describe('UI::page', () => {
  before(function () {
    _PDFJS = window.PDFJS;
    window.PDFJS = mockPDFJS();
    PDFJSAnnotate.getAnnotations = function (documentId, pageNumber) {
      return new Promise((resolve, reject) => {
        resolve({
          documentId,
          pageNumber,
          annotations: []
        });
      });
    };
  });

  after(function () {
    window.PDFJS = _PDFJS;
    PDFJSAnnotate.getAnnotations = getAnnotations;
  });

  beforeEach(() => {
    page = createPage(1);
  });

  afterEach(() => {
    if (page.parentNode) {
      page.parentNode.removeChild(page);
    }
  });

  it('should create a page', () => {
    let canvas = page.querySelector('canvas');
    let svg = page.querySelector('svg');
    let wrapper = page.querySelector('.canvasWrapper');
    let container = page.querySelector('.textLayer');

    expect(page.nodeName).toBe('DIV');
    expect(page.className).toBe('page');
    expect(page.getAttribute('id')).toBe('pageContainer1');
    expect(page.getAttribute('data-page-number')).toBe('1');
    expect(page.getAttribute('data-loaded')).toBe('false');
    expect(page.style.visibility).toBe('hidden');

    expect(canvas.getAttribute('id')).toBe('page1');
    expect(canvas.parentNode).toBe(wrapper);

    expect(wrapper.className).toBe('canvasWrapper');
    expect(svg.getAttribute('class')).toBe('annotationLayer');
    expect(container.className).toBe('textLayer');
  });

  it('should render a page', async () => {
    document.body.appendChild(page);

    renderPage(1, {
      documentId: 'test-document-id',
      pdfDocument: mockPDFDocument(),
      scale: 1,
      rotate: 0
    }).then(function ([pdfPage, annotations]) {
      expect(page.getAttribute('data-loaded')).toBe('true');
      expect(page.style.visibility).toBe('');

      expect(typeof pdfPage.render).toBe('function');
      expect(Array.isArray(annotations.annotations)).toBe(true);

      
    });
  });
});

