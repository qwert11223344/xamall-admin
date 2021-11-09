<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			autocomplete="on"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">Login Form</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="username"
					v-model="loginForm.username"
					placeholder="Username"
					name="username"
					type="text"
					tabindex="1"
					autocomplete="on"
				/>
			</el-form-item>

			<el-tooltip
				v-model="capsTooltip"
				content="Caps lock is On"
				placement="right"
				manual
			>
				<el-form-item prop="password">
					<span class="svg-container">
						<svg-icon icon-class="password" />
					</span>
					<el-input
						:key="passwordType"
						ref="password"
						v-model="loginForm.password"
						:type="passwordType"
						placeholder="Password"
						name="password"
						tabindex="2"
						autocomplete="on"
						@keyup.native="checkCapslock"
						@blur="capsTooltip = false"
						@keyup.enter.native="handleLogin"
					/>
					<span class="show-pwd" @click="showPwd">
						<svg-icon
							:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
						/>
					</span>
				</el-form-item>
			</el-tooltip>

			<el-button
				:loading="loading"
				type="primary"
				style="width: 100%; margin-bottom: 30px"
				@click.native.prevent="handleLogin"
				>Login</el-button
			>

			<div style="position: relative">
				<div class="tips">
					<span>Username : admin</span>
					<span>Password : any</span>
				</div>
				<div class="tips">
					<span style="margin-right: 18px">Username : editor</span>
					<span>Password : any</span>
				</div>

				<el-button
					class="thirdparty-button"
					type="primary"
					@click="showDialog = true"
				>
					Or connect with
				</el-button>
			</div>
		</el-form>

		<el-dialog title="Or connect with" :visible.sync="showDialog">
			Can not be simulated on local, so please combine you own business
			simulation! ! !
			<br />
			<br />
			<br />
			<social-sign />
		</el-dialog>
	</div>
</template>

<script>
export default {
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>