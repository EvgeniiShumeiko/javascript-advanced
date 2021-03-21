"use strict";

import CartItem from "./CartItem";
import Button from "./Button";
import Component from "../base/Component";
import CartList from "../base/CartList";

export default class Cart extends Component {

    constructor(el) {
        super(el);
        this.items = new CartList();
        this._createWrapper()
        this._initButtons();
    }

    add(goods) {
        let cartItem = this.items.get(goods.id);

        if (!cartItem) {
            cartItem = new CartItem(goods, this)
            this.items.set(cartItem.id, cartItem)
        } else {
            cartItem.increment();
        }
        this.mountComponent();
        alert('Товар добавлен в корзину!')
        return true;
    }

    remove(id) {
        if (this.items.has(id)) {
            this.items.delete(id)
            this.mountComponent()
        }

    }

    increment(id) {
        let goods = this.items.get(id);
        if (goods) {
            goods.increment();
        }
    }

    decrement(id) {
        let goods = this.items.get(id);
        if (!goods) {
            return false
        }
        let count = goods.decrement();
        if (count === 0) {
            this.remove(id)
        }
    }

    clearCart() {
        this.items.clear();
        this.mountComponent()
    }

    _calculateSummary() {
        let items = this.items
        let summary = 0;
        items.forEach((item) => {
            summary += (item.goods.price * item.count)
        });
        return summary
    }

    _initButtons() {
        let buttonsWrapper = document.querySelector('#cart-buttons');
        let clearButton = new Button('Очистить', this.clearCart.bind(this))
        if (buttonsWrapper) {
            clearButton.mountComponent(buttonsWrapper);
        }
    }

    _initSummary() {
        let summary = this._calculateSummary();
        let place = document.querySelector('#cart-summary');

        if (place) {
            place.innerText = summary + '₽'
        }
    }

    _createWrapper() {
        let block = document.createElement('div');
        block.classList.add('row');
        return block;
    }

    render() {
        let block = this._createWrapper();
        this.items.forEach((item) => {
            item.pushComponent(block)
        })

        this._initSummary();

        return block;
    }


}