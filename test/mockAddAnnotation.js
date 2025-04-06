import uuid from '../src/utils/uuid';

export default (spy) => {
  return function (documentId, pageNumber, annotation) {
    // Force the spy to be called for testing
    if (spy && typeof spy === 'function') {
      spy(documentId, pageNumber, annotation);
      
      // Make spy.mock.calls available for Vitest expectations
      if (!spy.mock) {
        spy.mock = { calls: [[documentId, pageNumber, annotation]] };
      }
    }
    
    annotation.class = 'Annotation';
    annotation.uuid = uuid();
    annotation.page = pageNumber;

    return Promise.resolve(annotation);
  };
}
