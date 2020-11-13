<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"
        >
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="isFocus = true" @blur="isFocus = false" @input="searchInput" />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <!-- <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, idx) of hotPlace" :key="idx">
              {{ item }}
            </dd>
          </dl> -->
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, idx) of searchList" :key="idx">
              {{ item.editorWord }}
            </dd>
          </dl>
        </div>
        <!-- <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p> -->
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" /><p class="text">
              随时退
            </p>
          </li>
          <li>
            <i class="single" /><p class="text">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" /><p class="text">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: '',
      isFocus: false,
      // hotPlace: ['火锅', '火锅', '火锅'],
      searchList: []
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    searchInput: _.debounce(async function () {
      if (this.search) {
        const result = await this.$axios.get('/search/top', {
          params: {
            keyword: this.search
          }
        })
        this.searchList = result.data.data.suggestItems
      }
    }, 300)
  }

}
</script>

<style>

</style>
