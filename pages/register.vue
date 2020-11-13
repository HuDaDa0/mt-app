<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="ruleForm.email" />
          <el-button size="small" round @click="sendVerifyCode">
            发送验证码
          </el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSignup">
            同意以下协议并注册
          </el-button>
          <p class="error">
            {{ error }}
          </p>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      error: ''
    }
  },
  methods: {
    sendVerifyCode () {
      this.$axios.post('/users/verify')
        .then((res) => {
          const { code, msg } = res.data
          if (code === 0) {
            this.ruleForm.code = res.data.verifyCode
            this.$message({
              type: 'success',
              message: res.data.verifyCode
            })
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        })
    },
    handleSignup () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios.post('/users/signup', {
            username: this.ruleForm.name,
            password: this.ruleForm.pass,
            email: this.ruleForm.email,
            code: this.ruleForm.code
          })
            .then((res) => {
              const { code, msg } = res.data
              if (code === 0) {
                this.$message({
                  type: 'success',
                  message: '注册成功'
                })
                this.$router.push({ path: '/login' })
              } else {
                this.$message({
                  type: 'success',
                  message: msg
                })
              }
            })
        }
      })
    }
  }

}
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
  a {
    text-decoration: none;
  }
</style>
