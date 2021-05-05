<template>
    <b-card :img-src="product.image" :img-alt="product.name" img-top tag="div">
      <b-card-title class="card-title-extension">
        {{product.name}}
      </b-card-title>
      <b-card-text>
        {{ product.price }}₽
      </b-card-text>
      <b-button v-on:click="pushItemToCart">Добавить в корзину</b-button>
    </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "CatalogItem",
  methods: {
    ...mapActions([
        'getProductById',
        'addToCart'
    ]),
    pushItemToCart(event) {
      this.addToCart(this.id)
    }
  },
  computed: {
    ...mapGetters([
        'products'
    ])
  },
  data () {
     return {
       product: {
         name: "Test",
         image: "https://picsum.photos/500?random=1",
         price: 0
       }
    }
  },
  props: {
    id: String
  },
  created() {
    this.getProductById(this.id)
        .then(product => {
          if (product) {
            this.product = product
          }
        });

  }
}
</script>

<style lang="scss" type="text/scss" module>
  .card-title-extension {
    min-height: 52px;
    max-height: 52px;
    overflow: hidden;
  }
</style>

