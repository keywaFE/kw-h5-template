<template>
  <div class="image-view" @click="onClick" :style="{ height }">
    <img
      class="image"
      :src="src"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error && src!== ''"
    />
    <img class="image" :src="defaultProductImage" v-show="isLoading || error || src=== ''" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import defaultProductImage from '@/assets/default.jpg'
Vue.use(Lazyload)
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  watch: {
    src (newValue, preValue) {
      if (newValue && newValue.length > 0 && newValue !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true
          this.error = false
        })
      }
    }
  },
  data () {
    return {
      defaultProductImage,
      isLoading: true,
      error: false
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    onLoad () {
      this.isLoading = false
      this.error = false
    },
    onError () {
      this.error = true
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.image-view {
  width: 100%;
}
</style>
