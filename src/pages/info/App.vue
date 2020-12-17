<template>
  <div id="app-wrapper" class="page-info">
    <div class="info-wrapper">
      <div class="info">
        <div class="avatar">
          <img :src="user.headimgurl" alt />
        </div>
        <div class="text">{{user.nickname}}</div>
        <!-- <div class="edit" @click="showEditNickName = true">
          <img :src="EditIcon" alt class="icon" />
        </div>-->
      </div>
    </div>

    <cell title="性别" :value="user.sexText" is-link @onClick="showSexActions = true">
      <template #value="slotProps" v-show="user.sexText">
        <div class="value">
          <img class="sex-icon" :src="sexIcon" alt />
          {{slotProps.value}}
        </div>
      </template>
    </cell>
    <cell title="电话" :value="user.mobile" is-link @onClick="showEditMobile = true" />
    <cell title="邮箱" :value="user.email" is-link @onClick="showEditEmail = true" />
    <div class="gutter"></div>
    <cell title="姓名" :value="user.name" is-link @onClick="showEditName = true" />
    <cell title="职位" :value="user.occupationText" is-link @onClick="showOccupation = true" />
    <cell
      title="行业"
      is-link
      :value="user.companyTypeText"
      @onClick="showCompanyTypesActions = true"
    />
    <cell title="公司名称" is-link :value="user.companyname" @onClick="showEditCompany = true" />
    <cell title="所在地区" :value="user.area" is-link @onClick="showAreaPicker" />

    <ui-dialog
      closeOnClickOverlay
      v-model="showEditNickName"
      title="请输入昵称"
      @onReset="user.nickname = ''"
      @onConfirm="onConfirm('nickname')"
    >
      <div class="info-content">
        <input class="input" v-model="user.nickname" autofocus placeholder="请输入昵称" />
      </div>
    </ui-dialog>

    <ui-dialog
      closeOnClickOverlay
      v-model="showEditName"
      title="请输入姓名"
      @onReset="user.name = ''"
      @onConfirm="onConfirm('name')"
    >
      <div class="info-content">
        <input class="input" v-model="user.name" autofocus placeholder="请输入姓名" />
      </div>
    </ui-dialog>

    <ui-dialog
      closeOnClickOverlay
      v-model="showEditMobile"
      title="请输入电话"
      @onReset="user.mobile = ''"
      @onConfirm="onConfirm('mobile')"
    >
      <div class="info-content">
        <input
          class="input"
          v-model="user.mobile"
          type="tel"
          maxlength="11"
          autofocus
          placeholder="请输入电话"
        />
      </div>
    </ui-dialog>

    <ui-dialog
      closeOnClickOverlay
      v-model="showEditEmail"
      title="请输入邮箱"
      @onReset="user.email = ''"
      @onConfirm="onConfirm('email')"
    >
      <div class="info-content">
        <input class="input" v-model="user.email" autofocus placeholder="请输入邮箱" />
      </div>
    </ui-dialog>

    <ui-dialog
      closeOnClickOverlay
      v-model="showEditCompany"
      title="请输入公司名称"
      @onReset="user.companyname = ''"
      @onConfirm="onConfirm('companyname')"
    >
      <div class="info-content">
        <input class="input" v-model="user.companyname" autofocus placeholder="请输入公司名称" />
      </div>
    </ui-dialog>

    <van-action-sheet
      v-model="showSexActions"
      title="请选择性别"
      close-on-click-action
      :actions="sexs"
      @select="onSelectSex"
    />
    <van-action-sheet
      v-model="showOccupation"
      title="请选择职位"
      close-on-click-action
      :actions="occupations"
      @select="onSelectOccupation"
    />
    <van-action-sheet
      v-model="showCompanyTypesActions"
      title="请选择行业"
      close-on-click-action
      :actions="companyTypes"
      @select="onSelectCompanyTypes"
    />

    <van-popup v-model="showArea" position="bottom">
      <van-picker
        ref="areaPicker"
        show-toolbar
        :columns="areaColumns"
        @confirm="onAreaConfirm"
        value-key="title"
      />
    </van-popup>
  </div>
</template>

<script>

import Vue from 'vue'
import { ActionSheet, Picker, Popup } from 'vant'

import Dialog from '@/components/base/dialog'
import Cell from '@/components/base/cell'
import MIcon from './icons/m.png'
import WIcon from './icons/w.png'
import EditIcon from './icons/edit.png'

import { userInfo, updateUserInfo } from '@/api/my'
import { areaTree } from '@/api/common'
Vue.use(ActionSheet)
Vue.use(Picker)
Vue.use(Popup)

const defaultUser = {
  headimgurl: '',
  nickname: '',
  sexText: '',
  phone: '',
  email: '',
  name: '',
  occupationText: '',
  companyTypeText: '',
  province_name: '',
  city_name: '',
  companyname: '',
  area: '',
}
// 全局注册
export default {
  components: {
    Cell,
    'ui-dialog': Dialog
  },
  data () {
    return {
      showArea: false,
      hasSetDefaultValues: false,
      showOccupation: false,
      showCompanyTypesActions: false,
      showSexActions: false,
      sexs: [],
      showEditNickName: false,
      showEditName: false,
      showEditMobile: false,
      showEditEmail: false,
      showEditCompany: false,
      user: defaultUser,
      areaColumns: [],
      EditIcon,
    }
  },
  computed: {
    sexIcon () {
      return this.user.sex === 1 ? MIcon : WIcon
    }
  },
  created () {
    this.getUserInfo()
    areaTree().then(rs => {
      this.areaColumns = rs
    })
  },
  mounted () {
  },
  methods: {
    onAreaConfirm (value) {
      this.showArea = false
      const [{ id: provideId, title: provideTitle }, { id: cityId, title: cityTitle }] = this.$refs.areaPicker.getValues()

      updateUserInfo({
        post: {
          province_id: provideId,
          city_id: cityId
        }
      }).then(() => {
        this.user.area = provideTitle + cityTitle
        this.pickerValues = value
      })
    },
    showAreaPicker () {
      this.showArea = true
      // show 之后才能获取到picker的ref
      if (!this.hasSetDefaultValues) {
        this.hasSetDefaultValues = true
        this.$nextTick(() => {
          this.$refs.areaPicker.setValues([this.user.province_name, this.user.city_name])
        })
      }
    },
    getUserInfo () {
      userInfo().then(rs => {
        const { sexs, company_types: companyTypes, occupations, ...userInof } = rs

        this.companyTypes = companyTypes.map(s => {
          return {
            name: s.title,
            id: s.id
          }
        })
        this.sexs = sexs.map(s => {
          return {
            name: s.title,
            id: s.id
          }
        })
        this.occupations = occupations.map(s => {
          return {
            name: s.title,
            id: s.id
          }
        })

        this.user = { ...defaultUser, ...userInof }

        this.user.area = this.user.province_name + this.user.city_name

        this.user.sexText = sexs.filter(s => s.id === this.user.sex)[0].title
        if (this.user.company_type !== 0) {
          this.user.companyTypeText = companyTypes.filter(s => s.id === this.user.company_type)[0].title
        }

        if (this.user.occupation !== 0) {
          this.user.occupationText = occupations.filter(s => s.id === this.user.occupation)[0].title
        }
      })
    },
    onSelectOccupation (item) {
      const { id, name } = item
      this.user.occupation = id
      this.user.occupationText = name

      updateUserInfo({
        post: {
          occupation: this.user.occupation
        }
      })
    },
    onSelectCompanyTypes (item) {
      const { id, name } = item
      this.user.company_type = id
      this.user.companyTypeText = name
      updateUserInfo({
        post: {
          company_type: this.user.company_type
        }
      })
    },
    onSelectSex (item) {
      const { id, name } = item
      this.user.sex = id
      this.user.sexText = name

      updateUserInfo({
        post: {
          sex: this.user.sex
        }
      })
    },
    onConfirm (type) {
      switch (type) {
        case 'name':
          updateUserInfo({
            post: {
              name: this.user.name
            }
          }).then(rs => {
            this.showEditName = false
          })
          break
        case 'nickname':
          this.showEditNickName = false
          break
        case 'mobile':
          updateUserInfo({
            post: {
              mobile: this.user.mobile
            }
          }).then(rs => {
            this.showEditMobile = false
          })
          break
        case 'email':
          updateUserInfo({
            post: {
              email: this.user.email
            }
          }).then(rs => {
            this.showEditEmail = false
          })
          break
        case 'companyname':
          updateUserInfo({
            post: {
              companyname: this.user.companyname
            }
          }).then(rs => {
            this.showEditCompany = false
          })
          break
      }
    }
  }
};
</script>

<style lang="scss">
@import 'src/style/base.scss';

.page-info {
  height: 100%;
  background: #f7f7f7;
  .van-action-sheet__header {
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #1494ff;
  }
  .van-action-sheet__item {
    height: 100px;
    line-height: 100px;
    padding: 0;
    font-size: 30px;
  }
  .van-action-sheet__close {
    padding-right: 20px;
    font-size: 30px;
  }

  .van-picker__toolbar {
    height: 80px;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    font-size: 30px;
  }
  .van-picker__confirm {
    color: #1494ff;
  }
  .van-picker-column__item {
    font-size: 30px;
  }
  .sex-icon {
    height: 32px;
    margin-right: 8px;
  }
  .info-wrapper {
    height: 204px;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #d8d8d8;
    .info {
      margin-top: 47px;
      margin-left: 35px;
      display: flex;
      align-items: center;
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
        margin-left: 32px;
        font-size: 32px;
        color: #161616;
      }
      .edit {
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 32px;
        color: #1494ff;
        .icon {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .info-content {
    display: flex;
    align-items: center;
    height: 168px;
    .input {
      padding: 0 26px;
      width: 520px;
      height: 64px;
      background: #f7f7f7;
      border-radius: 16px;
      box-sizing: border-box;
      border: none;
      color: #1494ff;
      font-size: 24px;
    }
  }
}
</style>
