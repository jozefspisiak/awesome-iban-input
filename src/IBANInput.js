import React, { Component } from 'react';

const MAX_IBAN_SIZE = 24;
const IBAN_SPACING = 4;
const IBAN_START_CHARS_COUNT = 2;
const IBAN_ALERT_DURATION = 1000;
const IBAN_ALERT_COLOR = 'red';
const IBAN_DEFAULT_COLOR = 'white';

export default class IBANInput extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      backgroundColor: IBAN_DEFAULT_COLOR,
    };
  }

  isLastIBANCharValid(value) {
    if (value.length === 0) {
      return true;
    }
    const lastChar = value[value.length - 1].toLowerCase();
    if (value.length <= IBAN_START_CHARS_COUNT) {
      return lastChar >= 'a' && lastChar <= 'z';
    }
    const number = Number(lastChar);
    return number >= 0 && number <= 9;
  }

  isIBANValid(value) {
    return value.length <= MAX_IBAN_SIZE && this.isLastIBANCharValid(value);
  }

  updateIBAN(value) {
    const clearedValue = value.replace(/ /g,'');

    let newState;
    if (this.isIBANValid(clearedValue)) {
      newState = { value: clearedValue };
    } else {
      newState = { backgroundColor: IBAN_ALERT_COLOR };
      this.createAlertCleanerTimeout();
    }

    this.setState(newState);
  }

  createAlertCleanerTimeout() {
    setTimeout(() => {
      this.setState({
        backgroundColor: IBAN_DEFAULT_COLOR
      });
    }, IBAN_ALERT_DURATION);
  }

  formatIBAN(value) {
    return value.split('').map((char, index) => {
      const delimeter = index %  IBAN_SPACING === (IBAN_SPACING - 1) ? ' ' : '';
      return char + delimeter;
    }).join('').trim();
  }

  onChange = (evt) => {
    this.updateIBAN(evt.target.value);
  }

  render() {
    return (
      <input
        type="text"
        style= {{
          width: "100%",
          backgroundColor: this.state.backgroundColor
        }}
        value={ this.formatIBAN(this.state.value) }
        onChange={ this.onChange }
      />
    );
  }
}
