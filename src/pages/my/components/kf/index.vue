<template>
  <div class="kf-wrapper">
    <div class="info">
      <img :src="qrcodeImg" alt class="img" />
      <p class="title">长按图片识别二维码</p>
      <p class="sub-title">长按或识别二维码添加客服小助手</p>
    </div>
    <div class="btn-wrapper">
      <img class="btn" @click="onCloseClick" :src="closeBtn" alt />
    </div>
  </div>
</template>

<script>
import qrcodeImg from './qrcode.png'
import closeBtn from './close.png'
export default {
  data () {
    return {
      qrcodeImg,
      closeBtn
    }
  },
  methods: {
    onCloseClick () {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" >
.kf-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(34, 34, 34, 0.6);
    z-index: -1;
  }
  .info {
    width: 360px;
    padding: 40px;
    background: #fff;
    border-radius: 32px;
    text-align: center;
    font-size: 20px;
    .img {
      width: 360px;
    }
    .title {
      color: #999;
    }
    .sub-title {
      margin-top: 20px;
      color: #333;
    }
  }
  .btn-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .btn {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
