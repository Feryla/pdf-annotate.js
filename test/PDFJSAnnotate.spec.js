import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import PDFJSAnnotate from '../src/PDFJSAnnotate';

let __storeAdapter;

describe('PDFJSAnnotate', () => {
  beforeEach(() => {
    __storeAdapter = PDFJSAnnotate.__storeAdapter;
    PDFJSAnnotate.setStoreAdapter(new PDFJSAnnotate.StoreAdapter({
      getAnnotations: (documentId, pageNumber) => {
        return Promise.resolve({
          documentId,
          pageNumber,
          annotations: [
            {
              type: 'point',
              x: 0,
              y: 0
            }
          ]
        });
      }
    }));
  });

  afterEach(() => {
    PDFJSAnnotate.setStoreAdapter(__storeAdapter);
  });

  it('should get annotations', async () => {
    const annotations = await PDFJSAnnotate.getAnnotations();
    expect(annotations.annotations[0].type).toBe('point');
  });

  // it('should throw error if StoreAdapter is not valid', () => {
  //   expect(() => {
  //     PDFJSAnnotate.setStoreAdapter({});
  //   }).toThrow();
  // });
 
  it('should inject documentId and pageNumber', async () => {
    const annotations = await PDFJSAnnotate.getAnnotations('document-id', 'page-number');
    expect(annotations.documentId).toBe('document-id');
    expect(annotations.pageNumber).toBe('page-number');
  });
});

