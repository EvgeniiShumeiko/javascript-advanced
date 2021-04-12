<template>
    <b-card :title="name" :img-src="image" :img-alt="name" img-top tag="div">
      <b-card-text>
        {{ price }}
      </b-card-text>
      <b-button>Добавить в корзину</b-button>
    </b-card>
</template>

<script>
export default {
  name: "CatalogItem",
  props: {
    name: {
      type: String,
      default: "Product"
    },
    price: {
      type: Number,
      default: 100
    },
    image: {
      type: String,
      default: "https://picsum.photos/500?random=1"
    }
  }
}
</script>

<style>

</style>