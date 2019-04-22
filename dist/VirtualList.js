"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVerticalScrollbar = require("react-vertical-scrollbar");

var _reactVerticalScrollbar2 = _interopRequireDefault(_reactVerticalScrollbar);

require("./VirtualList.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CSS


var SCROLLBAR_WIDTH = 10;
var ROW_COLOR_CYCLE = ["white", "#f0f0f0"];

var VirtualList = function (_Component) {
  _inherits(VirtualList, _Component);

  function VirtualList(props) {
    _classCallCheck(this, VirtualList);

    var _this = _possibleConstructorReturn(this, (VirtualList.__proto__ || Object.getPrototypeOf(VirtualList)).call(this, props));

    _this.handleScrollStartUpdate = function (scrollStart) {
      scrollStart = _this.capScrollStart(scrollStart);
      _this.setState({ scrollStart: scrollStart });
    };

    _this.handleScroll = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var scrollStart = _this.state.scrollStart;

      if (ev.deltaY < 0) {
        _this.handleScrollStartUpdate(scrollStart - 10);
      } else {
        _this.handleScrollStartUpdate(scrollStart + 10);
      }
    };

    _this.state = { scrollStart: 0 };
    _this.renderedItems = new Set();
    return _this;
  }

  _createClass(VirtualList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          rowHeight = _props.rowHeight,
          scrollbarColor = _props.scrollbarColor,
          children = _props.children;
      var scrollStart = this.state.scrollStart;
      var renderedItems = this.renderedItems;

      var totalHeight = rowHeight * _react2.default.Children.count(children);
      // Add scrollbar if needed
      var ScrollbarElem = null;
      var listWidth = width;
      if (height < totalHeight) {
        ScrollbarElem = _react2.default.createElement(_reactVerticalScrollbar2.default, { width: SCROLLBAR_WIDTH, height: height, color: scrollbarColor,
          realHeight: totalHeight, realRange: height, scrollStart: scrollStart,
          updateScrollStartHandler: this.handleScrollStartUpdate
        });
        listWidth -= SCROLLBAR_WIDTH;
      }
      // Add list items
      var existingChildKey = new Set(_react2.default.Children.map(children, function (child) {
        return child.key;
      }));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = renderedItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var childKey = _step.value;

          if (!existingChildKey.has(childKey)) renderedItems.delete(childKey);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var items = _react2.default.Children.map(children, function (child, i) {
        if (!_this2.renderedItems.has(child.key) && (i * rowHeight + rowHeight <= scrollStart || i * rowHeight >= scrollStart + height)) {
          return null;
        } else {
          renderedItems.add(child.key);
          return _react2.default.createElement(
            "div",
            { key: child.key,
              className: "VirtualList-rowContainer",
              style: { height: rowHeight, top: i * rowHeight, backgroundColor: ROW_COLOR_CYCLE[i % ROW_COLOR_CYCLE.length] }
            },
            child
          );
        }
      });

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          "div",
          { className: "VirtualList-masterContainer",
            style: { width: width, height: height },
            onWheel: this.handleScroll
          },
          ScrollbarElem,
          _react2.default.createElement(
            "div",
            { className: "VirtualList-mainContainer",
              style: { height: height, width: listWidth, top: -scrollStart } },
            items
          )
        )
      );
    }
  }, {
    key: "capScrollStart",
    value: function capScrollStart(scrollStart) {
      var _props2 = this.props,
          height = _props2.height,
          children = _props2.children,
          rowHeight = _props2.rowHeight;

      var realHeight = rowHeight * _react2.default.Children.count(children);
      if (realHeight < height) {
        return 0;
      } else {
        return Math.max(0, Math.min(realHeight - height, scrollStart));
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var children = props.children,
          height = props.height,
          rowHeight = props.rowHeight;
      var scrollStart = state.scrollStart;

      if (scrollStart > _react2.default.Children.count(children) * rowHeight - height) {
        return { scrollStart: Math.max(0, _react2.default.Children.count(children) * rowHeight - height) };
      }
      return null;
    }
  }]);

  return VirtualList;
}(_react.Component);

VirtualList.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  rowHeight: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.node
};

exports.default = VirtualList;