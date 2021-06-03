// https://www.npmjs.com/package/nuxt-swaggerjsonapi
export default client => ({
  user: {
    /* 
    ** Interface name: 修改密码
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"原始密码","required":true,"type":"string"}
    **    {"name":"newpassword","in":"query","description":"新密码","required":true,"type":"string"}
    **    {"name":"qpassword","in":"query","description":"确认密码","required":true,"type":"string"}
    **    {"name":"code","in":"query","description":"邮件验证码","required":true,"type":"string"}
    **    {"name":"type","in":"query","description":"类型(取值：1|2):1=修改登录密码 2=修改支付密码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        changePwd(){ 
          let params = { 
            "token": "",// "token"
            "password": "",// "原始密码"
            "newpassword": "",// "新密码"
            "qpassword": "",// "确认密码"
            "code": "",// "邮件验证码"
            "type": "",// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
          } 
          this.$api.user.changePwd(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        changePwdParams: { 
          "token": "",// "token"
          "password": "",// "原始密码"
          "newpassword": "",// "新密码"
          "qpassword": "",// "确认密码"
          "code": "",// "邮件验证码"
          "type": "",// "类型(取值：1|2):1=修改登录密码 2=修改支付密码"
        } 
    */ 
    changePwd (params) {
      return client.post('/api/user/changePwd', 
        params
      )
    },
    /* 
    ** Interface name: 获取邮件验证码
    ** Parameter structure: 
    **    {"name":"type","in":"query","description":"邮件类型：reg(注册)|withdraw(提币)|changePwd(修改密码)","required":true,"type":"string"}
    **    {"name":"email","in":"query","description":"邮件接收地址","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        getCodeEmail(){ 
          let params = { 
            "type": "",// "邮件类型：reg(注册)|withdraw(提币)|changePwd(修改密码)"
            "email": "",// "邮件接收地址"
          } 
          this.$api.user.getCodeEmail(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        getCodeEmailParams: { 
          "type": "",// "邮件类型：reg(注册)|withdraw(提币)|changePwd(修改密码)"
          "email": "",// "邮件接收地址"
        } 
    */ 
    getCodeEmail (params) {
      return client.post('/api/user/getCodeEmail', 
        params
      )
    },
    /* 
    ** Interface name: 获取图片验证码
    ** Parameter structure: 
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
    ** data(Vue use): 
    */ 
    getImageCode (params) {
      return client.get('/api/user/getImageCode', {
        params
      })
    },
    /* 
    ** Interface name: 获取用户信息
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        getUserInfo(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.user.getUserInfo(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        getUserInfoParams: { 
          "token": "",// "token"
        } 
    */ 
    getUserInfo (params) {
      return client.post('/api/user/getUserInfo', 
        params
      )
    },
    /* 
    ** Interface name: 注销登录
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        logOut(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.user.logOut(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        logOutParams: { 
          "token": "",// "token"
        } 
    */ 
    logOut (params) {
      return client.post('/api/user/logOut', 
        params
      )
    },
    /* 
    ** Interface name: 用户登录
    ** Parameter structure: 
    **    {"name":"username","in":"query","description":"用户名","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"登录密码","required":true,"type":"string"}
    **    {"name":"imageCode","in":"query","description":"图片验证码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        login(){ 
          let params = { 
            "username": "",// "用户名"
            "password": "",// "登录密码"
            "imageCode": "",// "图片验证码"
          } 
          this.$api.user.login(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        loginParams: { 
          "username": "",// "用户名"
          "password": "",// "登录密码"
          "imageCode": "",// "图片验证码"
        } 
    */ 
    login (params) {
      return client.post('/api/user/login', 
        params
      )
    },
    forgetLoginPwd (params) {
      return client.post('/api/user/forgetLoginPwd', 
        params
      )
    },
    /* 
    ** Interface name: 用户注册
    ** Parameter structure: 
    **    {"name":"username","in":"query","description":"用户名","required":true,"type":"string"}
    **    {"name":"password","in":"query","description":"登录密码","required":true,"type":"string"}
    **    {"name":"rePassword","in":"query","description":"确认密码","required":true,"type":"string"}
    **    {"name":"code","in":"query","description":"邮件验证码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        reg(){ 
          let params = { 
            "username": "",// "用户名"
            "password": "",// "登录密码"
            "rePassword": "",// "确认密码"
            "code": "",// "邮件验证码"
          } 
          this.$api.user.reg(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        regParams: { 
          "username": "",// "用户名"
          "password": "",// "登录密码"
          "rePassword": "",// "确认密码"
          "code": "",// "邮件验证码"
        } 
    */ 
    reg (params) {
      return client.post('/api/user/reg', 
        params
      )
    },
  },
  userAccount: {
    /* 
    ** Interface name: 个人资产
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        balance(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.userAccount.balance(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        balanceParams: { 
          "token": "",// "token"
        } 
    */ 
    balance (params) {
      return client.post('/api/userAccount/balance', 
        params
      )
    },
    /* 
    ** Interface name: 资产明细
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"coinName","in":"query","description":"coinName","required":false,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        balanceDetail(){ 
          let params = { 
            "token": "",// "token"
            "coinName": "",// "coinName"
          } 
          this.$api.userAccount.balanceDetail(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        balanceDetailParams: { 
          "token": "",// "token"
          "coinName": "",// "coinName"
        } 
    */ 
    balanceDetail (params) {
      return client.post('/api/userAccount/balanceDetail', 
        params
      )
    },
    /* 
    ** Interface name: 我的提币记录
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        myWithDraw(){ 
          let params = { 
            "token": "",// "token"
          } 
          this.$api.userAccount.myWithDraw(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        myWithDrawParams: { 
          "token": "",// "token"
        } 
    */ 
    myWithDraw (params) {
      return client.post('/api/userAccount/myWithDraw', 
        params
      )
    },
    /* 
    ** Interface name: 用户提币
    ** Parameter structure: 
    **    {"name":"token","in":"header","description":"token","required":true,"type":"string"}
    **    {"name":"address","in":"query","description":"收款地址","required":true,"type":"string"}
    **    {"name":"balance","in":"query","description":"提币金额","required":true,"type":"string"}
    **    {"name":"code","in":"query","description":"邮件验证码","required":true,"type":"string"}
    ** methods: The entire API call (Directly copy, paste, remove the notes can be used directly): 
        withdraw(){ 
          let params = { 
            "token": "",// "token"
            "address": "",// "收款地址"
            "balance": "",// "提币金额"
            "code": "",// "邮件验证码"
          } 
          this.$api.userAccount.withdraw(params).then(res => { 
          }) 
        }, 
    ** data(Vue use): 
        withdrawParams: { 
          "token": "",// "token"
          "address": "",// "收款地址"
          "balance": "",// "提币金额"
          "code": "",// "邮件验证码"
        } 
    */ 
    withdraw (params) {
      return client.post('/api/userAccount/withdraw', 
        params
      )
    },
  },
})