<template>
  <b-modal id="cart" title="Корзина" cancel-title="Очистить корзину" @cancel="clearCart" ok-title="Оформить заказ" ok-variant="success">
    <b-row>
      <CartItem v-for="item in cartList" :key="item.id" :item="item"></CartItem>
      <p v-if="Object.keys(cartList).length === 0">
        Корзина пуста
      </p>
    </b-row>

  </b-modal>

</template>

<script>
import CartItem from "./CartItem";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      data: [
        {id: 1, image: "https://picsum.photos/500?random=1", name: "Intelligent Granite Fish", price: 89},
        {id: 2, image: "https://picsum.photos/500?random=2", name: "Sleek Steel Sausages", price: 95}
      ]
    }
  },
  computed: {
    ...mapGetters([
        'cartList'
    ])
  },
  methods: {
    ...mapActions([
        'loadCart'
    ]),
    clearCart(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$store.commit('clearCart')
    }
  },
  created () {
    this.loadCart();
  }

}
</script>

<style>

</style>