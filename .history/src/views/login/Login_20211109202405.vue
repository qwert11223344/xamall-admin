<template>
	<div class="login">
		<div class="login-container">
			<el-form
				:model="ruleForm"
				status-icon
				:rules="rules"
				ref="ruleForm"
				hide-required-asterisk
				label-width="auto"
				class="demo-ruleForm"
			>
				<el-form-item label="用户名" prop="userName">
					<el-input
						type="text"
						v-model="ruleForm.userName"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input
						type="password"
						v-model="ruleForm.pass"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" plain round @click="submitForm('ruleForm')"
						>提交</el-button
					>
					<el-button type="danger" plain round @click="resetForm('ruleForm')"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { login } from "api/index.js";
import { messageMixin } from "common/mixin.js";
export default {
	data() {
		return {
			ruleForm: {
				userName: "",
				pass: "",
			},
			rules: {
				userName: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
				],
				pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
			},
		};
	},
	mixins: [messageMixin],
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					login(this.ruleForm).then((res) => {
						console.log(res);
						if (res.data !== null) {
							localStorage.setItem("admin", JSON.stringify(res.data.user_name));
							localStorage.setItem("admin-token", res.data.token);
							this.message(res.message, "success");
							this.$router.push({
								path: this.$route.query.redirect || "/",
							});
						} else {
							this.message(res.message, "error");
						}
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.login {
	width: 100vw;
	height: 100vh;
	position: absolute;
	background: url("~assets/ezgif.com-video-to-gif(1).gif");
	background-size: cover;
	.login-container {
		width: 500px;
		height: 280px;
		border: 1px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 200px auto;
		backdrop-filter: blur(20px);
		border-radius: 20px;
		.el-input .el-input__inner {
			background-color: rgba(255, 255, 255, 0.247);
			border: none;
		}
	}
}
</style>
