<style scoped rel="stylesheet/scss" lang="scss">
.exchange-record {
  background-color: $cl_content;
  margin-bottom: 20px;
  font-size: 12px;
  color: $cl_CED3DD;
  .exchange-record_table_body .sale {
    color: $cl_sell;
  }

  .exchange-record_table span.tr {
    text-align: right;
  }
  .exchange-record_title {
    color: $cl_8790A1;
    font-size: 14px;
    border-bottom: 1px solid $cl_292E39;
    > span {
      font-weight: bold;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;
    }
    .active {
      border-top: 2px solid $cl_link;
      background-color: $cl_292E39;
      color: $cl_link;
    }
  }

  .exchange-record_table {
    display: table;
    width: 100%;
  }

  .exchange-record_table_header {
    font-size: 12px;
    color: $cl_8790A1;
    display: table-header-group;
  }

  .exchange-record_table_header span,
  .exchange-record_table_body span {
    display: table-cell;
    padding: 8px 20px;
    line-height: 22px;
  }

  .exchange-record_table_body {
    background-color: #1a2134;
    font-size: 12px;
    color: $cl_c5c;
    display: table-row;
  }

  .exchange-record_table_body .buy {
    color: $cl_buy;
  }
  .anonymous {
    background: none;
  }

  .entrust-list_title {
    padding: 0;
  }
  p.entrust-list_title:first-child {
    margin: 0 10px;
  }

  .entrust-list_title {
    color: rgba(197, 195, 221, 1);
  }
  .entrust-list_title.active {
    border-bottom: 2px solid $cl_link;
    color: white;
  }
  /*分页*/
  .paging-source-deal {
    padding: 10px 0;
    text-align: center;
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background: rgba(26, 33, 52, 1);
      border: 1px solid rgba(52, 75, 108, 1);
      color: rgba(189, 188, 203, 1);
    }
  }
  .repeal {
    color: $cl_link;
    cursor: pointer;
  }
}

.hide-trading .el-checkbox .el-checkbox__label .label-tip {
  font-size: 12px;
  font-weight: 400;
  color: rgba(135, 144, 161, 1);
  line-height: 14px;
}

.el-checkbox__inner {
  background: none !important;
}
</style>
<template>
  <div class="exchange-record">
    <div class="exchange-record_title">
      <span
        :class="{'active':changeState==1}"
        @click="tabChange(1)"
      >{{ $t('HashRate.Entrust.currentTitle') }}</span>
      <span
        :class="{'active':changeState==2}"
        @click="tabChange(2)"
      >{{ $t('HashRate.Entrust.historyTitle') }}</span>
      <span
        :class="{'active':changeState==3}"
        @click="tabChange(3)"
      >{{ $t('HashRate.Entrust.historyDeal') }}</span>
      <span
        :class="{'active':changeState==4}"
        @click="tabChange(4)"
      >{{ $t('HashRate.Entrust.assetManagement') }}</span>
    </div>
    <buybit-entrust-full
      v-if="changeState==1"
      :change-state="changeState"
      :symbleto="symbleto"
      :symblefrom="symblefrom"
      :is-select="isSelect"
    />
    <buybit-transaction-full
      v-if="changeState==2"
      :change-state="changeState"
      :symbleto="symbleto"
      :symblefrom="symblefrom"
      :is-select="isSelect"
    />
    <buybit-entrust-full-history
      v-if="changeState==3"
      :change-state="changeState"
      :symbleto="symbleto"
      :symblefrom="symblefrom"
      :is-select="isSelect"
    />
    <buybit-asset-full
      v-if="changeState==4"
      :change-state="changeState"
      :symbleto="symbleto"
      :symblefrom="symblefrom"
      :is-select="isSelect"
    />
  </div>
</template>
<script>
import entrust from '@/components/HashRate/order-list-entrust-full'
import transaction from '@/components/HashRate/order-list-transaction-full'
import entrustHistory from '@/components/HashRate/order-list-entrust-full-history'
import assetManagement from '@/components/HashRate/order-list-asset-full';

export default {
  name: 'OrderListFull',
  components: {
    'buybit-entrust-full': entrust,
    'buybit-entrust-full-history': entrustHistory,
    'buybit-transaction-full': transaction,
    'buybit-asset-full': assetManagement,
  },
  props: {
    symbleto: {
      type: String,
      default: ''
    },
    symblefrom: {
      type: String,
      default: ''
    },
    ordersymble: {
      type: String,
      default: ''
    },
    symbleParameString: {
      type: String,
      default: ''
    },
    dailyDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  data () {
    return {
      //交易记录
      found: false,
      total: 0,
      tradingRecord: [],
      changeState: 1,
      isSelect: ''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    //设置订单类型
    tabChange (num) {
      this.changeState = num
    }
  }
}
</script>
