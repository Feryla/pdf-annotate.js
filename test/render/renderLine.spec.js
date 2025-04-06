import renderLine from '../../src/render/renderLine';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


function assertG(g, l) {
  expect(g.nodeName).toBe('g');
  expect(g.children.length).toBe(l);
  expect(g.getAttribute('stroke')).toBe('#f00');
  expect(g.getAttribute('stroke-width')).toBe('1');
}

function assertLine(line, x, y, w) {
  expect(line.nodeName).toBe('line');
  expect(parseInt(line.getAttribute('x1'), 10)).toBe(x);
  expect(parseInt(line.getAttribute('y1'), 10)).toBe(y);
  expect(parseInt(line.getAttribute('x2'), 10)).toBe(x + w);
  expect(parseInt(line.getAttribute('y2'), 10)).toBe(y);
}

describe('render::renderLine', () => {
  it('should render a line', () => {
    let line = renderLine({
      rectangles: [
        {
          x: 25,
          y: 50,
          width: 100
        }
      ]
    });
  
    assertG(line, 1);
    assertLine(line.children[0], 25, 50, 100);
  });

  it('should render multiple lines', () => {
    let line = renderLine({
      rectangles: [
        {
          x: 0,
          y: 100,
          width: 250
        },
        {
          x: 75,
          y: 10,
          width: 150
        }
      ]
    });

    assertG(line, 2);
    assertLine(line.children[0], 0, 100, 250);
    assertLine(line.children[1], 75, 10, 150);
  });
});
