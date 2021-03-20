"use strict";

import Button from "./Button";
import Component from "../base/Component";

export default class Counter extends Component {
    counter = 1
    constructor (counter, cb) {
        super();
        this._counter = counter;
        this._cb = cb;
    }

    onBtnClick(type) {
        const callback = this._cb

        if (type === 'increase') {
            this._counter++;
        } else {
            this._counter--;
        }

        if (typeof callback === 'function') {
            return callback(type);
        }
        console.info(`COUNTER: ${type} clicked!`);

    }

    render() {
        let wrapper = document.createElement('div');
        let span = document.createElement('span');
        let increaseButton = new Button('+', this.onBtnClick.bind(this, 'increase'))
        let decreaseButton = new Button('-', this.onBtnClick.bind(this, 'decrease'))

        span.classList.add('mx-2');
        span.innerText = this._counter;

        increaseButton.setClasses('btn', 'btn-outline-secondary', 'btn-counter', 'btn-sm', 'd-flex')
        decreaseButton.setClasses('btn', 'btn-outline-secondary', 'btn-counter', 'btn-sm', 'd-flex')

        wrapper.classList.add('d-flex', 'mb-4');


        increaseButton.pushComponent(wrapper);
        wrapper.insertAdjacentElement('beforeend', span);
        decreaseButton.pushComponent(wrapper)

        return wrapper;
    }


}
