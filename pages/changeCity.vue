<template>
  <div class="page-changeCity">
    <el-row>
      <iselect />
    </el-row>
    <el-row>
      <hot />
    </el-row>
    <el-row>
      <category />
    </el-row>
  </div>
</template>

<script>
import category from '@/components/changeCity/category'
import hot from '@/components/changeCity/hot'
import iselect from '@/components/changeCity/iselect'

export default {
  components: {
    category,
    hot,
    iselect
  }

}
</script>

<style lang="scss">
.page-changeCity .el-row:after {
  border: none;
}
</style>
