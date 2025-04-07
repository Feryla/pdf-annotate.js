import renderRect from '../../src/render/renderRect';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


function assertG(g, l, c) {
  expect(g.nodeName).toBe('g');
  expect(g.children.length).toBe(l);

  if (c) {
    expect(g.getAttribute('fill')).toBe(`#${c}`);
  } else {
    expect(g.getAttribute('fill')).toBe('none');
    expect(g.getAttribute('stroke')).toBe('#f00');
  }
}

function assertRect(rect, x, y, w, h) {
  expect(rect.nodeName).toBe('rect');
  // Convert attribute string values to numbers for comparison
  expect(parseInt(rect.getAttribute('x'), 10)).toBe(x);
  expect(parseInt(rect.getAttribute('y'), 10)).toBe(y);
  expect(parseInt(rect.getAttribute('width'), 10)).toBe(w);
  expect(parseInt(rect.getAttribute('height'), 10)).toBe(h);
}

describe('render::renderRect', () => {
  it('should render a rect', () => {
    let rect = renderRect({
      type: 'highlight',
      color: '0ff',
      rectangles: [
        {
          x: 50,
          y: 75,
          width: 100,
          height: 125
        }
      ]
    });

    assertG(rect, 1, '0ff');
    assertRect(rect.children[0], 50, 75, 100, 125);
  });

  it('should render multiple rects', () => {
    let rect = renderRect({
      type: 'highlight',
      rectangles: [
        {
          x: 50,
          y: 75,
          width: 100,
          height: 125
        },
        {
          x: 100,
          y: 200,
          width: 300,
          height: 400
        }
      ]
    });

    assertG(rect, 2, 'ff0');
    assertRect(rect.children[0], 50, 75, 100, 125);
    assertRect(rect.children[1], 100, 200, 300, 400);
  });

  it('should render area rect without group', () => {
    let rect = renderRect({
      type: 'area',
      x: 100,
      y: 200,
      width: 300,
      height: 400
    });

    assertRect(rect, 100, 200, 300, 400);
  });
});
