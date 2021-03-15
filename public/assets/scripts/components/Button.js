"use strict";

class Button extends Component {
  _classNames = ['btn', 'btn-outline-success']
  constructor (text, cb) {
    super();
    this._text = text;
    this._cb = cb;
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
    return btn;
  }

}
