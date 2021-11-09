<template>
	<div class="login-container">
		<el-form
			:model="ruleForm"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
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
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {
				pass: "",
				checkPass: "",
				age: "",
			},
			rules: {
				userName: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
				],
				pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert("submit!");
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
.login-container {
	width: 500px;
	height: 300px;
	border: 1px solid #ccc;
	background: #f3f3f3;
}
</style>

