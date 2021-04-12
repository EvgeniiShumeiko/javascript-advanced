<template>
  <div>
    <Header :show-cart="true"/>
    <b-container class="mt-5">
      <Catalog/>
    </b-container>
  </div>
</template>

<script>
import Header from "./Components/Header";
import Catalog from "./Components/Catalog";

export default {
  data() {
    return {
      counter: 0
    }
  },
  components: {
    Header,
    Catalog,
  }
}
</script>

<style lang="scss" type="text/scss">
</style>