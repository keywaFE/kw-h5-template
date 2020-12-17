<template>
  <div class="cell-wrapper" @click="onClick">
    <div class="left">
      <img v-if="icon" :src="icon" alt class="icon" />
      <span class="title">{{title}}</span>
    </div>
    <div class="right">
      <slot name="value" :value="value">
        <div class="value" v-show="value">{{value}}</div>
      </slot>

      <div class="arrow" v-show="isLink"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      if (this.isLink) {
        this.$emit('onClick')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-wrapper {
  & + .cell-wrapper {
    border-top: 1px solid #d8d8d8;
  }
  background-color: #fff;
  height: 84px;
  padding-left: 47px;
  padding-right: 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .icon {
    width: 40px;
    margin-right: 30px;
  }
  .title {
    font-size: 28px;
    color: #161616;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .arrow {
    margin-left: 10px;
    width: 12px;
    height: 12px;
    border-top: 2px solid #161616;
    border-right: 2px solid #161616;
    transform: rotate(45deg);
  }
  .value {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #161616;
  }
}
</style>
