import createScreenReaderOnly from '../../src/a11y/createScreenReaderOnly';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('a11y::createScreenReaderOnly', () => {
  it('should create an element that cannot be seen', () => {
    let sr = createScreenReaderOnly();
    expect(sr.offsetWidth).toBe(0);
    expect(sr.offsetHeight).toBe(0);
  });

  it('should set innerHTML', () => {
    let sr = createScreenReaderOnly('foo bar baz');
    expect(sr.innerHTML).toBe('foo bar baz');
  });

  it('should set id', () => {
    let sr = createScreenReaderOnly(null, '12345');
    expect(sr.getAttribute('id')).toBe('pdf-annotate-screenreader-12345');
  });
});
