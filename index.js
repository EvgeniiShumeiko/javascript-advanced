const path = require('path');

/**
 * Инициализация Express и его middleware
 */
const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    session = require('express-session');

/**
 * Утилита управленя базой данных
 * @type {{}}
 */
const db = require('./server/utitlity/sqllite')

/**
 * Конфигурация
 * @type {{static: string, port: (number|number)}}
 */
const config = {
    port: +process.env.PORT || 3000,
    static: path.join(__dirname, './public')
}

/**
 * Подключение глобальных Middleware
 */
app.use(express.static(config.static));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:7777',
    optionsSuccessStatus: 200
}));

app.use(session({
    secret: 'testkey',
    resave: false,
    saveUninitialized: true
}))

/**
 * Midleware установки корзины для сессии
 */
app.use(function (req, res, next) {
    if (!req.session.cart) {
        req.session.cart = {};
    }

    next();
})


/**
 * Маршрут для получения каталога с пагинацией
 */
app.get('/api/v1/catalog/:page',  (req, res) => {
    let page = req.params.page - 1;
    if (page < 0) {
        return res.status(400).json({success: 'bad', error:'Page is positive integer'})
    }

    let limit = 20;
    let offset = page * limit;

    let query = db.prepare('select * from products ORDER BY id DESC LIMIT ?, ?')
    query.all([offset, limit], function (err, data) {
        res.json({success: 'ok', data: data});
    })
})

/**
 * Маршрут для добавления нового эемента в каталог
 */
app.post('/api/v1/catalog/add', (req, res) => {
    let {name, cost, image} = req.body
    let insertQuery = db.prepare(`insert into products(name,image,price) values (?, ?, ?);`);
    insertQuery.run([name, image, cost], function (err, data) {
        res.json({success: 'ok', data: {id: this.lastID}})
    })

})

/**
 * Маршрут для отображения содержимого корзины для текущей сессии
 */
app.get('/api/v1/cart', (req, res) => {
    res.json({success: 'ok', data: req.session.cart});
});

/**
 * Маршрут добавления товара в корзину
 */
app.post('/api/v1/cart/add', (req, res) => {
    let { id } = req.body;

    let query = db.prepare("select id from products where id = ?");
    query.get([id], (err, data) => {
        if (data === undefined || err) {
            res.status(400).json({success: 'bad', error: 'id is not found'})
            return;
        }

        let product = req.session.cart[id];
        let count = 1;
        if (product) {
            count = product.count+1;
        }
        req.session.cart[id] = {id: id, count: count};
        res.json({success: 'ok'});
    });

});

/**
 * Маршрут для удаления товара из корзины
 */
app.post('/api/v1/cart/remove', (req, res) => {
    let { id } = req.body;

    let product = req.session.cart[id];
    if (product === undefined) {
        return res.status(400).json({success: 'bad', error: 'id is not found'})
    }

    let cart = req.session.cart;
    delete cart[id];
    req.session.cart = cart;

    res.json({success: 'ok'});

});

const server = app.listen(config.port)


process.on('SIGINT', () => {
    //FIXME: разобраться как правильно закрывать соединение с базой данных
    // db.close();
    server.close();
});

