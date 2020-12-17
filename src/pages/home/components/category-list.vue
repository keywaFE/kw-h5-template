<template>
  <div class="category-list">
    <base-title title="品类分布（近一个月）" :more="false" />
    <div class="hd">
      <div class="cell">品类</div>
      <div class="cell">销售额</div>
      <div class="cell">销量</div>
      <div class="cell">商品数</div>
    </div>
    <div class="list">
      <div class="item" v-for="item in datas" :key="item.id" @click="onClick(item)">
        <div class="cell">{{item.title}}</div>
        <div class="cell text">{{item.amount_total}}</div>
        <div class="cell text">{{item.num_total}}</div>
        <div class="cell text">{{item.goods_num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitle from '@/components/base/base-title'
export default {
  components: {
    BaseTitle
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick (item) {
      console.log(item, 'click')
    }
  }
}
</script>

<style lang="scss" scoped>
.category-list {
  .hd {
    display: flex;
    height: 86px;
    line-height: 86px;
    .cell {
      flex: 1;
      text-align: center;
      font-size: 24px;
      color: #a3a3a3;
    }
  }
  .item {
    display: flex;
    height: 86px;
    line-height: 86px;
    & + .item {
      border-top: 1px solid #eee;
    }
    .cell {
      flex: 1;
      text-align: center;
      font-size: 28px;
      color: #161616;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .text {
      color: #2da0ff;
    }
  }
}
</style>
