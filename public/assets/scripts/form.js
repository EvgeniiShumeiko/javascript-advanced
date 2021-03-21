"use strict";

class Input extends Component {
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

class FormField extends Component {
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

class Form extends Component {
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


let form = document.querySelector('#form');
let formComponent = new Form();
formComponent.addField(
    new FormField(
    {label: 'Имя', id: 'name', type: 'text', name: 'name', required: true},
(value, context) => {
        let re = /^[A-zА-я]+$/g;
        if (!re.test(value)) {
            context.showError('Имя может содержать только буквы')
            return false;
        }
        return true
    })
)
formComponent.addField(
    new FormField({label: 'E-Mail', id: 'email', type: 'text', name: 'email', required: true},
    (value, context) => {
        let re = /^([\w-(\.){1}]{1,64})@([\w-]+)(\.[\w-]+){1,4}\w{2,10}$/ig;
        if (!re.test(value)) {
            context.showError('Введите корректный E-mail')
            return false;
        }
        return true
    })
)
formComponent.addField(
    new FormField({label: 'Номер телефона', id: 'phone', type: 'text', name: 'phone', required: true},
    (value, context) => {
        let re = /^((8|\+7)[\- ]?)(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g;
        if (!re.test(value)) {
            context.showError('Введите корректный номер телефона')
            return false;
        }
        return true
    })
)
formComponent.mountComponent(form);
