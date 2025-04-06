function DefaultTextLayerFactory() {}
DefaultTextLayerFactory.prototype.createTextLayerBuilder = function () {
  return {
    setTextContent: function () {},
    render: function () {}
  };
}

// Mock the imported renderTextLayer function
export const renderTextLayer = ({ textContent, container }) => {
  return {
    promise: Promise.resolve(),
    cancel: () => {}
  };
};

export default function mockPDFJS() {
  return {
    DefaultTextLayerFactory
  };
}
