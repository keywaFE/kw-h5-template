<template>
  <ul class="switch-tab">
    <li
      class="item"
      v-for="(item,index) in switches"
      :class="{'active':activeIndex===index}"
      :key="index"
      @click="switchItem(index, item)"
    >
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index, item) {
      this.$emit('switch', index, item)
    }
  }
}
</script>

<style lang="scss" scoped >
.switch-tab {
  display: flex;
  font-size: 28px;
  color: #000;
  .item {
    flex: 1;
    max-width: 25%;
    align-items: center;
    text-align: center;
    position: relative;
    span {
      position: relative;
    }
    &.active {
      font-weight: bold;
    }
    &.active span:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120%;
      height: 12px;
      background-image: linear-gradient(
        90deg,
        rgba(0, 85, 255, 0.86) 0%,
        rgba(0, 235, 255, 0.83) 100%
      );
      border-radius: 6px;
      border-radius: 6px;
    }
  }
}
</style>
