# pdf-annotate.js

[![build status](https://github.com/Feryla/pdf-annotate.js/actions/workflows/build.yml/badge.svg)](https://github.com/Feryla/pdf-annotate.js/actions)
[![codecov](https://codecov.io/github/Feryla/pdf-annotate.js/graph/badge.svg?token=472KTSAOU6)](https://codecov.io/github/Feryla/pdf-annotate.js)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Feryla/pdf-annotate.js/blob/master/LICENSE)

Annotation layer for [pdf.js](https://github.com/mozilla/pdf.js)

## Objectives

- Provide a low level annotation layer for [pdf.js](https://github.com/mozilla/pdf.js).
- Optional high level UI for managing annotations.
- Agnostic of backend, just supply your own `StoreAdapter` to fetch/store data.
- Prescribe annotation format.

## Example

```js
import __pdfjs from 'pdfjs-dist/build/pdf';
import PDFJSAnnotate from 'pdfjs-annotate';
import MyStoreAdapter from './myStoreAdapter';

const { UI } = PDFJSAnnotate;
const VIEWER = document.getElementById('viewer');
const RENDER_OPTIONS = {
  documentId: 'MyPDF.pdf',
  pdfDocument: null,
  scale: 1,
  rotate: 0
};

PDFJS.workerSrc = 'pdf.worker.js';
PDFJSAnnotate.setStoreAdapter(MyStoreAdapter);

PDFJS.getDocument(RENDER_OPTIONS.documentId).then((pdf) => {
  RENDER_OPTIONS.pdfDocument = pdf;
  VIEWER.appendChild(UI.createPage(1));
  UI.renderPage(1, RENDER_OPTIONS);
});
```

See more [examples](https://github.com/Feryla/pdf-annotate.js/blob/master/docs/index.js).

## Documentation

[View the docs](https://github.com/Feryla/pdf-annotate.js/tree/master/docs).

## Developing

```bash
# clone the repo
$ git clone https://github.com/Feryla/pdf-annotate.js.git
$ cd pdf-annotate.js

# install dependencies
$ npm install

# start example server (docs)
$ npm start
$ open http://127.0.0.1:5173

# start sandbox examples
$ npm run dev:sandbox
$ open http://127.0.0.1:5174

# run tests
$ npm test

# run tests in watch mode
$ npm run test:watch

# build library
$ npm run build
```
## License

MIT
