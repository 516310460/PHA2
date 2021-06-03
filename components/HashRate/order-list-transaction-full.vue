<style scoped rel="stylesheet/scss" lang="scss">
/deep/.el-table__empty-block{
  display: none;
}
.scroll-bar {
  height: 200px;
  /deep/.MsgScrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }
  .HistoryTitle {
    width: 100%;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid RGBA(133, 131, 172, 0.2);
    .HistoryTitle-Move {
      padding-right: 10px;
    }
  }
  //历史委托
  /deep/.pageHistory_table {
    color: $cl_content;
    .el-table__body-wrapper {
      .expand .el-table__expand-column .cell {
        display: none;
      }
      .el-table__empty-block {
        margin-top: 40px;
      }
    }
    .cl_buy {
      color: $cl_buy;
    }
    .cl_sell {
      color: $cl_sell;
    }
    tr {
      height: 30px;
    }
    .el-table__body {
      // padding-bottom: 30px;
    }
    tr,
    td,
    th {
      font-size: 12px;
      padding: 0;
      background-color: $co112;
      color: #5e6573;
      border-bottom: 1px solid RGBA(133, 131, 172, 0.2);
      &:hover {
        td {
          background-color: $cl_282D37;
        }
      }
    }
    td {
      color: #ced3dd !important;
    }
    .buybit_table_header,
    .buybit_table_body {
      border: none;
      tr,
      th,
      td {
        border: none;
      }
    }
    // 白
    &.day {
      color: $cl_content;
      tr,
      td,
      th {
        background-color: $cl_fff;
        color: $co52 !important;
        &:hover {
          td {
            background-color: $cl_f0e;
          }
        }
      }
      .el-table__header {
        font-weight: 900;
        background-color: #f8f9fb;
        tr,
        td,
        th {
          background-color: #f8f9fb !important;
          color: $cl_999 !important;
          border-bottom: 1px solid RGBA(133, 131, 172, 0.2);
          &:hover {
            td {
              background-color: $cl_f0e;
            }
          }
        }
      }
      .buybit_table_header,
      .buybit_table_body {
        border: none;
        tr,
        th,
        td {
          background-color: $cl_fff !important;
          border: none;
        }
      }
    }
  }
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
.sorts {
  color: $cl_999;
  padding-left: 3px;
  display: inline-block;
  height: 27px;
  i {
    display: inline-block;
    width: 10px;
    height: 6px;
    position: relative;
    top: -1px;
  }
  i.sortup {
    background: url('../../static/images/s_up.png') no-repeat center center;
  }
  i.sortdown {
    background: url('../../static/images/s_down.png') no-repeat center center;
  }
  i.sortup.active {
    background: url('../../static/images/s_up_check.svg') no-repeat center
      center;
  }
  i.sortdown.active {
    background: url('../../static/images/s_down_check.svg') no-repeat center
      center;
  }
}
</style>

<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <!-- v-bar -->
        <div>
          <div class='scroll-bar'>
            <el-row class="HistoryTitle">
              <el-col
                v-for="(item, index) in timeData"
                :key="index"
                :span="2"
                class=" cursor-pointer cuso"
                :class="timeDataIndex == index ? 'cl127' : ''"
                @click.native="clickTilte(index)"
              >
                {{item.name}}
              </el-col>
              <el-col
                v-if="token"
                class="fr tr HistoryTitle-Move cl127 cuso"
                :span="2"
              >
                <nuxt-link
                  tag="div"
                  :to="`/${locale}/HashRate/Entrust`"
                >
                  {{$t('HashRate.Entrust.more')}}
                </nuxt-link>
              </el-col>
            </el-row>
            <el-scrollbar
              class="MsgScrollbar"
              ref="TransactionPairsScrollbar"
            >
              <!-- @row-click="onRowClick"
                :row-class-name="tableRowClassName" -->
              <el-table
                ref="table"
                :class="{'day': background=='day'}"
                class="pageHistory_table"
                :data="pageHistoryData"
                :empty-text="$t('HashRate.Entrust.notData')"
                style="width: 100%"
                :row-class-name="setClassName"
                @expand-change="historyOrderDetails"
              >
                <el-table-column
                  width="180"
                  :label="$t('HashRate.Entrust.historyTable1')"
                  prop="createTime"
                >
                  <template slot-scope="scope">
                    {{ $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="交易对"
                  prop="coinTeam"
                >
                  <template slot-scope="scope">
                    {{`${scope.row.coinTeam.split('-')[0]}/${scope.row.coinTeam.split('-')[1]}`}}
                  </template>
                </el-table-column> -->
                <el-table-column
                  :label="$t('HashRate.Entrust.historyTable2')"
                  prop="type"
                >
                  <template slot-scope="scope">
                    {{scope.row.type==1 ? $t('HashRate.Entrust.historyTableLmie') : scope.row.type== 2 ? $t('HashRate.Entrust.historyTableMarket') : $t('HashRate.Entrust.historyTableType')}}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('HashRate.Entrust.historyTable3')"
                  prop="isBuy"
                >
                  <template slot-scope="scope">
                    <section :class="scope.row.direction===1 ? 'cl_buy' : 'cl_sell'">
                      {{scope.row.direction===1 ? $t('HashRate.Entrust.buyDirection') : $t('HashRate.Entrust.sellDirection')}}
                    </section>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('HashRate.Entrust.historyTable4')">
                  <template slot-scope="scope">
                    {{scope.row.fPrice}} {{scope.row.tradePair ? scope.row.tradePair.split('/')[1] : ''}}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('HashRate.Entrust.historyTable5')">
                  <template slot-scope="scope">
                    {{scope.row.tNum}} {{scope.row.tradePair ? scope.row.tradePair.split('/')[0] : ''}}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('HashRate.Entrust.historyTable6')">
                  <template slot-scope="scope">
                    {{scope.row.completNum}} {{scope.row.tradePair ? scope.row.tradePair.split('/')[0] : ''}}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('HashRate.Entrust.historyTable7')"
                  width="135"
                >
                  <template slot-scope="scope">
                    <span :title="`${scope.row.fAvgPrice || 0} ${scope.row.tradePair ? scope.row.tradePair.split('/')[1] : ''}`">
                      {{scope.row.fAvgPrice || 0}} {{scope.row.tradePair ? scope.row.tradePair.split('/')[1] : ''}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('HashRate.Entrust.historyTable8')"
                  prop="status"
                >
                  <template slot-scope="scope">
                    {{stateValue(scope.row.status)}}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('HashRate.Entrust.historyTable9')"
                  width="70"
                  type="expand"
                >
                  <template slot-scope="props">
                    <table class="buybit_table">
                      <thead class="buybit_table_header padding br">
                        <tr>
                          <th class="lt">
                            {{$t('HashRate.Entrust.historyTable1')}}
                          </th>
                          <th class="rt">
                            {{$t('HashRate.Entrust.historyTable10')}}
                          </th>
                          <th class="rt">
                            {{$t('HashRate.Entrust.historyTable11')}}
                          </th>
                          <th class="rt">
                            {{$t('HashRate.Entrust.historyTable12')}}
                          </th>
                          <th class="rt">
                            {{$t('HashRate.Entrust.historyTable13')}}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="deal-tbody">
                        <!-- v-for="(item, index) in historyDetails" -->
                        <tr
                          v-for="(item, index) in props.row.Details"
                          :key="index"
                          class="buybit_table_body padding"
                        >
                          <td class="lt">
                            {{item.createTime}}
                          </td>
                          <td class="rt">
                            {{Number(item.price) == 0 ? '' : item.price}} {{Number(item.price) == 0 ? '---' : (props.row.coinTeam ? props.row.coinTeam.split('-')[1] : '')}}
                          </td>
                          <td class="rt">
                            {{item.number}} {{props.row.isBuy && item.dealWay == 'cancel' ? props.row.coinTeam.split('-')[1] : (props.row.coinTeam ? props.row.coinTeam.split('-')[0] : '')}}
                          </td>
                          <td class="rt">
                            {{Number(item.totalPrice) == 0 ? '' : item.totalPrice}} {{Number(item.totalPrice) == 0 ? '---' : (props.row.coinTeam ? props.row.coinTeam.split('-')[1] : '')}}
                          </td>
                          <td class="rt">
                            {{Number(item.poundage) == 0 ? '' : item.poundage}} {{Number(item.poundage) == 0 ? '---' : (props.row.coinTeam ? (props.row.isBuy ? props.row.coinTeam.split('-')[0] : props.row.coinTeam.split('-')[1]) : '')}}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
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
        v-if="total>0"
      >
        <el-pagination
          background
          @current-change="handChange"
          :page-size="pageSize"
          :current-page="pageNo"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <div
        class="anonymous"
        v-if="!pageHistoryData.length"
      >
        <div
          v-if="!token"
          class="islogin"
        >
          <a
            href=#
            @click="showLoginModalBox"
          >{{$t('HashRate.Entrust.login')}}</a>
          /
          <a
            href=#
            @click="showRegModalBox"
          > {{$t('HashRate.Entrust.reg')}}</a>
        </div>
      </div>
      <!-- <div
        class="deal-paging-source"
        v-if="total>0"
      >
        <el-pagination
          background
          @current-change="handChange"
          :page-size="20"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div> -->
    </div>

  </div>
</template>

<script>

export default {
  name: 'articles',
  props: ['isSelect', 'symbleto', 'symblefrom', 'changeState'],
  data () {
    return {
      loading: true,
      found: false,
      total: 0,
      searchParam: {},
      orderDetail: [],
      market: [],
      pageSize: 5,//当前条数
      pageNo: 1,//当前页
      historyCondition: [],//当前委托数据(条件)
      pageHistoryData: [],//历史委托数据
      timeDataIndex: 0,//时间索引
      timeData: [
        {
          name: this.$t('HashRate.Entrust.day'),
          value: 'DAY'
        },
        {
          name: this.$t('HashRate.Entrust.week'),
          value: 'WEEK'
        },
        {
          name: this.$t('HashRate.Entrust.month'),
          value: 'MONTH'
        },
        {
          name: this.$t('HashRate.Entrust.threeMonth'),
          value: 'THREE_MONTH'
        }
      ],
      operationState: false,//是否展开详情
      // historyDetails: [],//历史列表详情
      // showIndexArr: [],//table索引数组
      token: '',
      locale: '',
      background: '',
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 注销登录
      this.$bus.on("user-logout", () => {
        this.init();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.init();
      });
      //监听订单
      this.$bus.on('HashRateOrderChange', () => {
        this.init();
      });
      this.$bus.on('changeTheme', () => {
        this.background = this.$store.state.background
      })
      this.init();
    })
  },
  created () {
  },
  methods: {
    init () {
      this.token = this.$store.state.token
      this.locale = this.$store.state.locale
      this.background = this.$store.state.background
      if (this.$store.state.token) {
        this.historyOrder();
      } else {
        this.pageHistoryData = []
        this.total = 0
        this.loading = false;
      }
    },
    historyOrder () {
     let orderTimeLimit =  this.timeData[this.timeDataIndex].value;
     let arrDate = [];
     if(orderTimeLimit=='DAY'){
        arrDate = this.$dateFrom.getToday()
     }else if(orderTimeLimit=='WEEK'){
        arrDate = this.$dateFrom.getWeek()
     }else if(orderTimeLimit=='MONTH'){
        arrDate = this.$dateFrom.getLast3Month(1)
     }else if(orderTimeLimit=='THREE_MONTH'){
        arrDate = this.$dateFrom.getLast3Month(3)
     }
      let obj = {
        pageSize: this.pageSize,//当前条数  
        page: this.pageNo,//当前页
        startTime:new Date(arrDate[0]).getTime(),
        endTime:new Date(arrDate[1]).getTime()
        // param: {
        //   orderTimeLimit: this.timeData[this.timeDataIndex].value,//DAY:当天 WEEK:当周 THREE_MONTH:三个月
        // }
      }
      this.$api.Trade.GetAdvertHis(obj).then((res) => {
        if (res.isSuccess) {
          let newarray = []
          res.data.rows.forEach((item, index) => {
            newarray.push({
              index: index,
              createTime: item.createTime,
              tradePair: item.tradePair,
              createTime: item.createTime,
              completNum: item.completNum,
              id: item.id,
              direction: item.direction,
              fAvgPrice:item.fAvgPrice,
              type: item.type,
              tNum: item.tNum,
              fPrice: item.fPrice,
              priority: item.priority,
              remark: item.remark,
              status: item.status,
              condition:item.condition,
              turnover:item.turnover,
              totalPrice: item.totalPrice,
              id: item.id,
              unFinishNumber: item.unFinishNumber,
              Details: [],//详情
              expand: true
            })
          });
          this.pageHistoryData = newarray
          this.total = res.data.count;
          this.loading = false;
        }
      })
    },
    handChange (val) {
      this.pageNo = val
      this.init()
    },
    //状态筛选
    stateValue (state) {
      let str = "";
      //状态（0挂单，1部分成交，2全部成交，3已撤销，4已结算，其他异常）
      switch (state) {
        case 0:
          str = this.$t('HashRate.Entrust.historyTableState1');
          break;
        case 1:
          str = this.$t('HashRate.Entrust.historyTableState2');
          break;
        case 2:
          str = this.$t('HashRate.Entrust.historyTableState3');
          break;
        case 3:
          str = this.$t('HashRate.Entrust.historyTableState4');
          break;
        case 4:
          str = this.$t('HashRate.Entrust.historyTableState5');
          break;
        case 9:
          str = this.$t('HashRate.Entrust.historyTableState3');
          break;
      }
      return str;
    },
    //点击时间条件
    clickTilte (index) {
      this.pageNo = 1
      this.timeDataIndex = index
      this.historyOrder()
    },
    //历史订单详情
    historyOrderDetails (row, expandedRows) {
      this.$api.HashRate.historyOrderDetails(`${row.id}`).then((res) => {
        if (res && res.status === 200) {
          this.pageHistoryData[row.index].Details = res.data.data
        }
      });
    },
    setClassName ({ row, index }) {
      return row.expand ? '' : 'expand';
    },
    //显示登录z
    showLoginModalBox () {
      this.$bus.$emit("BusClick");
    },
    //显示注册
    showRegModalBox () {
      this.$bus.$emit("BusRegClick");
    },
  }
}
</script>




