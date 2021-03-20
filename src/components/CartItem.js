"use strict";

import Button from "./Button";
import Counter from "./Counter";
import Component from "../base/Component";


export default class CartItem extends Component {
    count = 1;

    constructor(goods, cart) {
        super()
        this.id = goods.id;
        this.goods = goods;
        this._cart = cart;
    }

    removeItem() {
        this._cart.remove(this.id)
    }

    increment() {
        let count = ++this.count;
        if (count >= 100) {
            return  alert('Вы достигли максимального значения!')
        }

        return count;
    }

    decrement() {
        if (this.count < 2) {
            return this.count;
        }

        return  --this.count;
    }

    render() {
        let goods = this.goods;
        let block = document.createElement('div');
        let removeBtn = new Button('Удалить', this.removeItem.bind(this));
        let counter = new Counter(this.count, (type) => {
            if (type === 'increase') {
                this.increment()
            } else {
                this.decrement()
            }
            this._cart.mountComponent();
        })

        block.classList.add('card', 'mb-2', 'p-0');

        block.innerHTML = `
                <div class="row g-0">
                    <div class="col-3">
                        <img style="width: 100%;" src="${goods.image}"  alt="${goods.name}">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h5 class="card-title">${goods.name}</h5>
                            <p class="card-text">${goods.price}₽</p>
                        </div>
                    </div>
                </div>
        `;
        let cartBody = block.querySelector('.card-body');

        if (cartBody) {
            counter.pushComponent(cartBody)
            removeBtn.pushComponent(cartBody);
        }

        return block;
    }
}