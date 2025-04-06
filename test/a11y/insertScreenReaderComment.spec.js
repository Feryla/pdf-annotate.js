import insertScreenReaderComment from '../../src/a11y/insertScreenReaderComment';
import { equal } from 'assert';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';


let hint;

describe('a11y::insertScreenReaderComment', () => {
  beforeEach(() => {
    hint = document.createElement('div');
    hint.setAttribute('id', 'pdf-annotate-screenreader-12345');
    hint.innerHTML = '<ol></ol>';
    document.body.appendChild(hint);
  });

  afterEach(() => {
    if (hint && hint.parentNode) {
      hint.parentNode.removeChild(hint);
    }
  });

  it('should render a comment', () => {
    insertScreenReaderComment({
      annotation: 12345,
      content: 'Hello there!'
    });

    let list = hint.querySelector('ol');
    expect(list.children.length).toBe(1);
    expect(list.children[0].innerHTML).toBe('Hello there!');
  });

  it('should fail gracefully if no comment provided', () => {
    let error;
    try {
      insertScreenReaderComment();
    } catch (e) {
      error = e;
    }

    expect(typeof error).toBe('undefined');
  });
  
  it('should fail gracefully if bad annotation provided', () => {
    let error;
    try {
      insertScreenReaderComment({
        annotation: 0
      });
    } catch (e) {
      error = e;
    }

    expect(typeof error).toBe('undefined');
  });

});
