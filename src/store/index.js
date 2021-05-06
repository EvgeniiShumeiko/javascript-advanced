import Vuex from 'vuex'
import Vue from "vue";
import api from "../utils/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: {},
        cartList: {},
        catalogList: []
    },
    getters: {
        products (state) {
            return state.products
        },
        cartList (state) {
            return state.cartList
        },
        catalogList (state) {
            return state.catalogList
        }
    },
    mutations: {
        addToCart (state, payload) {
            let item = {}
            item[payload.id] = payload
            console.log(state.cartList)

            state.cartList = {...state.cartList, ...item}
        },
        incrementItemInCart(state, id) {
            const item = state.cartList[id];
            if (item) {
                item.count++;
            }
        },
        decrementItemInCart(state, id) {
            const item = state.cartList[id];
            if (item) {
                item.count--;
            }
        },
        removeFromCart (state, id) {
            let items = state.cartList;
            delete items[id];
            state.cartList = {...items}

        },
        clearCart(state) {
            state.cartList = {};
        },
        initProducts (state, products) {
            let catalog = {}
            for (let item of products) {
                catalog[item.id] = item
            }
            state.products = {...state.products, ...catalog}
            state.catalogList = Object.keys(state.products)
        },
        initCart (state, cartList) {
            console.log(cartList)
            state.cartList = cartList
        }
    },
    actions: {
        loadProducts ({commit}, offset = 1) {
            return api.fetchProducts(offset)
                .then((data) => {
                    commit("initProducts", data)
                    return data;
                })
        },
        loadCart ({commit}) {
            return api.fetchCart()
                .then((data) => {
                    console.log(data)
                    commit("initCart", data)
                    return data;
                })
        },
        getProductById ({state}, id) {
            return state.products[id] || false
        },
        addToCart({state, commit}, id) {
            api.addToCart(id)
                .then((data) => {
                    if (!state.cartList.hasOwnProperty(id)) {
                        commit('addToCart',  {id: id, count: 1})
                    } else {
                        commit('incrementItemInCart', id)
                    }
                })
        },
        changeCounter({state, commit}, {id, type}) {
            if (type === "increase") {
                commit('incrementItemInCart', id)
            } else {
                commit('decrementItemInCart', id)
            }
        },
        removeFromCart({state, commit}, id) {
            api.removeFromCart(id)
                .then((data) => {
                    if (state.cartList.hasOwnProperty(id)) {
                        commit('removeFromCart', id)
                    }
                })
        }
    }
})