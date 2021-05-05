<template>
  <b-card :title="product.name" :img-src="product.image" :img-alt="product.name" img-left img-width="140px" class="p-0 mb-2">
    <b-card-text>
      {{ product.price }}₽
    </b-card-text>
    <div class="card__actions">
      <RangeButtons :defaultValue="item.count" @counterChanged="counterChanged" />

      <b-button @click="removeFromCart(item.id)" variant="outline-danger mt-2" >Удалить</b-button>
    </div>
  </b-card>
</template>

<script>
import RangeButtons from "./RangeButtons";
import {mapActions} from 'vuex';

export default {
  name: "CartItem",
  data() {
    return {
      product: {
        name: "Test",
        image: "https://picsum.photos/500?random=1",
        price: 0,
        count: 1
      }
    }
  },
  components: {
    RangeButtons
  },
  props: {
    item: {
      type: Object,
      default: {
        id: 0,
        count: 1
      }
    }
  },
  methods: {
    ...mapActions([
        'changeCounter',
        'getProductById',
        'removeFromCart'
    ]),
    counterChanged({counter = 1, type}) {
      this.changeCounter({id: this.item.id, type})
    },
    // removeItem() {
    //   this.removeFromCart(this.item.id)
    // }
  },
  created() {
    this.getProductById(this.item.id)
        .then(product => {
          if (product) {
            this.product = product
          }
        });
  }
}
</script>

<style>
.card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>