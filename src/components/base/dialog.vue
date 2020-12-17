<template>
  <transition name="v-dialog-fade">
    <div class="dialog-wrapper" v-show="show">
      <div class="overlay" v-if="overlay" @click="handleAction('overlayClick')"></div>
      <div class="v-dialog">
        <div class="v-dialog__header" v-if="title" v-text="title" />
        <div class="v-dialog__content">
          <slot></slot>
        </div>
        <div class="v-dialog__footer">
          <div class="btn" @click="handleAction('onReset')">重置</div>
          <div class="btn confirm" @click="handleAction('onConfirm')">确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'v-dialog',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    callback: {
      type: Function
    },
    overlay: {
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    lockOnScroll: {
      default: true
    }
  },
  methods: {
    handleAction (action) {
      if (action === 'overlayClick' && this.closeOnClickOverlay) {
        this.$emit('change', false)
      } else {
        this.$emit(action)
      }
    }
  }
}
</script>

<style lang="scss">
.dialog-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2002;
  flex-direction: column;
  &.v-dialog-fade-enter-active {
    animation: dialog-fadein 0.3s;
    .v-dialog {
      animation: dialog-zoom 0.3s;
    }
  }
}
.v-dialog {
  z-index: 1002;
  position: relative;
  width: 570px;
  padding: 32px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  background: #fff;
  &__header {
    text-align: center;
    font-size: 28px;
    color: #1494ff;
  }

  &__content {
    font-size: 0.28rem;
    color: #333;

    &::after {
      border-bottom-width: 1px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 24px;

    .btn {
      width: 242px;
      height: 64px;
      line-height: 64px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      border-radius: 34px;
      color: #181818;
    }
    .confirm {
      background: #1494ff;
      color: #ffffff;
    }
  }

  .v-button {
    border: 0;
  }

  &__confirm {
    &,
    &:active {
      color: #00c000;
    }
  }
}
@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}

.bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
.overlay {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.5s ease-out;
}
</style>
