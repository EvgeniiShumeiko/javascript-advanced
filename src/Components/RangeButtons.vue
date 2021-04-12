<template>
  <div :class="['range-buttons']">
    <b-button :disabled="counter === 1" size="sm" variant="outline-danger" :class="['range-buttons__down']" @click="decrease">
      <b-icon-caret-down-fill></b-icon-caret-down-fill>
    </b-button>
    <span class="range-buttons__counter mx-2">
      {{ counter }}
    </span>

    <b-button :disabled="counter === 100" size="sm" variant="outline-success" :class="['range-buttons__up']" @click="increase">
      <b-icon-caret-up-fill ></b-icon-caret-up-fill>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "RangeButtons",
  props: {
    defaultValue: Number
  },
  data() {
    return {
      counter: 100
    }
  },
  methods: {
    increase() {
      this.counter++;
      this.$emit('counterChanged', {counter: this.counter})
    },
    decrease() {
      this.counter--;
      this.$emit('counterChanged', {counter: this.counter})
    }
  },
  created() {
    this.counter = this.props.defaultValue
  }
}
</script>

<style lang="scss" type="text/scss" module>
  .range-buttons {
    display: flex;
    flex-direction: row;

    &__up, &__down {
      height: 30px;
    }

    &__counter {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }

</style>