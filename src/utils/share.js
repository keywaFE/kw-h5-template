/**
 * 1.现在腾讯规定不可以自定按钮进行分享，只能点击右上角进行分享。
 * 2.分享的地址域名，必须和当前域名相同如：当前页面域名为http://www.test.com。分享的链接必须在这个域名下如：http://www.test.com/index''，不然不能实现自定义。
 * 3.导入微信的js  <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
 * 4.wx.config里面必须初始化，调用你需要使用的微信接口。
 */

/**
 * 默认分享也是首页
 */
import { getWxConfig } from '@/api/home'
export default options => {
  // console.log(options, 'WxConfig')

  return new Promise(resolve => {
    getWxConfig({
      url: options.link
    }).then(rs => {
      window.wx.config({
        appId: rs.appId,
        debug: false,
        timestamp: rs.timestamp,
        nonceStr: rs.nonceStr,
        signature: rs.signature,
        jsApiList: [
          'translateVoice',
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'chooseImage',
          'showOptionMenu',
          'getLocation'
        ]
      })

      const shareOptions = {
        title: options.title, // 分享标题
        desc: options.desc, // 分享描述
        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: options.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
          options.success && options.success()
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          options.cancel && options.cancel()
        }
      }

      const pyqShareOptions = { ...shareOptions }
      const wxhyShareOptions = { ...shareOptions }

      window.wx.ready(function() {
        // console.log(shareOptions.link, 'shareOptions')
        window.wx.showOptionMenu()
        // 分享到朋友圈
        window.wx.onMenuShareTimeline(pyqShareOptions)
        // 分享给朋友
        window.wx.onMenuShareAppMessage(wxhyShareOptions)
        // 分享给QQ
        window.wx.onMenuShareQQ(shareOptions)
        // 分享微博
        window.wx.onMenuShareWeibo(shareOptions)
      })
      resolve(rs)
    })
  })
}
