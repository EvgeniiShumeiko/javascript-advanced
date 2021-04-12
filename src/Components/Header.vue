<template>
    <b-navbar type="dark" sticky variant="dark">
      <b-container>
        <b-navbar-brand>{{ message }}</b-navbar-brand>

        <template v-if="showCart">
          <b-button variant="success" type="button" v-b-modal.cart>Корзина</b-button>
          <Cart />
        </template>

      </b-container>
    </b-navbar>
</template>

<script>
import Cart from "./Cart"
export default {
  name: "Header",
  components: {
    Cart
  },
  props: {
    message: {
      type: String,
      default: "Store"
    },
    showCart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
}
</script>

<style>

</style>