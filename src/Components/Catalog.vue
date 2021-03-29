<template>
  <div>
    <b-row cols-sm="2" cols-md="3" cols-lg="4" cols="1" class="g-3">
      <b-col v-for="item in data" :key="item.id">
        <CatalogItem :key="item.id" :image="item.image" :name="item.name" :price="item.price"/>
      </b-col>
    </b-row>
    <b-row col="12" class="m-3">
      <b-col>
        <infinite-loading v-if="data.length" spinner="spiral"  @infinite="_infiniteScroll">
          <div slot="no-more">Нууу, это точно Дно</div>
        </infinite-loading>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import CatalogItem from "./CatalogItem";

export default {
  name: "Catalog",
  data() {
    return {
      data: [],
      offset: 1
    }
  },
  components: {
    CatalogItem
  },
  methods: {
    async _fetchData(offset = 1) {
      return fetch(`/database/data${offset}.json`)
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            return data.data;
          })
    },
    _infiniteScroll($state) {
      let fetchPromise = this._fetchData(++this.offset)
      fetchPromise
          .then((data) => {
            this.data = [...this.data, ...data];
            $state.loaded()
          })
          .catch((err) => {
            console.warn('Something went wrong, when list tried init', err)
            $state.complete()
          })

      return true;
    }
  },
  created() {
    this._fetchData().then((data) => {
      this.data = data
    })
  }
}
</script>

<style>

</style>