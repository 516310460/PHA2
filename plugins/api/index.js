
import getClientAPI from './api'

export default (ctx, inject) => {
  const axiosConfig = {
    baseURL: process.env.baseUrl
  }
  Object.assign(ctx.$axios.defaults, axiosConfig);
  ctx.$api = getClientAPI(ctx.$axios)
  inject('api', ctx.$api)
}
      