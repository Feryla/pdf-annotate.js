import renderPoint from '../../src/render/renderPoint';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('render::renderPoint', () => {
  it('should render a point', () => {
    let point = renderPoint({
      x: 100,
      y: 200
    });

    expect(point.nodeName).toBe('svg');
    expect(parseInt(point.getAttribute('x'), 10)).toBe(100);
    expect(parseInt(point.getAttribute('y'), 10)).toBe(200);
    expect(parseInt(point.getAttribute('width'), 10)).toBe(25);
    expect(parseInt(point.getAttribute('height'), 10)).toBe(25);
  });
});
