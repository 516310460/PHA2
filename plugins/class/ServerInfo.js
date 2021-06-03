class ServerInfo {
  /*
  ** 服务器信息
  ** state: 服务器状态
  ** 
  */
  constructor(state){
    this.state = state
  }
  
  //服务器状态筛选
  SwitchState (state) {
    let StateStr = ''
    switch (state) {
      case 'Pending':
        StateStr = '创建中'
        break;
      case 'Running':
        StateStr = '运行中'
        break;
      case 'Starting':
        StateStr = '启动中'
        break;
      case 'Stopping':
        StateStr = '停止中'
        break;
      case 'Stopped':
        StateStr = '已停止'
        break;
      case 'Writeoff':
        StateStr = '已注销'
        break;
      case 'unknown':
        StateStr = '未知'
        break;
      case 'liberate':
        StateStr = '已释放'
        break;
      default:
        break;
    }
    return StateStr
  }
}

export default ServerInfo
