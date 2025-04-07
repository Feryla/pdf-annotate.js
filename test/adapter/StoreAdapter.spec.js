import StoreAdapter from '../../src/adapter/StoreAdapter';
import LocalStoreAdapter from '../../src/adapter/LocalStoreAdapter';
import { addEventListener, removeEventListener } from '../../src/UI/event';
import { describe, beforeEach, it, expect, vi } from 'vitest';

function testExpectedError(callback) {
  return function () {
    let error = null;
    try {
      callback();
    } catch (e) {
      error = e;
    }

    expect(error instanceof Error).toBe(true);
  }
}

describe('StoreAdapter', () => {
  describe('abstract', () => {
    let adapter;

    beforeEach(() => {
      adapter = new StoreAdapter();
    });

    it('should error by default when calling getAnnotations', testExpectedError(function () {
      adapter.getAnnotations();
    }));
    
    it('should error by default when calling getAnnotation', testExpectedError(function () {
      adapter.getAnnotation();
    }));
  
    it('should error by default when calling addAnnotation', testExpectedError(function () {
      adapter.addAnnotation();
    }));
      
    it('should error by default when calling editAnnotation', testExpectedError(function () {
      adapter.editAnnotation();
    }));

    it('should error by default when calling deleteAnnotation', testExpectedError(function () {
      adapter.deleteAnnotation();
    }));

    it('should error by default when calling getComments', testExpectedError(function () {
      adapter.getComments();
    }));

    it('should error by default when calling addComment', testExpectedError(function () {
      adapter.addComment();
    }));

    it('should error by default when calling deleteComment', testExpectedError(function () {
      adapter.deleteComment();
    }));
  });
});