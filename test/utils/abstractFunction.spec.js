import abstractFunction from '../../src/utils/abstractFunction';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('utils::abstractFunction', () => {
  it('should throw when not implemented', () => {
    let err;

    try {
      abstractFunction('fn');
    } catch (e) {
      err = e;
    }

    expect(typeof err).toBe('object');
    expect(err.message).toBe('fn is not implemented');
  });
});
