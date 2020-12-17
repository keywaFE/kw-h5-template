import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 30 * 1000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
}

axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// respone拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.error) {
      return Promise.reject(response.data.error)
    }
    return response.data.result
  },
  error => {
    return Promise.reject(error)
  }
)

function request(options) {
  if (!options) {
    return
  }

  let config = {
    url: options.url,
    method: options.method
  }

  if (options.method === 'get') {
    config.params = options.data
  }
  if (options.method === 'post') {
    config.data = options.data
  }
  return axios(config)
}

export function get(url, data = {}) {
  return request({
    url,
    data,
    method: 'get'
  })
}

export function post(url, data = {}) {
  return request({
    url,
    data,
    method: 'post'
  })
}
