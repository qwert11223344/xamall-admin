<template>
	<div id="member">
		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input
						placeholder="请输入会员名"
						v-model="queryInfo.query"
						clearable
						@clear="getUserList"
						@keyup.enter.native="getUserList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getUserList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialog()">添加会员</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="memberList" border stripe>
				<el-table-column label="id" prop="id"></el-table-column>
				<el-table-column label="会员名称" prop="username"></el-table-column>
				<el-table-column label="昵称" prop="nickname"></el-table-column>
				<el-table-column label="电话" prop="tel"></el-table-column>
				<el-table-column label="email" prop="email"></el-table-column>
				<el-table-column label="性别" prop="sex"></el-table-column>
				<el-table-column label="地址" prop="address"></el-table-column>
				<el-table-column label="头像" prop="file"></el-table-column>
				<el-table-column label="签名" prop="description"></el-table-column>
				<el-table-column label="积分" prop="integral"></el-table-column>
				<el-table-column label="可用状态" prop="status">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							@change="memberStatusChanged(scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- Tooltip文字提示 -->
						<el-tooltip
							effect="dark"
							content="修改"
							placement="top"
							:enterable="false"
						>
							<!-- 修改按钮 -->
							<el-button
								type="primary"
								icon="el-icon-edit"
								circle
								size="mini"
								@click="editDialog(scope.row)"
							></el-button>
						</el-tooltip>
						<!-- Tooltip文字提示 -->
						<el-tooltip effect="dark" content="删除" placement="top">
							<!-- 删除按钮 -->
							<el-button
								type="danger"
								icon="el-icon-delete"
								circle
								size="mini"
								@click="delDialog(scope.row.id)"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.num"
				:page-sizes="[1, 2, 4]"
				:page-size="queryInfo.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>

		<!-- 添加会员的对话框 -->
		<el-dialog
			:title="title"
			:visible.sync="addDialogVisible"
			width="50%"
			@close="addDialogClosed"
		>
			<!-- 内容主体区域 -->
			<el-form
				ref="addFormRef"
				:model="addForm"
				:rules="addFormRules"
				label-width="70px"
			>
				<el-form-item label="会员名" prop="username">
					<el-input
						v-model="addForm.username"
						:disabled="memberFlag"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="addForm.nickname"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="addForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="email" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="addForm.sex"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="file">
					<el-input v-model="addForm.file"></el-input>
				</el-form-item>
				<el-form-item label="个性签名" prop="description">
					<el-input v-model="addForm.description"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addMember">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		// 验证手机号的规则
		var checkTel = (rule, value, cb) => {
			// 验证手机号的正则表达式
			const regTel =
				/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

			if (regTel.test(value)) {
				// 合法的手机号
				return cb();
			}
			// 手机号不合法
			cb(new Error("请输入合法的手机号"));
		};

		// 验证邮箱的规则
		var checkEmail = (rule, value, cb) => {
			// 验证邮箱的正则表达式
			const regEmail = /^([a-zA-z0-9_-])+@([a-zA-z0-9_-])+(\.[a-zA-z0-9_-])+/;
			if (regEmail.test(value)) {
				// 合法的邮箱
				return cb();
			}
			// 邮箱不合法
			cb(new Error("请输入合法的邮箱"));
		};

		return {
			//获取会员列表的参数对象
			queryInfo: {
				query: "",
				//当前的页数
				num: 1,
				///每页的数量
				size: 4,
			},
			memberList: [],
			total: 0,
			//表单名称
			title: "",
			memberFlag: false,
			//控制添加对话框的显示和隐藏
			addDialogVisible: false,
			// 登录表单的数据绑定对象
			addForm: {
				id: "",
				username: "",
				password: "",
				nickname: "",
				tel: "",
				email: "",
				sex: "",
				address: "",
				file: "",
				description: "",
			},
			// 添加表单的验证规则
			addFormRules: {
				// 验证会员名是否合法
				username: [
					{
						required: true,
						message: "请输入会员名",
						trigger: "blur",
					},
					{
						min: 2,
						max: 16,
						message: "长度在 2 到 16 个字符",
						trigger: "blur",
					},
				],
				// 验证密码是否合法
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
					{
						min: 6,
						max: 18,
						message: "长度在 6 到 18 个字符",
						trigger: "blur",
					},
				],
				// 验证手机号是否合法
				tel: [
					{
						required: true,
						message: "请输入电话",
						trigger: "blur",
					},
					{
						validator: checkTel,
						trigger: "blur",
					},
				],
				// 验证邮箱是否合法
				email: [
					{
						required: true,
						message: "请输入email",
						trigger: "blur",
					},
					{
						validator: checkEmail,
						trigger: "blur",
					},
				],
			},
		};
	},
	created() {
		this.getUserList();
	},
	methods: {
		async getUserList() {
			const { data: res } = await this.$http.post(
				"members/findAll",
				this.queryInfo
			);
			if (res.meta.status !== 200) {
				return this.$message.error("获取会员列表失败！");
			}
			this.memberList = res.data.members;
			this.total = res.data.total;
		},
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this.getUserList();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this.getUserList();
		},
		//监听 可用状态改变的事件
		async memberStatusChanged(memberInfo) {
			const { data: res } = await this.$http.post("members/update", memberInfo);
			if (res.meta.status !== 200) {
				memberInfo.status = !memberInfo.status;
				return this.$message.error("更新会员状态失败！");
			}
			return this.$message.success("更新会员状态成功！");
		},
		//监听 添加会员对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新会员
		addMember() {
			//判断是新增还是修改
			var url = "";
			if (this.addForm.id != null) {
				url = "members/update";
			} else {
				url = "members/add";
			}
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				//表单都合法才向后台发起添加会员的请求
				const { data: res } = await this.$http.post(url, this.addForm);
				if (res.meta.status !== 200) {
					this.$message.error(res.meta.msg);
				}
				this.$message.success(res.meta.msg);
				//隐藏添加会员的对话框
				this.addDialogVisible = false;
				//重置表单
				this.$refs.addFormRef.resetFields();
				//重新获取会员信息列表数据
				this.getUserList();
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加会员";
			this.memberFlag = false;
			this.addForm = {};
			this.addDialogVisible = true;
		},
		// 点击修改按钮
		editDialog(memberInfo) {
			//给表单赋值
			this.title = "更新会员";
			this.memberFlag = true;
			//浅拷贝
			//this.addForm = memberInfo
			//使用深拷贝
			this.addForm = JSON.parse(JSON.stringify(memberInfo));
			this.addDialogVisible = true;
		},
		// 点击删除按钮
		async delDialog(id) {
			//弹框询问是否删除
			const confirmResult = await this.$confirm("是否删除该会员", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).catch((err) => err);
			if (confirmResult != "confirm") {
				return this.$message.info("已取消删除");
			}
			const { data: res } = await this.$http.get("members/del?id=" + id);
			if (res.meta.status !== 200) {
				this.$message.error(res.meta.msg);
			}
			this.$message.success(res.meta.msg);
			//重新获取会员信息列表数据
			this.getUserList();
		},
	},
};
</script>

<style>
</style>