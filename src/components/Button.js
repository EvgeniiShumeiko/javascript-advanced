"use strict";

import Component from "../base/Component";

export default class Button extends Component {
  _classNames = ['btn', 'btn-outline-success']

  constructor (text, cb, params = {type: null}) {
    super();
    this._text = text;
    this._cb = cb;
    this._type = params.type;
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  setClasses(...classNames) {
    if (classNames.length > 0) {
      this._classNames = classNames
    }
  }

  onBtnClick() {
    const callback = this._cb
    if (typeof callback === 'function') {
      return callback();
    }
    console.log('clicked');

  }

  render() {
    let btn = this._getElement();
    btn.addEventListener('click', () => {
      this.onBtnClick();
    });
    return btn;
  }

  _getElement() {
    let btn = document.createElement('button');
    btn.classList.add(...this._classNames);
    btn.innerText = this._text;
    if (this._type) {
      btn.type = this._type;
    }
    return btn;
  }

}
