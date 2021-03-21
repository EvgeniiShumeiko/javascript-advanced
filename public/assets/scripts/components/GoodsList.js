class GoodsList extends Component {
    goods = [];
    isEndOfList = false;
    cart = null;
    offset = 0;
    constructor (el, cart) {
        super(el);
        this._getCart = this._getCart.bind(this);
        this._checkScroll = this._checkScroll.bind(this);

        this.cart = cart;

        this.mountComponent();
        this._checkScroll();
        this._scrollEventListener();
    }

    _checkScroll() {
        let scrollCheck = this._getScrollCheck()
        if (scrollCheck !== null && scrollCheck.getBoundingClientRect().top <= window.innerHeight) {
            this._initList();
        }
    }

    _scrollEventListener(){
        document.addEventListener('scroll', this._checkScroll)
    }

    _initList () {
        if (this.isEndOfList) {
            return false;
        }

        let fetchPromise = this._fetchGoods(++this.offset)
        fetchPromise
            .then((goodsObj) => {
                this.goods = [...this.goods, ...goodsObj.map(goods => new GoodsItem(goods, this._getCart()))];
                this.mountComponent();
            })
            .catch(() => {
                this.isEndOfList = true
                console.warn('Something went wrong, when list tried init')
            })

        return true;
    }

    _fetchGoods (limit = 1) {
        return fetch(`/database/data${limit}.json`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                return data.data;
            })
    }

    _getCart() {
        return this.cart;
    }

    _getScrollCheck() {
        let scrollCheck = document.querySelector('.scrollCheck');
        return scrollCheck || null;
    }

    _createScrollCheck() {
        let scrollCheck = document.createElement('div');
        scrollCheck.classList.add('scrollCheck');
        return scrollCheck;
    }

    _createGoodsList() {
        let goodsList = document.createElement('div');
        goodsList.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-3', 'goodsList');
        return goodsList;
    }

    render () {
        let goods = this.goods;
        let goodsList = this._createGoodsList();

        for (let g of goods) {
            g.pushComponent(goodsList)
        }

        let scrollCheck = this._createScrollCheck();
        goodsList.insertAdjacentElement('beforeend', scrollCheck);

        return goodsList;
    }

}