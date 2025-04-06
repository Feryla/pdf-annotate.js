import uuid from '../../src/utils/uuid';
import { equal, notEqual } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


describe('utils::uuid', () => {
  it('should create a 36 char sequence', () => {
    expect(uuid().length).toBe(36);
  });

  it('should create a random sequence', () => {
    expect(uuid()).not.toBe(uuid());
  });
});
