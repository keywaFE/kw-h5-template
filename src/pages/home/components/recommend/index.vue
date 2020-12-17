<template>
  <div>
    <base-title title="推荐产品" :more="false" />
    <div class="swiper-wrapper">
      <van-swipe :autoplay="autoplay">
        <van-swipe-item v-for="(item, index) in chunkList" :key="index">
          <div class="swiper-item-wrapper">
            <div
              class="swiper-item"
              @click="onClick(product)"
              v-for="product in item"
              :key="product.id"
            >
              <!-- <img v-lazy="product.goods_thumb" /> -->
              <image-view :src="product.goods_thumb"></image-view>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload } from 'vant'
import BaseTitle from '@/components/base/base-title'
import { chunk } from '@/utils/'
import ImageView from '@/components/base/image-view'
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)

export default {
  components: {
    BaseTitle,
    ImageView
  },
  props: {
    chunk: {
      type: Number,
      default: 3
    },
    autoplay: {
      type: Number,
      default: 3000
    },
    datas: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chunkList () {
      return chunk(this.datas, this.chunk)
    }
  },
  methods: {
    onClick (item) {
      console.log(item, 'click')
    }
  }
}
</script>

<style lang="scss">
.swiper-wrapper {
  height: 262px;
  padding: 20px 32px 0;
  box-sizing: border-box;
  .swiper-item-wrapper {
    width: 100%;
    display: flex;
  }
  .swiper-item {
    & + .swiper-item {
      margin-left: 53px;
    }
    width: 242px;
    height: 242px;

    img {
      width: 190px;
      height: 190px;
      border-radius: 20px;
    }
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
