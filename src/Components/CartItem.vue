<template>
  <b-card :title="item.name" :img-src="item.image" img-alt="item.name" img-left img-width="140px" class="p-0 mb-2">
    <b-card-text>
      {{ item.price }}₽
    </b-card-text>
    <b-button variant="outline-danger" >Удалить</b-button>
  </b-card>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      default: {
        name: "",
        image: "",
        price: "",
      }
    }
  },
  data() {
    return {
      count: 1
    }
  },
}
</script>

<style>

</style>