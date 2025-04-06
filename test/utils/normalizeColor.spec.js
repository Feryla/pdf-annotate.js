import normalizeColor from '../../src/utils/normalizeColor';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('utils::normalizeColor', () => {
  it('should add # to invalid hex', () => {
    expect(normalizeColor('000')).toBe('#000');
    expect(normalizeColor('ccff00')).toBe('#ccff00');
  });

  it('should not add # to valid hex', () => {
    expect(normalizeColor('#000')).toBe('#000');
    expect(normalizeColor('#ccff00')).toBe('#ccff00');
  });

  it('should not alter rgb', () => {
    expect(normalizeColor('rgb(0).toBe(0, 0)'), 'rgb(0, 0, 0)');
  });
});
