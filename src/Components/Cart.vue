<template>
  <b-modal id="cart" title="Корзина" cancel-title="Очистить корзину" @cancel="clearCart" ok-title="Оформить заказ" ok-variant="success">
    <b-row>
      <CartItem v-for="item in data" :key="item.id" :item="item"></CartItem>
    </b-row>
  </b-modal>

</template>

<script>
import CartItem from "./CartItem";

export default {
  name: "Cart",
  components: {
    CartItem
  },
  data() {
    return {
      data: [
        {id: 1, image: "https://picsum.photos/500?random=1", name: "Intelligent Granite Fish", price: 89},
        {id: 2, image: "https://picsum.photos/500?random=2", name: "Sleek Steel Sausages", price: 95}
      ]
    }
  },
  methods: {
    clearCart(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.data = []
    }
  },

}
</script>

<style scoped>

</style>