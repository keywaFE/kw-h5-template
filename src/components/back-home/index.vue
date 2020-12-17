<template>
  <div class="back-home" @click="backHome">
    <img src="./home-icon.png">
  </div>
</template>

<script>
import { jump } from '@/utils/'

export default {
  methods: {
    backHome() {
      jump('/home')
    }
  }
}
</script>

<style lang="scss" scope>
.back-home {
  position: fixed;
  z-index: 4;
  bottom: 167px;
  right: 27px;
  background: #1494FF;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  font-size: 40px;
  height: 88px;
  width: 88px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 39px;
    height: 41px;
  }
}
</style>
