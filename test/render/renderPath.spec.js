import renderPath from '../../src/render/renderPath';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('render::renderPath', () => {
  it('should render a path', () => {
    let path = renderPath({
      lines: [[0, 5], [10, 15], [20, 35]]
    });

    expect(path.nodeName).toBe('path');
    expect(path.getAttribute('d')).toBe('M0 5 10 15 M10 15 20 35Z');
    expect(path.getAttribute('stroke')).toBe('#000');
    expect(parseInt(path.getAttribute('stroke-width'), 10)).toBe(1);
    expect(path.getAttribute('fill')).toBe('none');
  });

  it('shohuld render with custom options', () => {
    let path = renderPath({
      color: 'f00',
      width: 5,
      lines: [[0, 1], [1, 2], [2, 3]]
    });

    expect(path.getAttribute('stroke')).toBe('#f00');
    expect(parseInt(path.getAttribute('stroke-width'), 10)).toBe(5);
  });
});
