<template>
  <div id="app-wrapper" class="page-my">
    <div class="banner">
      <img class="img" :src="BannerImage" alt />
      <div class="user-info">
        <div class="avatar">
          <img :src="headimgurl" alt />
        </div>
        <div class="text">
          {{nickname}}
          <div class="edit">
            <img class="icon" :src="EditIcon" @click="jumpInfo" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="gutter"></div>
    <cell :icon="KfIcon" title="联系客服" @onClick="showKf = true" is-link />
    <my-kf v-show="showKf" @onClose="showKf = false" />
    <nav-bar :active="1" />
  </div>
</template>

<script>
import { jump } from '@/utils/'
import NavBar from '@/components/nav/'
import BannerImage from './icons/banner.png'
import EditIcon from './icons/edit.png'
import KfIcon from './icons/kf.png'
import UsIcon from './icons/us.png'
import Cell from '@/components/base/cell'
import MyKf from './components/kf/'
import wechatShare from '@/utils/wechatShare'

import { userInfo } from '@/api/my'
export default {
  components: {
    NavBar,
    Cell,
    MyKf
  },
  data () {
    return {
      nickname: '',
      headimgurl: '',
      showKf: false,
      BannerImage,
      EditIcon,
      KfIcon,
      UsIcon,
    }
  },
  created () {
    userInfo().then(rs => {
      this.headimgurl = rs.headimgurl
      this.nickname = rs.nickname
    })
    wechatShare({
      title: '日化选品系统',
      desc: '为您提供日化产品精准电商数据分析',
      link: window.location.origin + '/wx/'
    })
  },
  mounted () {
  },
  methods: {
    jumpInfo () {
      jump('/info')
    }
  }
};
</script>

<style lang="scss">
@import 'src/style/base.scss';
.page-my {
  height: 100%;
  background: #f7f7f7;
  .banner {
    position: relative;
    padding-top: 60px;
    background: #1494ff;
    .img {
      width: 100%;
    }
    .user-info {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      top: 180px;
      text-align: center;
    }
    .avatar {
      width: 110px;
      height: 110px;
      border: 4px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      img {
        width: 100%;
      }
    }
    .text {
      margin-top: 10px;
      font-size: 32px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }

    .edit {
      margin-left: 16px;
      font-size: 32px;
      color: #fff;
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
