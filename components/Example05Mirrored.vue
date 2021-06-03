<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
      v-for="(item,index) in layout"
      :key='index'
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
        drag-allow-from=".vue-draggable-handle"
        drag-ignore-from=".no-drag"
      >
        <div class="text">
          <div class="vue-draggable-handle"></div>
          <div class="no-drag">
            <span>{{ item.i }}</span>
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      layout: [
        { h: 2, i: '0', w: 8, x: 0, y: 0 },
        { h: 15, i: '1', w: 2, x: 8, y: 0 },
        { h: 15, i: '2', w: 2, x: 10, y: 0 },
        { h: 13, i: '3', w: 2, x: 0, y: 2 },
        { h: 13, i: '4', w: 6, x: 2, y: 2 },
        { h: 7, i: '5', w: 8, x: 0, y: 15 },
        { h: 7, i: '6', w: 4, x: 8, y: 15 },
      ],
      draggable: true,
      resizable: true,
      index: 0,
      eventLog: [],
    }
  },
  // watch: {
  //     eventLog: function() {
  //         const eventsDiv = this.$refs.eventsDiv;
  //         eventsDiv.scrollTop = eventsDiv.scrollHeight;
  //     }
  // },
  mounted() {
    this.$nextTick(() => {
      // this.layout = this.$store.state.layout
      // console.log(this.$store.state.layout)
      // setTimeout(()=>{
      //   this.layout = [{"x":0,"y":0,"w":6,"h":3,"i":"0","moved":false},{"x":2,"y":3,"w":2,"h":4,"i":"1","moved":false},{"x":4,"y":3,"w":2,"h":5,"i":"2","moved":false},{"x":6,"y":0,"w":2,"h":3,"i":"3","moved":false},{"x":8,"y":0,"w":2,"h":3,"i":"4","moved":false},{"x":10,"y":0,"w":2,"h":3,"i":"5","moved":false},{"x":0,"y":3,"w":2,"h":5,"i":"6","moved":false},{"x":2,"y":7,"w":2,"h":5,"i":"7","moved":false},{"x":4,"y":8,"w":2,"h":5,"i":"8","moved":false},{"x":6,"y":3,"w":2,"h":4,"i":"9","moved":false},{"x":8,"y":3,"w":2,"h":4,"i":"10","moved":false},{"x":10,"y":3,"w":2,"h":4,"i":"11","moved":false},{"x":0,"y":11,"w":2,"h":5,"i":"12","moved":false},{"x":2,"y":14,"w":2,"h":5,"i":"13","moved":false},{"x":4,"y":13,"w":2,"h":4,"i":"14","moved":false},{"x":6,"y":7,"w":2,"h":4,"i":"15","moved":false},{"x":8,"y":7,"w":2,"h":5,"i":"16","moved":false},{"x":10,"y":7,"w":2,"h":2,"i":"17","moved":false},{"x":0,"y":8,"w":2,"h":3,"i":"18","moved":false},{"x":2,"y":12,"w":2,"h":2,"i":"19","moved":false}]
      // }, 3000)
      // console.log(JSON.stringify(this.$store.state.layout))
    })
  },
  methods: {
    moveEvent: function (i, newX, newY) {
      const msg = 'MOVE i=' + i + ', X=' + newX + ', Y=' + newY
      // console.log(msg);
    },
    movedEvent: function (i, newX, newY) {
      const msg = 'MOVED i=' + i + ', X=' + newX + ', Y=' + newY
      // console.log(msg);
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      const msg =
        'RESIZE i=' +
        i +
        ', H=' +
        newH +
        ', W=' +
        newW +
        ', H(px)=' +
        newHPx +
        ', W(px)=' +
        newWPx
      // console.log(msg);
    },
    resizedEvent: function (i, newX, newY, newHPx, newWPx) {
      const msg =
        'RESIZED i=' +
        i +
        ', X=' +
        newX +
        ', Y=' +
        newY +
        ', H(px)=' +
        newHPx +
        ', W(px)=' +
        newWPx
      // console.log(msg);
    },
    containerResizedEvent: function (i, newH, newW, newHPx, newWPx) {
      const msg =
        'CONTAINER RESIZED i=' +
        i +
        ', H=' +
        newH +
        ', W=' +
        newW +
        ', H(px)=' +
        newHPx +
        ', W(px)=' +
        newWPx
      // console.log(msg);
    },

    layoutCreatedEvent: function (newLayout) {
      // console.log("Created layout: ", newLayout)
    },
    layoutBeforeMountEvent: function (newLayout) {
      // console.log("beforeMount layout: ", newLayout)
    },
    layoutMountedEvent: function (newLayout) {
      // console.log("Mounted layout: ", newLayout)
    },
    layoutReadyEvent: function (newLayout) {
      // console.log("Ready layout: ", newLayout)
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log(newLayout)
      // console.log("Updated layout: ", newLayout)
      // this.$store.commit("set_layout", newLayout)
    },
  },
}
</script>

<style scoped>
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px 8px 0;
  background-origin: content-box;
  background-color: black;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.eventsJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  height: 100px;
  overflow-y: scroll;
}
</style>
