import renderText from '../../src/render/renderText';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('render::renderText', () => {
  it('should render text', () => {
    const x = 50;
    const y = 100;
    const size = 20;
    const color = '000';
    let text = renderText({
      x,
      y,
      size,
      color
    });

    expect(text.nodeName).toBe('text');
    expect(parseInt(text.getAttribute('x'), 10)).toBe(x);
    expect(parseInt(text.getAttribute('y'), 10)).toBe(y + size);
    expect(text.getAttribute('fill')).toBe(`#${color}`);
    expect(parseInt(text.getAttribute('font-size'), 10)).toBe(size);
  });
});
