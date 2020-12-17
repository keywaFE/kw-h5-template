<template>
  <div :class="fixed ? 'search-bar-wrapper' : ''">
    <form action="javascript:;" class="search-bar" :class="fixed ? 'fixed' : ''">
      <div class="search-bar-wrapper" :style="{background: background}" @click="onSearchBarClick">
        <van-icon class="search" name="search" :color="iconColor"></van-icon>

        <input
          :style="{background: background, color: textColor}"
          type="search"
          :ref="refName"
          class="search-bar-input"
          :readonly="disabled"
          autocomplete="off"
          @focus="onFocus"
          :placeholder="placeholder"
          :maxlength="limit"
          v-model="keyword"
          @keyup.enter="onConfirm"
        />

        <van-icon
          class="clear"
          name="clear"
          :color="clearColor"
          @click="onClearClick"
          v-if="keyword.length > 0 && !disabled"
        ></van-icon>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入感兴趣的内容'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: '#f7f7f7'
    },
    textColor: {
      type: String,
      default: '#333'
    },
    iconColor: {
      type: String,
      default: '#858C96'
    },
    clearColor: {
      type: String,
      default: '#ccc'
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyword: '',
      refName: 'searchInput'
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.keyword = ''
      this.$emit('onClear')
    },
    onChange (e) {
      this.$emit('onChange', this.keyword)
    },
    onConfirm (e) {
      // alert(this.keyword)
      this.$emit('onConfirm', this.keyword)
      this.$refs[this.refName].blur()
    },

    onFocus () {
      this.$emit('focus')
    },
    setValue (v) {
      this.keyword = v
    },
    getValue () {
      return this.keyword
    },
    onBlur (e) {
      if (e.target.tagName !== 'INPUT') {
        this.$refs[this.refName].blur()
      }
    }
  },
  mounted () {
    window.addEventListener('touchend', this.onBlur)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('touchend', this.onBlur)
    })
  }
}
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  height: 88px;
}
.search-bar {
  box-sizing: border-box;
  padding: 13px 32px;
  &.fixed {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    width: 100%;
    max-width: 750px;
  }
  .search-bar-wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 12px 24px;

    .search-bar-input {
      flex: 1;
      margin: 0 8px;
      font-size: 24px;
      /* color: #A6A6A7; */
      text-align: left;
      line-height: 38px;
      border: none;
      outline: none;
    }

    .search,
    .clear {
      font-size: 33px;
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
