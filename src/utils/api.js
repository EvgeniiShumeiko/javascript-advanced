const api = {
    fetchProducts (offset = 1) {
        return this._request(`catalog/${offset}`)

    },
    fetchCart() {
        return this._request(`cart`, {headers: {"atuh": "asd"}})
    },
    addToCart(id) {
        return this._request(`cart/add`, {method: "POST", body:  JSON.stringify({id: id}), headers: {"atuh": "asd"}})
    },
    removeFromCart(id) {
        return this._request(`cart/remove`, {method: "POST", body:  JSON.stringify({id: id})})
    },

    _request(action, params = {}) {
        params = {
            ...params,
            headers: {
                ...params.headers,
                "Content-Type": "application/json"
            }
        }
        return fetch(`/api/v1/${action}`, params)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                return data.data;
            })
    }
}

export default api