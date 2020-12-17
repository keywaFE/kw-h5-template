<template>
  <div id="app-wrapper" class="with-nav">
    <search-bar disabled fixed @onClick="onSearchClick" />
    <banner :datas="bannerData" />
    <div class="gutter"></div>
    <recommend :datas="recomendData" />
    <div class="gutter"></div>
    <category-list :datas="categoryDatas" />
    <nav-bar />
  </div>
</template>

<script>
import NavBar from '@/components/nav/'
import SearchBar from '@/components/base/search-bar'
import Banner from './components/banner'
import Recommend from './components/recommend/'
import CategoryList from './components/category-list'
import wechatShare from '@/utils/wechatShare'

import homeApi from '@/api/home'
export default {
  components: {
    NavBar,
    SearchBar,
    Recommend,
    CategoryList,
    Banner
  },
  data () {
    return {
      bannerData: [],
      recomendData: [],
      categoryDatas: []
    };
  },
  created () {
    this.getHomeDatas()
    wechatShare({
      title: '日化选品系统',
      desc: '为您提供日化产品精准电商数据分析'
    })
  },
  methods: {
    onSearchClick () {
      console.log('search')
    },
    getHomeDatas () {
      homeApi().then(rs => {
        const [banner, recomend, category] = rs

        this.recomendData = recomend
        this.categoryDatas = category
        this.bannerData = banner
      })
    }
  }
}
</script>
<style lang="scss">
@import 'src/style/base.scss';
</style>
