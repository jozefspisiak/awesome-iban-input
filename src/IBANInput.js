import React, { Component } from 'react';

const MAX_IBAN_SIZE = 24;
const IBAN_SPACING = 4;

export default class IBANInput extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  updateIBANValue(value) {
    const clearedValue = value.replace(/ /g,'');

    if (clearedValue.length > MAX_IBAN_SIZE) {
      return;
    }

    this.setState({
      ...this.state,
      value: clearedValue,
    });
  }

  formatIBAN(value) {
    return value.split('').map((char, index) => {
      const delimeter = index %  IBAN_SPACING === (IBAN_SPACING - 1) ? ' ' : '';
      return char + delimeter;
    }).join('').trim();
  }

  onChange = (evt) => {
    this.updateIBANValue(evt.target.value);
  }

  render() {
    return (
      <input
        type="text"
        style= {{ width: "100%" }}
        value={ this.formatIBAN(this.state.value) }
        onChange={ this.onChange }
      />
    );
  }
}
