<template>
  <b-card :title="item.name" :img-src="item.image" img-alt="item.name" img-left img-width="140px" class="p-0 mb-2">
    <b-card-text>
      {{ item.price }}₽
    </b-card-text>
    <div class="card__actions">
      <RangeButtons :defaultValue="count" @counterChanged="" />
      <b-button variant="outline-danger mt-2" >Удалить</b-button>
    </div>
  </b-card>
</template>

<script>
import RangeButtons from "./RangeButtons";

export default {
  name: "CartItem",
  components: {
    RangeButtons
  },
  props: {
    item: {
      type: Object,
      default: {
        id: 0,
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
  methods: {
    counterChanged({counter = 1}) {
      this.count = counter;
    }
  },
}
</script>

<style>
.card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>