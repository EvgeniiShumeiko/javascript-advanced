"use strict";

import Component from "../base/Component";

export default class Input extends Component {

    _classNames = ['form-control']
    value = ""

    constructor({type = "text", id = "", name = "", required = false}, onChange = null) {
        super();
        this._cb = onChange;
        this._name = name;
        this._id = id;
        this._type = type
        this._required = required

        this.onChange = this.onChange.bind(this)
    }

    setClasses(...classNames) {
        if (classNames.length > 0) {
            this._classNames = classNames;
        }
    }

    onChange(event) {
        let value = event.target.value;
        this.value = value;
        if (this._cb) {
            this._cb(value);
        }
    }

    isRequired() {
        return this._required
    }

    render() {
        let input = document.createElement('input');
        input.classList.add(...this._classNames);
        input.type = this._type;
        // if (this._required) {
        //     input.required = true
        // }

        if (this._id) {
            input.id = this._id;
        }

        if (this._name) {
            input.name = this._name;
        }

        input.addEventListener('keyup', this.onChange)

        return input;

    }

}
