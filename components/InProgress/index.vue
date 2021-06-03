<template>
  <div class="w-full bkffffff pt-6 test-page">
    <div class="pb-5 bkffffff">
      <div class="shadow-md">
        <div class="w1348 m-auto">
          <el-tabs
            v-model="GetOrderPageParams.type"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="全部订单"
              name="0"
            >
              <div class="flex justify-left">
                <div class="text-left pb-6">
                  <div class="mb-2">币种</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="GetOrderPageParams.advertCode"
                    @change="GetOrderPage(true)"
                    placeholder="请选择币种"
                  >
                    <el-option
                      label="全部"
                      value=""
                    >
                    </el-option>
                    <el-option
                      v-for="(item, index) in CoinList"
                      :key="index"
                      :label="item.ccCode"
                      :value="item.ccCode"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="text-left ml-4 pb-6">
                  <div class="mb-2">交易类型</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="GetOrderPageParams.orderType"
                    @change="GetOrderPage(true)"
                    placeholder="请选择类型"
                  >
                    <el-option
                      v-for="item in $commonSwitch.arrayData.typeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="text-left ml-4 pb-6">
                  <div class="mb-2">状态</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="GetOrderPageParams.status"
                    @change="GetOrderPage(true)"
                    placeholder="请选择状态"
                  >
                    <el-option
                      v-for="item in $commonSwitch.arrayData.orderStateList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="进行中"
              name="1"
            >
              <!-- <div class="flex justify-left">
                <div class="text-left pb-6">
                  <div class="mb-2">币种</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="CoinValue"
                    placeholder="请选择币种"
                  >
                    <el-option
                      label="全部"
                      value=""
                    >
                    </el-option>
                    <el-option
                      v-for="(item, index) in CoinList"
                      :key="index"
                      :label="item.ccCode"
                      :value="item.ccCode"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="text-left ml-4 pb-6">
                  <div class="mb-2">交易类型</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="typeValue"
                    placeholder="所有类型"
                  >
                    <el-option
                      v-for="item in $commonSwitch.arrayData.typeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="text-left ml-4 pb-6">
                  <div class="mb-2">状态</div>
                  <el-select
                    class="w115 inProgress-input"
                    size="mini"
                    v-model="orderStateValue"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in $commonSwitch.arrayData.orderStateList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div> -->
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="bkF8F8F8">
      <div class="pt-4 w1348 m-auto clearfix">
        <table class="min-w-full divide-y divide-gray-200 diy-table">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                币种
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                总价
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                价格&数量
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                交易方
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                状态
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium bkF8F8F8 uppercase tracking-wider"
              >
                操作
              </th>
            </tr>
          </thead>
          <!-- 骨架屏/占位 -->
          <tbody
            v-if="!coinMarketList.length"
            class="bg-white divide-y divide-gray-200 animate-pulse"
          >
            <tr
              v-for="index in 6"
              :key="index"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="rounded-full bk02AD8F h-12 w-12"></div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      <div class="h-4 w80 bk02AD8F rounded"></div>
                    </div>
                    <div class="text-sm text-gray-500 mt-2">
                      <div class="h-4 w115 bk02AD8F rounded"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w115 bk02AD8F rounded"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w115 bk02AD8F rounded"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 w115 bk02AD8F rounded"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="h-4 w115 bk02AD8F rounded"></div>
              </td>
            </tr>
          </tbody>
          <tbody
            v-else-if="OrderPage.length"
            class="bg-white divide-y divide-gray-200"
          >
            <template v-for="(item, index) in OrderPage">
              <tr :key="100000 + index">
                <td
                  class="bkFBFBFB fs12 py-4 pl-4"
                  colspan="6"
                >
                  <span class="cl02AD8F ml-2 mr-1">{{ $commonSwitch.typeSwitch(UserInfo.userID==item.advertUserID?item.advertType:item.orderType) }}</span>|<span class="ml-1 cl454545">{{ item.orderID }}</span> <span class="cl838383">{{ $dateFrom.datetime(item.createTime) }}</span>
                </td>
              </tr>
              <tr
                class="tr-hover"
                :key="index"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex justify-left items-center">
                    <span class=" w16 h16 bk02AD8F clffffff rounded-full mr-1 flex items-center justify-center">{{ item.advertCode.length ? item.advertCode.substring(0,1) : '' }}</span>
                    <span>{{ item.advertCode }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class=" font-bold">{{ item.receiveTotal }}</span>
                  <span>{{ item.receiveCode }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="css-vurnku">
                    <div class="flex">
                      <div class="mr-4 w60">价格</div>
                      <div class="css-vurnku">{{ item.receivePrice }} {{ item.receiveCode }}/{{ item.advertCode }}</div>
                    </div>
                    <div class="flex  mt-2">
                      <div class="mr-4 w60">数量</div>
                      <div
                        class="css-vurnku"
                        style="direction: ltr"
                      >
                        {{ item.receiveNum }} {{ item.advertCode }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="cl02AD8F">{{ item.advertNickname }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ $commonSwitch.switchOrderStateList(item.status) }}
                  <nuxt-link :to="`/${locale}/Buycoins/OrderDetails/${item.orderID}`">
                    <div class="cl02AD8F">订单详情</div>
                  </nuxt-link>
                </td>
                <td class="pr-6 py-4 w80 whitespace-nowrap text-right font-medium">
                  <div v-if="item.countDown > 0">还剩{{ $dateFrom.formatSeconds(item.countDown) }}</div>
                  <!-- <div
                    v-if="item.status == 1"
                    class="bk02AD8F clffffff w80 text-center py-1 my-2 rounded"
                  >我已付款</div> -->
                  <div
                    @click="id = item.orderID,cancelDialogVisible = true"
                    v-if="item.countDown > 0 && item.status == 1"
                    class="cl02AD8F cursor-pointer"
                  >取消订单</div>
                </td>
              </tr>
            </template>
          </tbody>
          <tbody class="bg-white w-full divide-y divide-gray-200 h400 " v-else>
            <tr>
              <td colspan="6">
                <img class="m-auto mt-20 w60 h60" src="/img/user/icon_Noorder.svg" alt="">
                <div class="fs12 text-center cl9C9C9C pt-6 mb-20">暂无数据</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="float-right my-4">
          <el-pagination
            :page-size="GetOrderPageParams.pageSize"
            :page-count="GetOrderPageParams.page"
            layout="prev, pager, next"
            :total="pageTotal"
            @current-change="handleCurrentChange"
            class="pagination-box"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 取消订单 -->
    <el-dialog
      :visible.sync="cancelDialogVisible"
      title="取消订单"
      width="480px"
      class="new-dialog cancel-dialog"
    >
      <div class="border-t">
        <div class="cl000000 bkF8F8F8 p-4 my-4">
          <div class="mb-2">温馨提示</div>
          <p class="lh21">1.如果您已向卖家付款，请千万不要取消交易</p>
          <p class="lh21">2.取消规则：买家当日累计3笔取消，会限制当日买入功能</p>
        </div>
      </div>
      <div class="cl2E2E2E fs16 pb-4">你为什么要取消订单？</div>
      <div>
        <el-checkbox-group v-model="feedbackList">
          <div class="py-2">
            <el-checkbox label="1">我不想交易了</el-checkbox>
          </div>
          <div class="py-2">
            <el-checkbox label="2">我不满足广告交易条款的要求</el-checkbox>
          </div>
          <div class="py-2">
            <el-checkbox label="3">卖家要额外收取费用</el-checkbox>
          </div>
          <div class="py-2">
            <el-checkbox label="4">卖家收款方式有问题，无法成功打款</el-checkbox>
          </div>
          <div class="py-2">
            <el-checkbox label="5">其他</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class=""
          @click="cancelDialogVisible = false"
        >取消</el-button>
        <el-button
          class=""
          type="primary"
          @click="CancelOrder()"
        >确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    CoinList: {
      type: Array,
      default: []
    },
  },
  data () {
    return {
      value: '所有订单',
      options: [
        {
          label: '所有订单',
          value: '所有订单'
        },
        {
          label: '部分订单',
          value: '部分订单'
        }
      ],
      coinMarketList: [{
        id: '20210836748506116096',
        time: '2021-04-01 15:16:42',
        name: 'BTC',
        alias: 'Bitcoin',
        price: '$1000.00',
        percent: '3.39',
        Quantity: '4,365.01',
        PartyA: '安心快捷  全程无忧',
        status: true
      }, {
        id: '20210836748506116096',
        time: '2021-04-01 15:16:42',
        name: 'BTC',
        alias: 'Bitcoin',
        price: '$1000.00',
        percent: '3.39',
        Quantity: '4,365.01',
        PartyA: '安心快捷  全程无忧',
        status: true
      }, {
        id: '20210836748506116096',
        time: '2021-04-01 15:16:42',
        name: 'BTC',
        alias: 'Bitcoin',
        price: '$1000.00',
        percent: '3.39',
        Quantity: '4,365.01',
        PartyA: '安心快捷  全程无忧',
        status: true
      }],
      pageTotal: 0,
      GetOrderPageParams: {
        "page": 1,// "页码"
        "pageSize": 10,// "单页条数"
        "type": 0,//0全部，1进行中
        "advertCode": "",// "挂单币种"
        "orderType": 0,// "交易类型:1购买,2出售"
        "status": 0,// "状态:1未付款,2已付款,3已取消,4申诉中,9已完成"
      },
      OrderPage: [],
      timer: null,
      // 取消订单，反馈列表
      feedbackList: [],
      cancelDialogVisible: false,
      id: '',//订单id
    }
  },
  computed: {
    ...mapState(['locale', 'UserInfo'])
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      this.GetOrderPageParams.page = 1
      this.GetOrderPage()
    },
    handleCurrentChange (val) {
      this.GetOrderPageParams.page = val
      this.$goPageTop('.el-scrollbar__wrap');
      this.GetOrderPage()
    },
    // 查询订单列表
    GetOrderPage (val) {
      clearInterval(this.timer)
      if(val){
        // val 为true：查询条件改变
        this.GetOrderPageParams.page=1
      }
      this.$api.OtcOrder.GetOrderPage(this.GetOrderPageParams).then(res => {
        if (res.isSuccess) {
          this.OrderPage = res.data.rows
          this.pageTotal = res.data.count
          // // 倒计时
          // this.timer = setInterval(() => {
          //   this.Order.countDown--
          //   if (this.Order.countDown <= 0) {
          //     clearInterval(this.timer)
          //     this.GetOrder()
          //   }
          // }, 1000)
          this.timer = setInterval(() => {
            let n = 0
            this.OrderPage.map(item => {
              if (item.countDown) {
                item.countDown--
              } else {
                n++
                if (this.OrderPage.length == n) {
                  clearInterval(this.timer)
                }
              }
            });
          }, 1000);
        }
      })
    },
    // $dateFrom.formatSeconds(item.countDown)
    handleClick (tab, event) {
      this.GetOrderPageParams.page = 1
      this.GetOrderPage()
    },
    // 取消订单
    CancelOrder () {
      let params = {
        "orderID": this.id,// "订单ID"
      }
      this.$api.OtcOrder.CancelOrder(params).then(res => {
        if (res.isSuccess) {
          this.cancelDialogVisible = false
          this.feedbackList = []
          this.$message.success("订单取消成功")
          this.GetOrderPage()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.inProgress-input {
  /deep/.el-input--suffix .el-input__inner {
    background-color: #fff;
  }
}
/deep/.el-pagination.pagination-box {
  button:disabled,
  .el-pager li,
  .btn-prev,
  .btn-next {
    background: transparent;
  }
}
.diy-table .tr-hover:hover > td {
  background: #f5f7fa;
}
.diy-table .tr-hover,
.diy-table .tr-hover td {
  border: none;
}
</style>