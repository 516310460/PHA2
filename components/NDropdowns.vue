<template>
  <div
    v-click-outside="handleClickOutside"
    class="relative inline-block text-left"
  >
    <slot name="button"></slot>
    <div
      :class="show ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'"
      class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 z-50"
    >
      <div
        :class="show ? 'block' : 'hidden'"
        class="py-1"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="clickList(item)"
          @mouseenter="listIndex = index"
          @mouseleave="listIndex = ''"
          :class="listIndex == index && 'bg-gray-100 text-gray-900'"
          class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'NDropdowns',
  props: {
    value: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      listIndex: 0,
    }
  },
  methods: {
    clickList (item) {
      this.$emit("change", item)
    },
    handleClickOutside () {
      if (this.show) {
        this.$emit("change", '')
      }
    }
  }
}
</script>