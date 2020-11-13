<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
      >
        {{ (item.name==='市辖区'?item.province:item.name) | formatName }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  filters: {
    formatName (value) {
      return value.replace('市', '')
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.loadHotPlace()
  },
  methods: {
    async loadHotPlace () {
      const result = await this.$axios.get('/geo/hotCity')
      this.list = result.data.hots
    }
  }

}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/hot.scss";
</style>
