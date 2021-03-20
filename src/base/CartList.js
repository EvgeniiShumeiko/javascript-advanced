import CartItem from "../components/CartItem";

export default class CartList extends Map {
    set(id, value) {
        if (value instanceof CartItem) {
            super.set(id, value)
        }
    }
}
