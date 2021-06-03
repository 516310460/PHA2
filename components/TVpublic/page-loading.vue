<template>
  <div class="loader ts--opacity"></div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.sk-cube-grid {
}

.loader,
.loader:before,
.loader:after {
  background: #02AD8F;
  animation: load1 2s infinite ease-in-out;
  width: 5px;
}

.loader {
  color: #02AD8F;
  text-indent: -9999em;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 11px;
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  z-index: 99999;
}

.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}

.loader:before {
  left: -10px;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader:after {
  left: 10px;
}

@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 10px;
  }
  40% {
    box-shadow: 0 -15px;
    height: 20px;
  }
}

@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 10px;
  }
  40% {
    box-shadow: 0 -15px;
    height: 20px;
  }
}
</style>
