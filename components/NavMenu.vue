<template>
  <div class="navMenu">

    <div
      v-for="(navMenu, index) in navMenus"
      :key="index"
    >
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!navMenu.childs&&navMenu.entity"
        :key="navMenu.entity.id"
        :data="navMenu"
        :index="'/'+locale+navMenu.entity.name"
        :route="'/'+locale+navMenu.entity.value"
      >

        <i
          class="icon iconfont"
          :class="navMenu.entity.icon"
        ></i>
        <span
          slot="title"
        >{{ navMenu.entity.alias }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="navMenu.childs&&navMenu.entity"
        :key="navMenu.entity.id"
        :data="navMenu"
        :index="'/'+locale+navMenu.entity.name"
      >
        <template slot="title">
          <i
            class="icon iconfont"
            :class="navMenu.entity.icon"
          ></i>
          <span> {{ navMenu.entity.alias }}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :nav-menus="navMenu.childs"></NavMenu>
      </el-submenu>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data () {
    return {}
  },
  computed: {
    ...mapState(['locale'])
  },
  methods: {}
}
</script>

<style>
.icon-Collection {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  background: url('../static/img/icons/icon_Collection.svg') center no-repeat;
}
</style>
