import appendChild from '../../src/render/appendChild';
import mockViewport from '../mockViewport';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


const isFirefox = /Firefox/i.test(navigator.userAgent);

function testScale(scale = 0.5, passViewportArg = true) {
  viewport = mockViewport(undefined, undefined, scale);
  svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));

  let annotation = {
    type: 'point',
    x: 200,
    y: 100
  };
  
  let nested = appendChild(svg, annotation, passViewportArg ? viewport : undefined);
  
  if (isFirefox) {
    expect(nested.getAttribute('x')).toBe(annotation.x);
    expect(nested.getAttribute('y')).toBe(annotation.y);
    expect(nested.querySelector('path').getAttribute('transform')).toBe(null);
  } else {
    expect(parseInt(nested.getAttribute('x'), 10)).toBe(annotation.x * scale);
    expect(parseInt(nested.getAttribute('y'), 10)).toBe(annotation.y * scale);
    expect(nested.querySelector('path').getAttribute('transform')).toBe(`scale(1) rotate(0) translate(0, 0)`);
  }
}

function testRotation(rotation, transX, transY) {
  viewport = mockViewport(undefined, undefined, undefined, rotation);
  let annotation = {
    type: 'point',
    x: 200,
    y: 100
  };
  let node = appendChild(svg, annotation, viewport);
  let width = parseInt(node.getAttribute('width'), 10);
  let height = parseInt(node.getAttribute('height'), 10);
  let expectX = annotation.x;
  let expectY = annotation.y;

  switch(viewport.rotation % 360) {
    case 90:
      expectX = viewport.width - annotation.y - width;
      expectY = annotation.x;
      break;
    case 180:
      expectX = viewport.width - annotation.x - width;
      expectY = viewport.height - annotation.y - height;
      break;
    case 270:
      expectX = annotation.y;
      expectY = viewport.height - annotation.x - height;
      break;
  }

  if (isFirefox) {
    expect(node.getAttribute('transform')).toBe(`scale(1) rotate(${rotation}) translate(${transX}, ${transY})`);
    expect(parseInt(node.getAttribute('x')).toBe(10), annotation.x);
    expect(parseInt(node.getAttribute('y')).toBe(10), annotation.y);
  } else {
    expect(node.getAttribute('transform')).toBe(`scale(1) rotate(${rotation}) translate(${transX}, ${transY})`);
    expect(parseInt(node.getAttribute('x'), 10)).toBe(expectX ? expectX : 10);
    expect(parseInt(node.getAttribute('y'), 10)).toBe(expectY ? expectY : 10);
  }
}

let svg;
let viewport;

describe('render::appendChild', () => {
  beforeEach(() => {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    viewport = mockViewport();
  });

  it('should add data-attributes', () => {
    let point = appendChild(svg, {
      uuid: 1234,
      type: 'point',
      x: 0,
      y: 0
    }, viewport);
    let area = appendChild(svg, {
      uuid: 5678,
      type: 'area',
      x: 0,
      y: 0,
      width: 25,
      height: 25
    }, viewport);
    
    expect(point.getAttribute('data-pdf-annotate-id')).toBe('1234');
    expect(point.getAttribute('data-pdf-annotate-type')).toBe('point');
    expect(area.getAttribute('data-pdf-annotate-id')).toBe('5678');
    expect(area.getAttribute('data-pdf-annotate-type')).toBe('area');
  });
  
  it('should render area', () => {
    let area = appendChild(svg, {
      type: 'area',
      x: 125,
      y: 225,
      width: 100,
      height: 50
    }, viewport);

    expect(area.nodeName.toLowerCase()).toBe('rect');
  });

  it('should render highlight', () => {
    let highlight = appendChild(svg, {
      type: 'highlight',
      color: 'FF0000',
      rectangles: [
        {
          x: 1,
          y: 1,
          width: 50,
          height: 50
        }
      ]
    }, viewport);

    expect(highlight.nodeName.toLowerCase()).toBe('g');
    expect(highlight.children.length).toBe(1);
    expect(highlight.children[0].nodeName.toLowerCase()).toBe('rect');
  });

  it('should render strikeout', () => {
    let strikeout = appendChild(svg, {
      type: 'strikeout',
      color: 'FF0000',
      rectangles: [{
        x: 125,
        y: 320,
        width: 270,
        height: 1
      }],
    }, viewport);

    expect(strikeout.nodeName.toLowerCase()).toBe('g');
    expect(strikeout.children.length).toBe(1);
    expect(strikeout.children[0].nodeName.toLowerCase()).toBe('line');
  });

  it('should render textbox', () => {
    let textbox = appendChild(svg, {
      type: 'textbox',
      x: 125,
      y: 400,
      width: 50,
      height: 100,
      size: 20,
      color: '000000',
      content: 'Lorem Ipsum'
    }, viewport);

    expect(textbox.nodeName.toLowerCase()).toBe('text');
  });

  it('should render point', () => {
    let point = appendChild(svg, {
      type: 'point',
      x: 5,
      y: 5
    }, viewport);

    expect(point.nodeName.toLowerCase()).toBe('svg');
  });

  it('should render drawing', () => {
    let drawing = appendChild(svg, {
      type: 'drawing',
      x: 10,
      y: 10,
      lines: [[0, 0], [1, 1]]
    }, viewport);

    expect(drawing.nodeName.toLowerCase()).toBe('path');
  });

  it('should fail gracefully if no type is provided', () => {
    let error = false;
    try {
      appendChild(svg, { x: 1, y: 1 }, viewport);
    } catch (e) {
      error = true;
    }

    expect(error).toBe(false);
  });

  it('should transform scale', () => { testScale(0.5); });
  it('should use viewport from svg data-attribute', () => { testScale(0.5, false); });

  it('should transform rotation 0', () => { testRotation(0, 0, 0); });
  it('should transform rotation 90', () => { testRotation(90, 0, -100); });
  it('should transform rotation 180', () => { testRotation(180, -100, -100); });
  it('should transform rotation 270', () => { testRotation(270, -100, 0); });
  it('should transform rotation 360', () => { testRotation(360, 0, 0); });
  it('should transform rotation 540', () => { testRotation(540, -100, -100); });
});
