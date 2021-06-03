<template>
  <section class="Error bk29 h-full w-full">
    <div id="wrap" class="h-full">
      <div class="mb-6">
        <img class="m-auto py-20" src="../static/img/error/404.png" alt="" srcset="">
        <p class="fs20 clffffff mb-4">不好意思，找不到当前页面</p>
        <p class="fs14 cl9FA9C0">Sorry, we can't find the current page</p>
        <nuxt-link
          class="button tc fs14 "
          :to="`/`"
          v-if="error.statusCode === 404 || error.statusCode === 500"
        >
          返回首页
        </nuxt-link>
        <nuxt-link
          class="button tc fs14 "
          :to="`/`"
          v-if="error.statusCode === 404 || error.statusCode === 500"
        >
          联系我们
        </nuxt-link>
        <div class="miscbox">
          <div class="tower"></div>
          <div class="towerlight"></div>
          <div class="beam"></div>
        </div>
      </div>
      <div class="wave1">
        <div class="wave"></div>
      </div>
    </div>

    <!-- 离线展示 -->
    <NetWorkError v-if="$coinpool.isOffline"></NetWorkError>
  </section>
</template>
<script>
export default {
  props: ['error'],
  data () {
    return {
      locale: this.$store.state.locale
    }
  },
  mounted () {
    if (this.error.statusCode == 500) {
      // window.location.reload();
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#wrap {
  height: 100%;
}

.miscbox {
  position: absolute;
  bottom: 580px;
}

#wrap {
  background: url('../static/img/error/error-bg.png') no-repeat;
  background-size: 100%;
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
  position: relative;
}

#wrap a {
  display: inline-block;
  position: relative;
  z-index: 4;
  width: 200px;
  margin: 20px 10px;
  padding: 4px 0;
  line-height: 2;
  color: #02AD8F;
  font-family: 'microsoft yahei', 'simhei', sans-serif;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  border:1px solid #02AD8F;
  border-radius: 2px;
}

#wrap a:hover {
  background-color: #02AD8F;
  color: #ffffff;
}

.wave1 {
  position: absolute;
  z-index: 3;
  bottom: 0;
  margin-top: 50px;
  width: 100%;
  color: #999;
}

.wave {
  height: 220px;
}

.tower {
  background-position: 0 -127px;
  position: absolute;
  z-index: 2;
  top: 140px;
  left: 120px;
  width: 116px;
  height: 264px;
}

.towerlight {
  position: absolute;
  z-index: 1;
  left: 152px;
  top: 166px;
  width: 52px;
  height: 52px;
}


.beam {
  position: absolute;
  z-index: 3;
  left: -132px;
  top: 75px;
  width: 673px;
  height: 198px;
}

.font {
  padding: 100px 0 50px 0;
  font-size: 30px;
  font-family: microsoft yahei;
}

.Error {
  .content {
    min-height: 680px;
    .logo {
      padding-top: 100px;
      margin-bottom: 100px;
    }
    h1,
    h2,
    a {
      padding: 10px 0;
    }
    a {
      display: block;
      text-decoration: underline;
    }
  }
}
</style>
