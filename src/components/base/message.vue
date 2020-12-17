<template>
  <div class="message-popup">
    <van-popup v-model="messageShow">
      <slot></slot>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popup } from 'vant'

Vue.use(Popup)
export default {
  props: {
  },
  data() {
    return {
      messageShow: false
    }
  },
  methods: {
    show(duration = 1000) {
      this.messageShow = true
      if (duration) {
        setTimeout(() => {
          this.close()
        }, duration)
      }
    },
    close() {
      this.messageShow = false
    }
  }
}
</script>

<style lang="scss">
.message-popup {
  .van-popup {
    min-width: 60%;
    box-sizing: border-box;
    font-size: 24px;
    color: #161616;
    text-align: center;
    line-height: 41px;
    padding: 53px 50px 53px 56px;
    background: #FFFFFF;
    border-radius: 16px;
  }
}
</style>
