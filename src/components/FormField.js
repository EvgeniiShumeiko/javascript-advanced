"use strict";

import Component from "../base/Component";
import Input from "./Input";

export default class FormField extends Component {
    _inputObject = null
    error = ""
    value = ""

    constructor({label, id, name, type, required}, validate = null) {
        super();
        this._label = label
        this._id = id
        this._name = name
        this._type = type
        this._required = required
        this._validate = validate

        this._onChange = this._onChange.bind(this)
    }

    validate() {
        let input = this._inputObject;
        if (input.isRequired() && input.value.trim() === "") {
            this.showError('Поле обязательно к заполненеию')
            return false;
        }

        if (this._validate) {
            return this._validate(this.value, this)
        }
    }

    showError(text) {
        //TODO: вывод ошибок в HTML
        alert(text)
    }

    render() {
        let block = document.createElement('div');
        block.classList.add('mb-3');

        let label = `<label for="${this._id}" class="form-label">${this._label}</label>`
        block.insertAdjacentHTML('afterbegin', label)

        let input = this._inputObject;
        if (!input) {
            input = new Input({type: this._type, id: this._id, name: this._name, required: this._required}, this._onChange)
        }

        input.pushComponent(block)
        this._inputObject = input;

        return block;
    }

    _onChange(value) {
        this.value = value;
    }

}
