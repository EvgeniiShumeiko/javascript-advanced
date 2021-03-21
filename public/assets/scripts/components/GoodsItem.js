"use strict";

class GoodsItem extends Component {
  constructor (data, cart) {
    super();
    this.goods = new Goods(data);
    this.cartInstance = cart

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    this.cartInstance.add(this.goods);
  }

  createTitle() {
    let goods = this.goods;
    let title = document.createElement('h5');
    title.classList.add('card-title', 'mb-3')
    title.innerText = goods.name
    return title;
  }

  createPrice() {
    let price = document.createElement('p');
    price.innerText = this.goods.price + '₽'

    return price;
  }

  createCardBody() {
    let cardBody = document.createElement('div');
    let title = this.createTitle();
    let price = this.createPrice()
    let btn = new Button('Добавить в корзину', this.addToCart);

    cardBody.classList.add('card-body')
    cardBody.append(title)
    cardBody.append(price)
    btn.pushComponent(cardBody)
    return cardBody;
  }

  render () {
    let goods = this.goods;
    let card = document.createElement('div')
    let col = document.createElement('div')
    let cardBody = this.createCardBody();

    col.classList.add('col');

    card.id = 'goods-'+goods.id;
    card.classList.add('card');

    card.insertAdjacentHTML('afterbegin', `<img src="${goods.image}" alt="${goods.name}" class="card-img-top">`);
    card.append(cardBody);

    col.insertAdjacentElement('afterbegin', card)
    return col;
  }
}
