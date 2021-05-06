<template>
  <div>
    <b-row cols-sm="2" cols-md="3" cols-lg="4" cols="1" class="g-3">
      <b-col v-for="item in catalogList" :key="item">
        <CatalogItem :id="item"/>
      </b-col>
    </b-row>
    <b-row col="12" class="m-3">
      <b-col>
        <infinite-loading v-if="catalogList.length" spinner="spiral"  @infinite="_infiniteScroll">
          <div slot="no-more">Все товары загружены</div>
        </infinite-loading>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import CatalogItem from "./CatalogItem";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Catalog",
  data() {
    return {
      offset: 1
    }
  },
  components: {
    CatalogItem
  },
  computed: {
    ...mapGetters([
        'catalogList',
    ])
  },
  methods: {
    ...mapActions([
        'loadProducts'
    ]),
    _infiniteScroll($state) {
      this.loadProducts(++this.offset)
          .then((data) => {
            if (data.length === 0) {
              return $state.complete();
            }
            $state.loaded()
          })
          .catch((err) => {
            console.warn('Something went wrong, when list tried init', err)
            $state.complete()
          })
      return true;
    }
  },
  created () {
    this.loadProducts();
  }
}
</script>

<style>

</style>