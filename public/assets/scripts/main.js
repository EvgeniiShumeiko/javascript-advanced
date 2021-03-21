"use strict";

class App {
  constructor () {
    this.render();
  }

  render() {
    let goodsElement = document.querySelector('#app');
    let cartElement = document.querySelector('#cart-list');

    let cart = new Cart(cartElement)
    new GoodsList(goodsElement, cart)
  }
}


let app = new App();
