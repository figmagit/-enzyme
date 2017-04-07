Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchedUpdates = exports.unmountComponentAtNode = exports.renderWithOptions = exports.childrenToArray = exports.findAllInRenderedTree = exports.findDOMNode = exports.Simulate = exports.isCompositeComponentElement = exports.isCompositeComponentWithType = exports.isCompositeComponent = exports.isDOMComponentElement = exports.isDOMComponent = exports.isElementOfType = exports.isElement = exports.mockComponent = exports.renderIntoDocument = exports.renderToStaticMarkup = exports.createShallowRenderer = undefined;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint
  global-require: 0,
  import/no-mutable-exports: 0,
  import/no-unresolved: 0,
  react/no-deprecated: 0,
  react/no-render-return-value: 0,
*/

var TestUtils = void 0;
var createShallowRenderer = void 0;
var renderToStaticMarkup = void 0;
var renderIntoDocument = void 0;
var findDOMNode = void 0;
var childrenToArray = void 0;
var renderWithOptions = void 0;
var unmountComponentAtNode = void 0;
var batchedUpdates = void 0;

var React = require('react');

if (_version.REACT013) {
  throw new Error("(specific to figma/enzyme) Support for React 0.13 was removed to avoid static analysis of require() calls to react-internal modules that were moved in 0.14.");
} else {
  var ReactDOM = void 0;

  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    ReactDOM = require('react-dom');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('react-dom is an implicit dependency in order to support react@0.13-14. ' + 'Please add the appropriate version to your devDependencies. ' + 'See https://github.com/airbnb/enzyme#installation');
    throw e;
  }

  // eslint-disable-next-line import/no-extraneous-dependencies
  exports.renderToStaticMarkup = renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

  exports.findDOMNode = findDOMNode = ReactDOM.findDOMNode;
  exports.unmountComponentAtNode = unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
  exports.batchedUpdates = batchedUpdates = ReactDOM.unstable_batchedUpdates;
  // We require the testutils, but they don't come with 0.14 out of the box, so we
  // require them here through this node module. The bummer is that we are not able
  // to list this as a dependency in package.json and have 0.13 work properly.
  // As a result, right now this is basically an implicit dependency.
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    TestUtils = require('react-addons-test-utils');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('react-addons-test-utils is an implicit dependency in order to support react@0.13-14. ' + 'Please add the appropriate version to your devDependencies. ' + 'See https://github.com/airbnb/enzyme#installation');
    throw e;
  }

  // Shallow rendering changed from 0.13 => 0.14 in such a way that
  // 0.14 now does not allow shallow rendering of native DOM elements.
  // This is mainly because the result of such a call should not realistically
  // be any different than the JSX you passed in (result of `React.createElement`.
  // In order to maintain the same behavior across versions, this function
  // is essentially a replacement for `TestUtils.createRenderer` that doesn't use
  // shallow rendering when it's just a DOM element.
  exports.createShallowRenderer = createShallowRenderer = function () {
    function createRendererCompatible() {
      var renderer = TestUtils.createRenderer();
      var originalRender = renderer.render;
      var originalRenderOutput = renderer.getRenderOutput;
      var isDOM = false;
      var cachedNode = void 0;
      return (0, _object2['default'])(renderer, {
        render: function () {
          function render(node, context) {
            /* eslint consistent-return: 0 */
            if (typeof node.type === 'string') {
              isDOM = true;
              cachedNode = node;
            } else {
              isDOM = false;
              return originalRender.call(this, node, context);
            }
          }

          return render;
        }(),
        getRenderOutput: function () {
          function getRenderOutput() {
            if (isDOM) {
              return cachedNode;
            }
            return originalRenderOutput.call(this);
          }

          return getRenderOutput;
        }()
      });
    }

    return createRendererCompatible;
  }();
  exports.renderIntoDocument = renderIntoDocument = TestUtils.renderIntoDocument;
  exports.childrenToArray = childrenToArray = React.Children.toArray;

  exports.renderWithOptions = renderWithOptions = function () {
    function renderWithOptions(node, options) {
      if (options.attachTo) {
        return ReactDOM.render(node, options.attachTo);
      }
      return TestUtils.renderIntoDocument(node);
    }

    return renderWithOptions;
  }();
}

function isDOMComponentElement(inst) {
  return React.isValidElement(inst) && typeof inst.type === 'string';
}

var _TestUtils = TestUtils,
    mockComponent = _TestUtils.mockComponent,
    isElement = _TestUtils.isElement,
    isElementOfType = _TestUtils.isElementOfType,
    isDOMComponent = _TestUtils.isDOMComponent,
    isCompositeComponent = _TestUtils.isCompositeComponent,
    isCompositeComponentWithType = _TestUtils.isCompositeComponentWithType,
    isCompositeComponentElement = _TestUtils.isCompositeComponentElement,
    Simulate = _TestUtils.Simulate,
    findAllInRenderedTree = _TestUtils.findAllInRenderedTree;
exports.createShallowRenderer = createShallowRenderer;
exports.renderToStaticMarkup = renderToStaticMarkup;
exports.renderIntoDocument = renderIntoDocument;
exports.mockComponent = mockComponent;
exports.isElement = isElement;
exports.isElementOfType = isElementOfType;
exports.isDOMComponent = isDOMComponent;
exports.isDOMComponentElement = isDOMComponentElement;
exports.isCompositeComponent = isCompositeComponent;
exports.isCompositeComponentWithType = isCompositeComponentWithType;
exports.isCompositeComponentElement = isCompositeComponentElement;
exports.Simulate = Simulate;
exports.findDOMNode = findDOMNode;
exports.findAllInRenderedTree = findAllInRenderedTree;
exports.childrenToArray = childrenToArray;
exports.renderWithOptions = renderWithOptions;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.batchedUpdates = batchedUpdates;