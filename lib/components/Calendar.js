'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DaysViewHeading = require('./DaysViewHeading');

var _DaysViewHeading2 = _interopRequireDefault(_DaysViewHeading);

var _DaysOfWeek = require('./DaysOfWeek');

var _DaysOfWeek2 = _interopRequireDefault(_DaysOfWeek);

var _MonthSelector = require('./MonthSelector');

var _MonthSelector2 = _interopRequireDefault(_MonthSelector);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _momentHelper = require('../utils/moment-helper');

var _momentJalali = require('moment-jalali');

var _momentJalali2 = _interopRequireDefault(_momentJalali);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Load Persian localisation
_momentJalali2.default.loadPersian();

var Calendar = exports.Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      month: _this.props.defaultMonth || _this.props.selectedDay || (0, _momentJalali2.default)(_this.props.min),
      selectedDay: _this.props.selectedDay || null,
      mode: 'days'
    }, _this.handleClickOnDay = function (selectedDay) {
      var onSelect = _this.props.onSelect;

      _this.selectDay(selectedDay);
      if (onSelect) {
        onSelect(selectedDay);
      }
    }, _this.days = null, _this.lastRenderedMonth = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        nextMonth: this.nextMonth.bind(this),
        prevMonth: this.prevMonth.bind(this),
        setCalendarMode: this.setMode.bind(this),
        setMonth: this.setMonth.bind(this)
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var selectedDay = _ref2.selectedDay,
          defaultMonth = _ref2.defaultMonth,
          min = _ref2.min;

      if (this.props.selectedDay !== selectedDay) {
        this.selectDay(selectedDay);
      } else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
        this.setMonth(defaultMonth);
      } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
        this.setMonth(min.clone());
      }
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.setState({ mode: mode });
    }
  }, {
    key: 'setMonth',
    value: function setMonth(month) {
      this.setState({ month: month });
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.setState({
        month: this.state.month.clone().add(1, 'jMonth')
      });
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      this.setState({
        month: this.state.month.clone().subtract(1, 'jMonth')
      });
    }
  }, {
    key: 'selectDay',
    value: function selectDay(selectedDay) {
      var month = this.state.month;

      // Because there's no `m1.isSame(m2, 'jMonth')`

      if (selectedDay.format('jYYYYjMM') !== month.format('jYYYYjMM')) {
        this.setState({ month: selectedDay });
      }

      this.setState({ selectedDay: selectedDay });
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(event) {
      if (this.props.onClickOutside) {
        this.props.onClickOutside(event);
      }
    }
  }, {
    key: 'renderMonthSelector',
    value: function renderMonthSelector() {
      var month = this.state.month;
      var styles = this.props.styles;

      return _react2.default.createElement(_MonthSelector2.default, { styles: styles, selectedMonth: month });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this2 = this;

      var _state = this.state,
          month = _state.month,
          selectedDay = _state.selectedDay;
      var _props = this.props,
          children = _props.children,
          min = _props.min,
          max = _props.max,
          styles = _props.styles,
          outsideClickIgnoreClass = _props.outsideClickIgnoreClass;


      var days = void 0;

      if (this.lastRenderedMonth === month) {
        days = this.days;
      } else {
        days = (0, _momentHelper.getDaysOfMonth)(month);
        this.days = days;
        this.lastRenderedMonth = month;
      }

      return _react2.default.createElement(
        'div',
        null,
        children,
        _react2.default.createElement(_DaysViewHeading2.default, { styles: styles, month: month }),
        _react2.default.createElement(_DaysOfWeek2.default, { styles: styles }),
        _react2.default.createElement(
          'div',
          { className: styles.dayPickerContainer },
          days.map(function (day) {
            var isCurrentMonth = day.format('jMM') === month.format('jMM');
            var disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
            var selected = selectedDay ? selectedDay.isSame(day, 'day') : false;

            return _react2.default.createElement(_Day2.default, {
              key: day.format('YYYYMMDD'),
              onClick: _this2.handleClickOnDay,
              day: day,
              disabled: disabled,
              selected: selected,
              isCurrentMonth: isCurrentMonth,
              styles: styles
            });
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          selectedDay = _props2.selectedDay,
          min = _props2.min,
          max = _props2.max,
          onClickOutside = _props2.onClickOutside,
          outsideClickIgnoreClass = _props2.outsideClickIgnoreClass,
          styles = _props2.styles,
          className = _props2.className;
      var mode = this.state.mode;


      return _react2.default.createElement(
        'div',
        { className: styles.calendarContainer + ' ' + className },
        mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays()
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  min: _react.PropTypes.object,
  max: _react.PropTypes.object,
  styles: _react.PropTypes.object,
  selectedDay: _react.PropTypes.object,
  defaultMonth: _react.PropTypes.object,
  onSelect: _react.PropTypes.func,
  onClickOutside: _react.PropTypes.func,
  containerProps: _react.PropTypes.object
};
Calendar.childContextTypes = {
  nextMonth: _react.PropTypes.func.isRequired,
  prevMonth: _react.PropTypes.func.isRequired,
  setCalendarMode: _react.PropTypes.func.isRequired,
  setMonth: _react.PropTypes.func.isRequired
};
Calendar.defaultProps = {
  styles: require('./styles'),
  containerProps: {}
};
exports.default = (0, _reactOnclickoutside2.default)(Calendar);