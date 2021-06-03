export const arrayData = {
  // 购买类型 ALIPAY：支付宝 WECHAT：微信 BANK：银行卡
  payList: [
    {
      value: 'ALIPAY',
      name: '支付宝',
    },
    {
      value: 'WECHAT',
      name: '微信',
    },
    {
      value: 'BANK',
      name: '银行卡',
    }
  ],
  // 购买类型 0全部 1.购买 2.出售
  typeList: [
    {
      value: 0,
      name: '全部',
    },
    {
      value: 1,
      name: '购买',
    },
    {
      value: 2,
      name: '出售',
    }
  ],
  // 订单状态:1未付款,2已付款,3已取消,4申诉中,9已完成
  orderStateList: [
    {
      value: 0,
      name: '全部',
    },
    {
      value: 1,
      name: '未付款',
    },
    {
      value: 2,
      name: '已付款',
    },
    {
      value: 3,
      name: '已取消',
    },
    {
      value: 4,
      name: '申诉中',
    },
    {
      value: 9,
      name: '已完成',
    },
  ],
  // 刷新设置
  refreshList: [
    {
      value: '',
      name: '暂不处理'
    },
    {
      value: '5000',
      name: '5秒后自动刷新'
    },
    {
      value: '10000',
      name: '10秒后自动刷新'
    },
    {
      value: '20000',
      name: '20秒后自动刷新'
    },
    {
      value: '30000',
      name: '30秒后自动刷新'
    }
  ],
}