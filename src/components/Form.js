"use strict";
import Component from "../base/Component";
import FormField from "./FormField";
import Button from "./Button";


export default class Form extends Component {
    _formFields = []
    constructor() {
        super();
    }

    validate() {
        let errors = [];
        this._formFields.forEach((field) => {
            errors.push(field.validate())
        });
        return errors;
    }

    addField(field) {
        if (field instanceof FormField) {
            this._formFields.push(field)
        }
    }

    render() {
        let form = this._createFormElement();

        this._formFields.forEach((field) => {
            field.pushComponent(form);
        });

        let btn = new Button('Отправить', () => {}, {type: 'submit'});
        btn.setClasses('btn', 'btn-primary');
        btn.pushComponent(form);

        return form;
    }

    _createFormElement() {
        let form = document.createElement('form');
        form.method="POST";
        form.action="/feedback";
        form.classList.add("col-5", "m-auto")
        form.addEventListener('submit', (event) => this._setEventListener(event, form));
        return form;
    }

    _setEventListener(event, form) {
        event.preventDefault();
        this.validate();
    }
}
