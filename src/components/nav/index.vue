<template>
  <van-tabbar v-model="activeIndex" class="nav-bar" active-color="#333" inactive-color="#333">
    <van-tabbar-item v-for="(item, index) in navs" :key="item.title" @click="tab(item.url)">
      <span class="title" :class="activeIndex === index ? 'active-title':''">{{item.title}}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { jump } from '@/utils/'
Vue.use(Tabbar)
Vue.use(TabbarItem)

export default {
  props: {
    active: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      navs: [
        {
          title: '首页',
          active: require('./icons/home-active.png'),
          inactive: require('./icons/home.png'),
          url: '/home'
        },
        {
          title: '我的',
          active: require('./icons/my-active.png'),
          inactive: require('./icons/my.png'),
          url: '/my'
        }
      ],
      activeIndex: this.active
    }
  },
  methods: {
    tab (url) {
      jump(url)
    }
  }
}
</script>

<style lang="scss">
.nav-bar {
  z-index: 999;
  height: 98px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  .title {
    font-size: 20px;
  }
  .active-title {
    font-weight: bold;
  }
  .van-tabbar-item__icon {
    margin-bottom: 8px;
  }
  .van-tabbar-item__icon img {
    height: 44px;
    width: 44px;
  }
}
</style>
