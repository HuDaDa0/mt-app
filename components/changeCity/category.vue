<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item of list"
        :key="item"
      >
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-' + item.title">
        {{ item.title }}
      </dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'

export default {
  data () {
    return {
      // list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      list: 'ABCDEFGHJKLMNPQRSTWXYZ',
      block: []
    }
  },
  mounted () {
    this.loadCity()
  },
  methods: {
    async loadCity () {
      const result = await this.$axios.get('/geo/s-city')
      const city = result.data.city
      let p
      let c
      const d = {}
      // d = { a: ['xxx', 'xxxx'], b: ['xxxx', 'xxxx'] }
      city.forEach((item) => {
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1)
        c = p.charCodeAt(0)
        if (c > 96 && c < 123) {
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      // 把 d 变成 block = [ {title: 'A', city: ['安庆', '' ]} ]
      // Object.entries(d)  ==>  [ ['a', ['xxx', 'xxxx']], ['b', ['xxx', 'xxxx']] ]
      const block = []
      for (const [k, v] of Object.entries(d)) {
        block.push({ title: k.toUpperCase(), city: v })
      }
      block.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      this.block = block
    }
  }

}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/categroy.scss";
</style>
