<template>
  <div class="base-title">
    <div class="sparator"></div>
    <div class="text">{{title}}</div>
    <div class="sub" @click="onClick" v-if="more">
      {{subTitle}}
      <van-icon name="arrow" color="#333" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: '更多'
    },
    more: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-title {
  position: relative;
  height: 88px;
  line-height: 88px;
  padding: 0 33px;
  display: flex;
  .sparator {
    position: absolute;
    left: 33px;
    top: 50%;
    margin-top: -15px;
    width: 8px;
    height: 30px;
    background: #1494ff;
    border-radius: 4px;
    border-radius: 4px;
  }
  .text {
    margin-left: 15px;
    flex: 1;
    font-size: 30px;
    color: #161616;
    font-weight: bold;
  }
  .sub {
    display: flex;
    align-items: center;
    font-size: 26px;
    color: #161616;
  }
}
</style>
