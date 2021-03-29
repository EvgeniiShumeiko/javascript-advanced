<template>
  <b-row cols-sm="2" cols-md="3" cols-lg="4" cols="1" class="g-3">
    <b-col v-for="item in data" :key="item.id">
      <CatalogItem :key="item.id" :image="item.image" :name="item.name" :price="item.price"/>
    </b-col>
  </b-row>
</template>

<script>
import CatalogItem from "./CatalogItem";

export default {
  name: "Catalog",
  data() {
    return {
      data: []
    }
  },
  components: {
    CatalogItem
  },
  methods: {
    _fetchData(limit = 1) {
      return fetch(`/database/data${limit}.json`)
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            console.log(data.data)
            return data.data;
          })
    }
  },
  beforeMount() {
    this._fetchData().then((data) => {
      this.data = data
    })
  }
}
</script>

<style>

</style>