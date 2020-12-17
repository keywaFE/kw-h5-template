export function getUrlParam() {
  let result = {}
  let key = ''
  let str = ''
  let arr = []
  let i = 0
  let len = 0

  str = window.location.search.substr(1)
  if (str.length === 0) return result
  arr = str.split('&')
  len = arr.length
  for (; i < len; i++) {
    if (
      arr[i].split('=')[1] === undefined ||
      arr[i].split('=')[1] === 'undefined'
    ) {
      key = arr[i - 1].split('=')[0]
      result[key] = result[key] + '&' + arr[i]
      continue
    }
    key = arr[i].split('=')[0]
    result[key] = decodeURIComponent(arr[i].split('=')[1])
  }
  return result
}

/**
 * 对象转成 url 中的 queryurl
 * @param {baseurl} 基础 url
 * @param {Object} 待解析对象
 * @return {String} 返回 queryurl
 */
export const object2query = (obj, separator = '&') => {
  if (!obj) return '请检查参数是否为对象'
  const handleKey = Object.keys(obj).filter(key => obj[key] != null)
  const handleArray = handleKey.map(
    key => `${key}=${encodeURIComponent(obj[key])}`
  )
  return handleArray.join(separator)
}

export const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function jump(url) {
  let prefix = ''
  if (process.env.NODE_ENV === 'production') {
    prefix = '/wx'
  }
  window.location.href = prefix + url
}

export function formatDate(date) {
  const month = date.getMonth() + 1
  return `${date.getFullYear()}-${month < 10 ? '0' + month : month}`
}

export function parseToThousandth(num, point = 2) {
  let [sInt, sFloat] = (Number.isInteger(num)
    ? `${num}`
    : num.toFixed(point)
  ).split('.')
  sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,')
  return sFloat ? `${sInt}.${sFloat}` : `${sInt}`
}
