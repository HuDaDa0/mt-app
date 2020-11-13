<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, idx) of $store.state.home.menu"
        :key="idx"
        @mouseenter="mouseenter"
      >
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="rightEnter"
      @mouseleave="rightLeave"
    >
      <template v-for="(item, index) of curdetail">
        <h4 :key="index + item.title" style="color: #333;">
          {{ item.title }}
        </h4>
        <span v-for="(itemChild, indexChild) of item.child" :key="indexChild + itemChild">{{ itemChild }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        { type: 'food', name: '美食', child: [{ title: '美食', child: ['代金卷', '甜点饮品', '火锅', '自提餐', '小吃快餐'] }] },
        { type: 'takeout', name: '外卖', child: [{ title: '外卖', child: ['美团外卖'] }] }
      ],
      timer: null
    }
  },
  computed: {
    curdetail () {
      return (this.$store.state.home.menu.filter(item => item.type === this.kind).length > 0 && this.$store.state.home.menu.filter(item => item.type === this.kind)[0].child) || []
    }
  },
  methods: {
    mouseleave () {
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    mouseenter (e) {
      this.kind = e.target.querySelector('i').className
    },
    rightEnter () {
      clearTimeout(this.timer)
    },
    rightLeave () {
      this.kind = ''
    }
  }
}
</script>

<style>

</style>
