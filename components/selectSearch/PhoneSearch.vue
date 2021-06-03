<template>
  <div class="select-search">
    <div class="vue-dropdown default-theme">
      <div
        class="cur-name"
        :class="isShow ? 'show' : ''"
        @click="isShow = !isShow;"
      >
        <i
          v-show="!itemlist.cur.countryIcon"
          class="i-icon icon-weChat"
        ></i>{{ itemlist.isName?itemlist.cur.name:'+'+ itemlist.cur.phoneCode }}
      </div>
      <myPopper
        :visible="isShow"
        :width="416"
      >
        <div
          class="list-and-search"
          :class="isShow ? 'on' : ''"
        >
          <div
            class="search-module clearfix"
            v-show="isNeedSearch"
          >
            <i class="el-icon-search"></i>
            <input
              class="search-text"
              v-model="searchvalue"
              @click.stop
              @keyup="search($event)"
              :placeholder="placeholder"
            />
            <i
              @click.stop="clearValue()"
              class="el-icon-error"
            ></i>
          </div>
          <ul class="list-module">
            <li
              v-for="(item, index) in datalist"
              @click="selectToggle(item)"
              :key="index"
            >
              <div class="list-box">
                <span class="list-item-text">
                  <i
                    v-show="!itemlist.cur.countryIcon"
                    class="i-icon icon-weChat"
                  ></i><span class="mleft">{{ item.name }}</span>
                </span>
                <span
                  v-if="!itemlist.isName"
                  class="cl454545"
                >{{ '+'+item.phoneCode }}</span>
              </div>
            </li>
          </ul>
          <div
            class="tip-nodata"
            v-show="isNeedSearch && datalist.length == 0"
          >
            {{ nodatatext }}
          </div>
        </div>
      </myPopper>
    </div>
  </div>
</template>

<script>
import Popper from './Popper'
export default {
  name: "PhoneSearch",
  components: {
    myPopper: Popper
  },
  props: {
    itemlist: {
      type: Object, //父组件传来的数据
      default: {}, //input placeholder的默认值
    },
    placeholder: {
      type: String,
      default: '搜索', //input placeholder的默认值
    },
    isNeedSearch: {
      //是否需要搜索框
      type: Boolean,
      default: false,
    },
    nodatatext: {
      type: String,
      default: '未找到结果', //没有搜索到时的文本提示
    },
  },
  data () {
    return {
      datalist: [],
      isShow: false,
      searchvalue: '',
      show: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.datalist = this.itemlist.data

      //点击组件以外的地方，收起
      try {
        document.addEventListener(
          'click',
          (e) => {
            if (!this.$el.contains(e.target)) {
              this.isShow = false
            }
          },
          false
        )
      } catch (error) {

      }
    })
  },
  methods: {
    selectToggle (data) {
      this.itemlist.cur = data
      this.isShow = false
      this.$emit('item-click', data)
    },
    clearValue () {
      this.searchvalue = '';
      this.datalist = this.itemlist.data.filter((item, index, arr) => {
        return item.name.indexOf(this.searchvalue) != -1 || item.phoneCode.indexOf(this.searchvalue) != -1 || item.countryCode.toUpperCase().indexOf(this.searchvalue.toUpperCase()) != -1
      })
    },
    search (e) {
      this.searchvalue = e.currentTarget.value
      this.datalist = this.itemlist.data.filter((item, index, arr) => {
        return item.name.indexOf(this.searchvalue) != -1 || item.phoneCode.indexOf(this.searchvalue) != -1 || item.countryCode.toUpperCase().indexOf(this.searchvalue.toUpperCase()) != -1
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.select-search {
  width: 200px;
  height: 40px;
  position: relative;
}
.list-and-search {
  background: #fff;
  // border: 1px solid #DCDFE6;
  display: none;
  padding: 10px;
  &.on {
    display: block;
  }
}
.cur-name {
  height: 40px;
  line-height: 40px;
  text-indent: 10px;
  position: relative;
  color: #777;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 10px;
  &:after {
    position: absolute;
    right: 9px;
    top: 14px;
    content: ' ';
    width: 8px;
    height: 8px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    transform: rotate(225deg);
  }
  &.show {
    &:after {
      right: 9px;
      top: 18px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      transform: rotate(45deg);
    }
  }
}
.vue-dropdown.default-theme {
  width: 90px;
  z-index: 10;
  border-radius: 3px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  position: absolute;
  border-radius: 4px;
  background-color: #f5f5f5;
  &:hover {
    border-color: #c0c4cc;
  }
  &._self-show {
    display: block !important;
  }
}
.search-module {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  .el-icon-search {
    position: absolute;
    top: 15px;
    left: 4px;
    color: #bdbdbd;
  }
  .el-icon-error {
    position: absolute;
    top: 15px;
    right: 4px;
    color: #bdbdbd;
  }
  .search-text {
    width: 100%;
    height: 40px;
    text-indent: 20px;
    // border-radius: 0.5em;
    box-shadow: none;
    outline: none;
    border: none;
    background: #f0f0f0;
    border-radius: 6px;
    // &:focus {
    // border-color: #2198f2;
    // }
  }
  .search-icon {
    position: absolute;
    top: 24%;
    right: 0.5em;
    color: #aaa;
  }
}
input::-webkit-input-placeholder {
  font-size: 14px;
}
.list-module {
  max-height: 200px;
  overflow-y: auto;
  li {
    &._self-hide {
      display: none;
    }
    margin-top: 0.4em;
    padding: 10px;
    &:hover {
      cursor: pointer;
      color: #02ad8f;
      background: #f5f5f5;
    }
  }
}
.tip-nodata {
  font-size: 14px;
  padding: 10px 0;
  text-indent: 10px;
}
.i-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-size: 100%;
  margin-right: 4px;
}
.icon-weChat {
  background: url('../../static/img/icons/icon_WeChat.svg') center center
    no-repeat;
}
.list-item-text {
  display: flex;
  justify-content: left;
  align-items: center;
}
.mleft {
  margin-left: 4px;
}
.list-box {
  display: flex;
  justify-content: space-between;
}
</style>