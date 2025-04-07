import renderScreenReaderComments from '../../src/a11y/renderScreenReaderComments';
import PDFJSAnnotate from '../../src/PDFJSAnnotate';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


let hint;
let getComments = PDFJSAnnotate.__storeAdapter.getComments;

describe('a11y::renderScreenReaderComments', () => {
  beforeEach(() => {
    hint = document.createElement('div');
    hint.setAttribute('id', 'pdf-annotate-screenreader-12345');
    document.body.appendChild(hint);

    PDFJSAnnotate.__storeAdapter.getComments = () => {
      return Promise.resolve([{
        annotation: 12345,
        content: 'foo'
      }, {
        annotation: 12345,
        content: 'bar'
      }]);
    }
  });

  afterEach(() => {
    if (hint && hint.parentNode) {
      hint.parentNode.removeChild(hint);
    }

    PDFJSAnnotate.__storeAdapter.getComments = getComments;
  });

  it('should render comments', async () => {
    renderScreenReaderComments(null, 12345);

    setTimeout(function () {
      let list = hint.querySelector('ol');
      expect(list.getAttribute('aria-label')).toBe('Comments');
      expect(list.children.length).toBe(2);
      expect(list.children[0].innerHTML).toBe('foo');
      expect(list.children[1].innerHTML).toBe('bar');
      
    });
  });
});
