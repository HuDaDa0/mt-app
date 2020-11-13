<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.provinceCode"
        :label="item.provinceName"
        :value="item.provinceName"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <span class="name" style="margin-left: 50px;">直接搜索: </span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      cvalue: '',
      input: ''
    }
  },
  computed: {
    city () {
      return (this.province.length && this.province.filter(item => item.provinceName === this.pvalue)[0] && this.province.filter(item => item.provinceName === this.pvalue)[0].cityInfoList) || []
    }
  },
  mounted () {
    this.loadProvince()
  },
  methods: {
    async loadProvince () {
      const result = await this.$axios.get('/geo/s-province')
      this.province = result.data.data.province
    },
    querySearchAsync () {},
    handleSelect () {}
  }

}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>
