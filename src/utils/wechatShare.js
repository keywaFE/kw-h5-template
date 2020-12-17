import wxShare from './share'

export default ({ ...option }) => {
  // console.log(option, 'wxShare')
  return new Promise((resolve, reject) => {
    wxShare({
      title: option.title || (document.title && document.title),
      desc: option.desc || '日化数据选品系统',
      link: option.link || window.location.href.split('#')[0],
      imgUrl: option.imgUrl || '',
      friendCount: option.friendCount || false,
      momentsCount: option.momentsCount || false,
      success: () => {
        console.log('share success')
      }
    }).then((rs) => {
      resolve(rs)
    })
  })
}
