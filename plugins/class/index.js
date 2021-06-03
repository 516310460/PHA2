import ServerInfo from './ServerInfo'

export default (ctx, inject) => {
  let Class = {
    ServerInfo: ServerInfo
  }
  ctx.$Class = Class
  inject('Class', Class)
  // ctx.$ServerInfo = ServerInfo
  // inject('ServerInfo', ServerInfo)
}
