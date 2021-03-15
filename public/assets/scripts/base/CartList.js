class CartList extends Map {
    set(id, value) {
        if (value instanceof CartItem) {
            super.set(id, value)
        }
    }
}
