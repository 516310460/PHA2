<template>
  <section>
    <section class="OTCNotice w-1200 mx-auto bk222E4B">
      <section class="OTCNotice-Content">
        <div class="flex items-center justify-between">
          <img
            src="/svg/tongzhi.svg"
            alt=""
          >
          <div class="marquee_box flex-1">
            <marquee class="clffffff">近期因hpool官方对矿池异常账户进行清理，是为解决双挖、假算力、网络DDOS攻击等问题，从而确保矿工的利益。在此期间hpool矿池的提现速度降低，请各位会员稍多等待一段时间，给各位带来的不便，敬请谅解。</marquee>

            <!-- <ul
              class="marquee_list"
              :class="{marquee_top: animate}"
            >
              <li
                v-for="(item, index) in NoticeList"
                :key="index"
              >
                <nuxt-link
                  class="clffffff"
                  :to="`/${locale}/Public/Notice/Details/${item.id}`"
                >{{ item.title }}</nuxt-link>
              </li>
            </ul> -->
          </div>
          <!-- <span class="cl02AD8F cursor-pointer">更多 ></span> -->
        </div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Notice',
  components: {
  },
  data () {
    return {
      // MyOrderPageSize: 4,// 订单分页数
      MyOrderPageSize: 10,// 订单分页数
      // MyOrderPageState: false,// 订单是否分页
      MyOrderPageState: true,// 订单是否分页
      animate: false,
      locale: this.$store.state.locale,
      NoticeList: [
        {
          id: 1,
          title: "公告1"
        },
        {
          id: 2,
          title: "公告2"
        }
      ],// 广告列表
      pageNum: 1,
      PageSize: 10
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      setInterval(this.showMarquee, 10000)
      // this.InitData()
    });
  },
  methods: {
    InitData () {
      this.listByState()
    },
    listByState () {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.PageSize
      }
      this.$api.Footer.listByState(obj).then((res) => {
        if (res && res.data.code == 200) {
          this.NoticeList = res.data.data.items;
        }
      });
    },
    showMarquee () {
      this.animate = true;
      setTimeout(() => {
        this.NoticeList.push(this.NoticeList[0]);
        this.NoticeList.shift();
        this.animate = false;
      }, 500);
    }
  },

}
</script>
<style rel="stylesheet/scss" lang="scss">
.OTCNotice {
  position: absolute;
  overflow: hidden;
  z-index: 999;
  width: 100%;
  height: 40px;
  line-height: 40px;
  bottom: 0;
  .OTCNotice-Content {
    width: 1200px;
    margin: 0 auto;
    .marquee_box {
      display: block;
      position: relative;
      height: 40px;
      overflow: hidden;
      .marquee_top {
        transition: all 0.5s;
        margin-top: -40px;
      }
      .marquee_list {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        li {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          a {
            display: block;
          }
        }
      }
    }
    img {
      display: block;
      float: left;
      margin: 12px auto;
      width: 16px;
    }
    .NoticeMarquee {
      display: block;
      float: left;
      height: 28px;
      line-height: 28px;
      width: 720px;
      padding-left: 20px;
      a {
        display: block;
        &:hover {
          // color: $co09;
        }
      }
    }
  }
}
</style>