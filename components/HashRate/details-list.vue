<style scoped rel="stylesheet/scss" lang="scss">
.dealcoin-list {
  width: 220px;
  margin-bottom: 4px;
  margin-right: 4px;
  overflow: hidden;

  // border: 1px solid #222e3e;
  /deep/.MsgScrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      // margin-right: 0 !important;
      // padding-right: 17px;
      // width: 100%;
      // margin: 0 !important;
      overflow-x: hidden !important;
    }
  }

  .dealcoin-list-Profit-Title {
    padding: 5px 10px;
  }

  .dealcoin-list-Profit-Content {
    padding: 5px 10px;
    color: $cl_8790A1;
    line-height: 19px;
    .list-Profit-Content-padding {
      padding: 10px 0;
    }
    .Profit-border-bottom {
      margin-bottom: 5px;
      // padding-bottom: 5px;
      padding: 10px 0;
      border-bottom: 1px solid $co114;
    }

    .Profit-border-right {
      border-right: 1px solid $co114;
    }

    .Profit-lineHeight-auto {
      margin-top: 10px;
      line-height: 1;

      div {
        margin-top: 5px;
      }
    }
  }
}
.dealcoin-listContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .dealcoin-listContent-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    .dealcoin-listContent-listauto {
      flex: 1;
      width: 100%;
      overflow-y: auto;
    }
  }
}
</style>
<template>
  <div class="dealcoin-list bk112">
    <section class="dealcoin-listContent">
      <section class="dealcoin-listContent-list">
        <section class="dealcoin-listContent-listauto">
          <el-scrollbar
            class="MsgScrollbar"
            ref="TransactionPairsScrollbar"
          >
            <!-- 我的收益 -->
            <section class="dealcoin-list-Profit fs14">
              <el-row>
                <el-col
                  :span="24"
                  class="bk114 dealcoin-list-Profit-Title"
                >
                  <el-col
                    :span="7"
                    class="dealcoin-list-Profit-Title-Left cl29"
                  >
                    {{ $t("HashRate.pro.detailsList.myProfit") }}
                  </el-col>
                  <el-col
                    :span="24"
                    class="cl113 tr fs12"
                  >
                    <span style="float: left;">{{ $t("HashRate.pro.detailsList.XBITBalance")}}</span>
                    {{myIncomeData.balance ? myIncomeData.balance || 0 : "----"}}
                  </el-col>
                </el-col>
                <el-col
                  :span="24"
                  class="dealcoin-list-Profit-Content fs12"
                >
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="13"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.yesterdayProfit") }}
                      <div class="cl113">{{
                        myIncomeData.yesterdayIncome
                          ? (myIncomeData.yesterdayIncome || 0) + " BTC"
                          : "----"
                      }}</div>

                    </el-col>
                    <el-col
                      :span="11"
                      class="dealcoin-list-Profit-Content-Right tr cl113"
                    >
                      <i
                        v-popover:popover2
                        class="el-icon-warning cl24"
                      ></i>
                    </el-col>
                  </el-col>
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="15"
                      class="dealcoin-list-Profit-Content-Left dealcoin-list-Profit-Content-Right"
                    >
                      {{ $t("HashRate.pro.detailsList.todayXBITProfit") }}
                      <div class="cl113">{{
                        myIncomeData.todaySumHold
                          ? (myIncomeData.todaySumHold || 0) + " XBIT"
                          : "----"
                      }}</div>
                    </el-col>
                    <el-col
                      :span="9"
                      class="dealcoin-list-Profit-Content-Right tr cl113"
                    >
                      <i
                        v-popover:popover1
                        class="el-icon-warning cl24"
                      ></i>
                    </el-col>
                  </el-col>
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="14"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.todayProfit") }}
                      <div class="cl113">{{
                        myIncomeData.preIncome
                          ? (myIncomeData.preIncome || 0) + " BTC"
                          : "----"
                      }}</div>
                    </el-col>
                    <el-col
                      :span="10"
                      class="dealcoin-list-Profit-Content-Right tr cl113"
                    >
                      <i
                        v-popover:popover3
                        class="el-icon-warning cl24"
                      ></i>
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </section>
            <!-- XBIT收益 -->
            <section class="dealcoin-list-Profit fs14">
              <el-row>
                <el-col
                  :span="24"
                  class="bk114 dealcoin-list-Profit-Title"
                >
                  <el-col
                    :span="12"
                    class="dealcoin-list-Profit-Title-Left cl29"
                  >
                    {{ $t("HashRate.pro.detailsList.XBITProfit") }}
                  </el-col>
                </el-col>
                <el-col
                  :span="24"
                  class="dealcoin-list-Profit-Content fs12"
                >
                  <el-col
                    :span="24"
                    class="Profit-border-bottom"
                  >
                    <el-col
                      :span="12"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.totalCirculation") }}
                    </el-col>
                    <el-col
                      :span="12"
                      class="dealcoin-list-Profit-Content-Right tr cl113"
                    >
                      {{ powerDataInfo.xbitTrustTotalNumber }}
                    </el-col>
                  </el-col>
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.todayTotalProfit") }}
                      <i
                        v-popover:popover4
                        class="el-icon-warning fr cl24"
                      ></i>
                    </el-col>
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Right tl cl113"
                    >
                      {{ powerDataInfo.xbitProfitBtc }} BTC
                      <p>≈ {{ powerDataInfo.xbitProfitUsdt }} USDT</p>
                    </el-col>
                  </el-col>
                  <!-- <el-col :span="24">
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      <el-col
                        :span="24"
                        class="cl113 tr"
                      >
                        <div>
                          ≈
                          {{XBIT.todayXBITUsd}} USDT
                        </div>
                      </el-col>
                    </el-col>
                  </el-col> -->
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.yesterdayTotalProfit") }}
                    </el-col>
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Right tl cl113"
                    >
                      {{ powerDataInfo.yesterdayXbitProfit }} BTC
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </section>
            <!-- 矿机算力 -->
            <section class="dealcoin-list-Profit fs14">
              <el-row>
                <el-col
                  :span="24"
                  class="bk114 dealcoin-list-Profit-Title"
                >
                  <el-col
                    :span="12"
                    class="dealcoin-list-Profit-Title-Left cl29"
                  >
                    {{ $t("HashRate.pro.detailsList.mining") }}
                  </el-col>
                </el-col>
                <el-col
                  :span="24"
                  class="dealcoin-list-Profit-Content fs12"
                >
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.xbitcomputationMining") }}
                    </el-col>
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Right tl cl113"
                    >
                      {{powerDataInfo.hashrateTime}} PH/s
                    </el-col>
                  </el-col>
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.xbit24computationMining") }}
                    </el-col>
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Right tl cl113"
                    >
                      {{powerDataInfo.hashrateDay}} PH/s
                    </el-col>
                  </el-col>
                  <el-col
                    :span="24"
                    class="list-Profit-Content-padding"
                  >
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Left"
                    >
                      {{ $t("HashRate.pro.detailsList.allcomputationMining") }}
                    </el-col>
                    <el-col
                      :span="24"
                      class="dealcoin-list-Profit-Content-Right tl cl113"
                    >
                      {{powerDataInfo.hashrateAll}} EH/s
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </section>
          </el-scrollbar>
        </section>
      </section>
    </section>
    <!-- 今日累计算力提示 -->
    <!-- title="昨日收益" -->
    <el-popover
      ref="popover1"
      width="200"
      trigger="hover"
      placement="bottom-end"
      :content="$t('HashRate.pro.detailsList.todayMiningTips1')"
    >
    </el-popover>
    <!-- title="今日整点累计XBIT" -->
    <el-popover
      ref="popover2"
      width="200"
      trigger="hover"
      placement="bottom-end"
      :content="$t('HashRate.pro.detailsList.todayMiningTips2')"
    >
    </el-popover>
    <!-- title="今日预估收益" -->
    <el-popover
      ref="popover3"
      width="200"
      trigger="hover"
      placement="bottom-end"
      :content="$t('HashRate.pro.detailsList.todayMiningTips3')"
    >
    </el-popover>
    <!-- title="今日每XBIT预估收益" -->
    <el-popover
      ref="popover4"
      width="200"
      trigger="hover"
      placement="bottom-end"
      :content="$t('HashRate.pro.detailsList.todayMiningTips4')"
    >
    </el-popover>
  </div>
</template>
<script>
export default {
  props: ["day", "symbleto", "symblefrom", "dailyDetail", "tradeType"],
  data () {
    return {
      //币种列表数据是否有数据
      isLoading: true,

      /*
       * 我的收益数据
       * */

      myIncomeData: {},
      powerDataInfo: {},
      /*
       * XBIT收益
       * */
      XBIT: {}
    };
  },
  created () {
    // this.$api.HashRate.getComputingPowerAccessPowerInfo().then(res => {
    //   if (res.data.code === 200) {
    //     this.powerDataInfo = res.data.data
    //   }
    // });
  },
  mounted () {
    this.$nextTick(() => {
      this.init();
      //退出登录
      this.$bus.on("user-logout", () => {
        this.$store.commit("SET_TOKEN", "");
        this.$store.commit("SET_PUBLICTOKEN", "");
        this.init();
      });
      // 登录成功
      this.$bus.on("Login-Success", () => {
        this.init();
      });
    });
  },
  methods: {
    //初始化
    async init () {
      if (this.$store.state.token) {
        await this.myIncome();
      } else {
        this.myIncomeData = {};
      }
      await this.getXBITProfit();
    },
    //我的收益
    myIncome () {
      this.$api.HashRate.myIncome().then(res => {
        if (res.data.code === 200) {
          this.myIncomeData = res.data.data;
        }
      });
    },
    //获取XBIT收益
    getXBITProfit () {
      // this.$api.HashRate.getXBITProfit().then(res => {
      //   if (res.data.code === 200) {
      //     this.XBIT = res.data.data;
      //   }
      // });
    }
  },
  //销毁前调用
  destroyed () { }
};
</script>
