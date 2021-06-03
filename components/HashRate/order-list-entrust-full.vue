<style scoped rel="stylesheet/scss" lang="scss">
.scroll-bar {
  height: 200px;
}

.buybit_table_header.padding th {
  font-weight: 400;
  color: #5e6573;
}

.buybit_table_header.padding th:first-child,
.buybit_table_body.padding td:first-child {
  padding-left: 10px !important;

  .cl_buy {
    color: $cl_buy;
  }

  .cl_sell {
    color: $cl_sell;
  }
}

.buybit_table_header.padding th:last-child,
.buybit_table_body.padding td:last-child {
  padding-right: 10px !important;
}
</style>
<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <!-- v-bar -->
        <div>
          <div class="scroll-bar">
            <table class="buybit_table">
              <thead class="buybit_table_header padding br">
                <tr>
                  <th class="lt">
                    <div>{{ $t('HashRate.Entrust.currentTable1') }}</div>
                  </th>
                  <!-- <th class="lt">
                    <div>交易对</div>
                  </th> -->
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable2') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable3') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable4') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable5') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable6') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable7') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable8') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable15') }}</div>
                  </th>
                  <th class="rt">
                    <div>{{ $t('HashRate.Entrust.currentTable9') }}</div>
                  </th>
                </tr>
              </thead>
              <tbody
                v-buybit-loading="loading"
                class="deal-tbody"
              >
                <tr
                  class="buybit_table_body padding"
                  v-for="(item, index) in pageCurrentData"
                  :key="index"
                >
                  <td class="lt w140">
                    {{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </td>
                  <!-- <td class="lt">
                    {{`${item.coinTeam.split('-')[0]}/${item.coinTeam.split('-')[1]}`}}
                  </td> -->
                  <td class="rt">
                    {{ item.type==1 ?  $t('HashRate.Entrust.currentTableLmie') : item.type==2 ? $t('HashRate.Entrust.currentTableMarket'):$t('HashRate.Entrust.currentTableType') }}
                  </td>
                  <td
                    :class="item.direction===1 ? 'cl_buy' : 'cl_sell'"
                    class="rt"
                  >
                    {{ item.direction===1 ? $t('HashRate.Entrust.buyDirection') : $t('HashRate.Entrust.sellDirection') }}
                  </td>
                  <td class="rt">
                    {{ item.fPrice }} {{ item.tradePair ? item.tradePair.split('/')[1] : '' }}
                  </td>
                  <td class="rt">
                    {{ item.tNum }} {{ item.tradePair ? item.tradePair.split('/')[0] : '' }}
                  </td>
                  <td class="rt">
                    {{ item.total }} {{ item.tradePair ? item.tradePair.split('/')[1] : '' }}
                  </td>
                  <td class="rt">
                    {{ item.completNum }} {{ item.tradePair ? item.tradePair.split('/')[0] : '' }}
                  </td>
                  <td class="rt">
                    {{ item.unCompletNum }} {{ item.tradePair ? item.tradePair.split('/')[0] : '' }}
                  </td>
                  <td class="rt">
                    {{ item.condition||'--' }} {{ item.tradePair ? item.tradePair.split('/')[1] : '' }}
                  </td>
                  <td
                    @click="revocation(item)"
                    class="rt cl113 cuso"
                  >
                    {{ $t('HashRate.Entrust.currentTableRevoke') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        class="loadingPic deal"
        v-buybit-loading="loading"
        v-if="loading"
      ></div>
      <!-- 翻页 -->
      <div
        class="deal-paging-source tr"
        v-if="total>0 && !loading"
      >
        <el-pagination
          background
          @current-change="handChange"
          :page-size="pageSize"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <div
        class="anonymous"
        v-if="!pageCurrentData.length && !loading"
      >
        <div v-if="token">
          <div class="anonymous-pic tc">
            {{ $t('HashRate.Entrust.notData') }}
            <!-- <img
              src="~/static/images/user/anonymous.svg"
              alt=""
              v-if="background=='day'"
            >
            <img
              src="~/static/images/user/anonymous_black.svg"
              v-else
              alt=""
            > -->
          </div>
        </div>
        <div
          v-else
          class="islogin"
        >
          <a
            href="#"
            @click="showLoginModalBox"
          >{{ $t('HashRate.Entrust.login') }}</a>
          /
          <a
            href="#"
            @click="showRegModalBox"
          > {{ $t('HashRate.Entrust.reg') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Articles',
  props: ['isSelect', 'changeState', 'symbleto', 'symblefrom', 'isHideType'],
  data () {
    return {
      loading: true,
      popupstate: false,
      serachOrder: {
        pageindex: 1,
        pagesize: 20,
        orderstatus: '0,1'
      },
      searchParam: {},
      orderDetail: [],
      market: [],
      total: 0,
      pageSize: 7,//当前条数
      pageNo: 1,//当前页
      currentCondition: [],//当前委托数据(条件)
      pageCurrentData: [],//当前委托数据
      isType: false,//隐藏其他交易对状态
      timeInterval: null,
      token: '',
      background: '',
    }
  },
  mounted () {
    this.$nextTick(() => {
      // // 注销登录
      // this.$bus.on("user-logout", () => {
      //   this.init();
      // });
      // // 登录成功
      // this.$bus.on("Login-Success", () => {
      //   this.init();
      // });
      // //如果下单了就更新下数据
      this.$bus.on('tradeAddOrade', () => {
        this.init();
      });
      // //监听订单
      // this.$bus.on('HashRateOrderChange', () => {
      //   this.init();
      // });
      // this.$bus.on('changeTheme', () => {
      //   this.background = this.$store.state.background
      // })
      this.init();
    })
  },
  created () {
  },
  destroyed () {
    clearInterval(this.timeInterval)
  },
  methods: {
    init () {
      this.token = this.$store.state.token
      if (this.$store.state.token) {
        this.currentOrder();
      } else {
        this.pageCurrentData = []
        this.total = 0
        this.loading = false;
      }
    },
    //获取当前委托订单
    currentOrder () {
      let obj = {
        pageSize: this.pageSize,//当前条数  
        page: this.pageNo,//当前页
      }
      this.$api.Trade.GetAdvertList(obj).then((res) => {
        if (res.isSuccess) {
          this.pageCurrentData = res.data.rows;
          this.total = res.data.count;
          this.loading = false;
        }
      })
    },
    //撤销当前订单
    revocation (item) {
      let id = `${item.id}`;
      this.$api.HashRate.revocation(id).then((res) => {
        if (res && res.data.code === 200) {
          this.pageNo = 1;
          this.total = 0
          this.currentOrder();
          clearInterval(this.timeInterval)
          this.timeInterval = setTimeout(() => {
            this.$bus.emit('currentOrder')
          }, 1000)
        }
      })
    },
    handChange (val) {
      this.pageNo = val;
      this.init()
    },
    //显示登录
    showLoginModalBox () {
      this.$bus.$emit("BusClick");
    },
    //显示注册
    showRegModalBox () {
      this.$bus.$emit("BusRegClick");
    },
  },
}
</script>
