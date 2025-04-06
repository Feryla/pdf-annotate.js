import setAttributes from '../../src/utils/setAttributes';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('utils::setAttributes', () => {
  it('should set attributes', () => {
    var node = document.createElement('div');
    setAttributes(node, {
      id: 'foo',
      tabindex: 0
    });

    expect(node.getAttribute('id')).toBe('foo');
    expect(parseInt(node.getAttribute('tabindex'), 10)).toBe(0);
  });

  it('should hyphenate camelCase attributes', () => {
    var node = document.createElement('div');
    setAttributes(node, {
      dataAttr: 'abc'
    });

    expect(node.getAttribute('data-attr')).toBe('abc');
  });

  it('should not hyphenate special camelCase attributes', () => {
    var node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    setAttributes(node, {
      viewBox: '0 0 800 400'
    });

    expect(node.getAttribute('viewBox')).toBe('0 0 800 400');
  });
});
