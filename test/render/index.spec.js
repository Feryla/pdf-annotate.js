import render from '../../src/render';
import mockViewport from '../mockViewport';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


function _render(annotations) {
  let data = Array.isArray(annotations) ? { annotations } : annotations;
  render(svg, viewport, data);
}

let svg;
let viewport;

describe('render::index', () => {
  beforeEach(() => {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    viewport = mockViewport();
  });

  it('should reset SVG on each render', () => {
    let viewport = mockViewport(undefined, undefined, .5);

    _render([
      {
        type: 'point',
        x: 0,
        y: 0
      }
    ]);

    expect(svg.children.length).toBe(1);

    _render([
      {
        type: 'point',
        x: 0,
        y: 0
      },
      {
        type: 'point',
        x: 25,
        y: 25
      }
    ]);

    expect(svg.children.length).toBe(2);
  });

  it('should add data-attributes', () => {
    _render({
      documentId: '/render',
      pageNumber: 1
    });

    expect(svg.getAttribute('data-pdf-annotate-container')).toBe('true');
    expect(svg.getAttribute('data-pdf-annotate-viewport')).toBe(JSON.stringify(viewport));
    expect(svg.getAttribute('data-pdf-annotate-document')).toBe('/render');
    expect(svg.getAttribute('data-pdf-annotate-page')).toBe('1');
  });

  it('should add document and page if annotations are empty', () => {
    _render({
      documentId: '/render',
      pageNumber: 1,
      annotations: []
    });

    expect(svg.getAttribute('data-pdf-annotate-container')).toBe('true');
    expect(svg.getAttribute('data-pdf-annotate-viewport')).toBe(JSON.stringify(viewport));
    expect(svg.getAttribute('data-pdf-annotate-document')).toBe('/render');
    expect(svg.getAttribute('data-pdf-annotate-page')).toBe('1');
  });

  it('should reset document and page if no data', () => {
    _render({
      documentId: '/render',
      pageNumber: 1,
      annotations: []
    });

    _render();

    expect(svg.getAttribute('data-pdf-annotate-container')).toBe('true');
    expect(svg.getAttribute('data-pdf-annotate-viewport')).toBe(JSON.stringify(viewport));
    expect(svg.getAttribute('data-pdf-annotate-document')).toBe(null);
    expect(svg.getAttribute('data-pdf-annotate-page')).toBe(null);
  });

  it('should fail gracefully if no annotations are provided', () => {
    let error = false;
    try {
      _render(null);
    } catch (e) {
      error = true;
    }

    expect(error).toBe(false);
  });
});
