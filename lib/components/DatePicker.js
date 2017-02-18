'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outsideClickIgnoreClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _momentJalali = require('moment-jalali');

var _momentJalali2 = _interopRequireDefault(_momentJalali);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var outsideClickIgnoreClass = exports.outsideClickIgnoreClass = 'ignore--click--outside';

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: _this.props.disabled ? false : _this.props.isOpen || false,
      momentValue: _this.props.defaultValue || null,
      inputValue: _this.props.defaultValue ? _this.props.defaultValue.format(_this.props.inputFormat) : ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'setOpen',
    value: function setOpen(isOpen) {
      this.setState({ isOpen: isOpen });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && nextProps.value !== this.props.value) {
        this.setMomentValue(nextProps.value);
      }

      if (typeof nextProps.isOpen !== 'undefined') {
        if (nextProps.isOpen) {
          if (!this.props.disabled) {
            this.setOpen(true);
          }
        } else {
          this.setOpen(false);
        }
      }
    }
  }, {
    key: 'setMomentValue',
    value: function setMomentValue(momentValue) {
      var inputFormat = this.props.inputFormat;


      if (this.props.onChange) {
        this.props.onChange(momentValue);
      }

      var inputValue = momentValue.format(inputFormat);
      this.setState({ momentValue: momentValue, inputValue: inputValue });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setOpen(true);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(event) {
      var _props = this.props,
          onBlur = _props.onBlur,
          inputFormat = _props.inputFormat;
      var _state = this.state,
          isOpen = _state.isOpen,
          momentValue = _state.momentValue;


      if (isOpen) {
        this.refs.input.focus();
      } else if (onBlur) {
        onBlur(event);
      }

      if (momentValue) {
        var inputValue = momentValue.format(inputFormat);
        this.setState({ inputValue: inputValue });
      }
    }
  }, {
    key: 'handleClickOutsideCalendar',
    value: function handleClickOutsideCalendar() {
      this.setOpen(false);
    }
  }, {
    key: 'handleSelectDay',
    value: function handleSelectDay(selectedDay) {
      var oldValue = this.state.momentValue;

      var momentValue = selectedDay.clone();

      if (oldValue) {
        momentValue = momentValue.set({
          hour: oldValue.hours(),
          minute: oldValue.minutes(),
          second: oldValue.seconds()
        });
      }

      this.setMomentValue(momentValue);
      this.setOpen(false);
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var inputFormat = this.props.inputFormat;

      var inputValue = event.target.value;
      var momentValue = (0, _momentJalali2.default)(inputValue, inputFormat);

      if (momentValue.isValid()) {
        this.setState({ momentValue: momentValue });
      }

      this.setState({ inputValue: inputValue });
    }
  }, {
    key: 'handleInputClick',
    value: function handleInputClick(e) {
      if (!this.props.disabled) {
        this.setOpen(true);
      }
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _state2 = this.state,
          isOpen = _state2.isOpen,
          inputValue = _state2.inputValue;
      var _props2 = this.props,
          placeholder = _props2.placeholder,
          disabled = _props2.disabled,
          readOnly = _props2.readOnly,
          name = _props2.name,
          _onClick = _props2.onClick;

      var className = (0, _classnames3.default)(this.props.className, _defineProperty({}, outsideClickIgnoreClass, isOpen));

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            className: 'inputWrapper',
            onClick: function onClick(e) {
              _onClick && _onClick(e);
            }
          },
          _react2.default.createElement('input', {
            className: className,
            type: 'text',
            ref: 'input',
            onFocus: this.handleFocus.bind(this),
            onBlur: this.handleBlur.bind(this),
            onChange: this.handleInputChange.bind(this),
            onClick: this.handleInputClick.bind(this),
            value: inputValue,
            disabled: disabled,
            name: name,
            readOnly: readOnly,
            placeholder: placeholder
          })
        )
      );
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      var momentValue = this.state.momentValue;
      var _props3 = this.props,
          TimePicker = _props3.timePickerComponent,
          onChange = _props3.onChange,
          min = _props3.min,
          max = _props3.max,
          defaultMonth = _props3.defaultMonth,
          calendarStyles = _props3.calendarStyles,
          calendarContainerProps = _props3.calendarContainerProps;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Calendar2.default,
          {
            min: min,
            max: max,
            selectedDay: momentValue,
            defaultMonth: defaultMonth,
            onSelect: this.handleSelectDay.bind(this),
            onClickOutside: this.handleClickOutsideCalendar.bind(this),
            outsideClickIgnoreClass: outsideClickIgnoreClass,
            styles: calendarStyles,
            containerProps: calendarContainerProps
          },
          TimePicker ? _react2.default.createElement(TimePicker, {
            min: min,
            max: max,
            momentValue: momentValue,
            setMomentValue: this.setMomentValue.bind(this)
          }) : null
        )
      );
    }
  }, {
    key: 'removeDate',
    value: function removeDate() {
      var onChange = this.props.onChange;

      if (onChange) {
        onChange('');
      }
      this.setState({
        input: '',
        inputValue: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen;
      var _props4 = this.props,
          attachment = _props4.attachment,
          targetAttachment = _props4.targetAttachment;

      var _attachment = attachment ? attachment : 'top right';
      var _targetAttachment = targetAttachment ? targetAttachment : 'top right';

      return _react2.default.createElement(
        _reactTether2.default,
        {
          attachment: _attachment,
          targetAttachment: _targetAttachment
        },
        this.renderInput(),
        isOpen ? this.renderCalendar() : null
      );
    }
  }]);

  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  value: _react.PropTypes.object,
  defaultValue: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  children: _react.PropTypes.node,
  min: _react.PropTypes.object,
  max: _react.PropTypes.object,
  defaultMonth: _react.PropTypes.object,
  inputFormat: _react.PropTypes.string,
  removable: _react.PropTypes.bool,
  timePickerComponent: _react.PropTypes.func,
  calendarStyles: _react.PropTypes.object,
  calendarContainerProps: _react.PropTypes.object
};
DatePicker.defaultProps = {
  inputFormat: 'jYYYY/jM/jD',
  calendarStyles: require('./styles'),
  calendarContainerProps: {}
};
exports.default = DatePicker;