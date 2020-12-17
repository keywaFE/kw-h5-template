<template>
  <div class="banner-wrapper">
    <div class="top">
      <van-swipe :autoplay="4000">
        <van-swipe-item v-for="(item, index) in datas" :key="index" @click="onClick(item)">
          <img class="img" v-lazy="item.thumb" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload } from 'vant'

Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClick (item) {
      if (item.link) {
        window.open(item.link)
      }
    }
  }
}
</script>

<style lang="scss">
.banner-wrapper {
  padding: 16px 32px 32px;
  color: #fff;
  .top,
  .bl,
  .br {
    img {
      width: 100%;
      border-radius: 16px;
    }
  }
  .top {
    position: relative;
    height: 240px;
    width: 100%;
    margin-bottom: 24px;
    border-radius: 16px;
    box-shadow: 0 2px 10px 0 rgba(49, 49, 49, 0.3);
    img {
      height: 240px;
    }
  }
  .van-swipe__indicators {
    bottom: 30px;
  }
  .van-swipe__indicator {
    width: 8px;
    height: 8px;
    background-color: #e0e0e0;
  }
  .van-swipe__indicator--active {
    width: 16px;
    background-color: #1494ff;
    border-radius: 4px;
  }
}
</style>
