class GoodsList extends Component {
    cards = []
    cart = null
    constructor (el, cart) {
        super(el);

        this.cart = cart;
        this._fillGoodsList();
        this.mountComponent();
        this._getCart = this._getCart.bind(this);
    }

    _fillGoodsList () {
        let goodsObj = this._fetchGoods()
        this.goods = goodsObj.map(goods => new GoodsComponent(goods, this._getCart()));
    }

    _fetchGoods () {
        let products = [];
        for (let i = 0; i < 100; i++ ) {
            let id = i+1;
            products.push({
                id: id,
                name: faker.commerce.productName(),
                image: 'https://picsum.photos/500?random='+id,
                price: Math.floor((Math.random()*1000)/(Math.random()*10))
            })
        }
        return products;
    }

    _getCart() {
        return this.cart;
    }

    render () {
        let goods = this.goods;

        let goodsList = document.createElement('div');
        goodsList.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-3');
        for (let g of goods) {
            g.pushComponent(goodsList)
        }

        return goodsList;
    }

}