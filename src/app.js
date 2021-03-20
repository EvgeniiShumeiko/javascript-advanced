"use strict";

import Cart from "./components/Cart";
import Form from "./components/Form";
import GoodsList from "./components/GoodsList";
import FormField from "./components/FormField";

import "./styles/style.sass"

class App {
  constructor () {
    this.render();
  }

  runCatalog() {
    let goodsElement = document.querySelector('#app');
    let cartElement = document.querySelector('#cart-list');

    let cart = new Cart(cartElement)
    new GoodsList(goodsElement, cart)
  }

  runForm() {
    let form = document.querySelector('#app');
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
  }

  render() {
    let route = location.pathname.split('/').filter(i => i)

    if (route[0] && route[0] === "form") {
      return this.runForm();
    }

    return this.runCatalog();

  }
}


let app = new App();
