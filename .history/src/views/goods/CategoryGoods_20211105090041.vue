<template>
	<div class="cate-goods">
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" class="cate-header">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>分类管理</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20" class="search">
				<el-col :span="8">
					<el-input
						placeholder="请输入分类名"
						v-model="queryInfo.query"
						clearable
						@clear="getSortList"
						@keyup.enter.native="getSortList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getSortList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialog()">添加分类</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="sortList" border stripe>
				<el-table-column label="id" prop="cat_id"></el-table-column>
				<el-table-column label="分类名称" prop="cat_name"></el-table-column>
				<el-table-column label="是否删除" prop="cat_deleted">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.cat_deleted"
							@change="sortStatusChanged(scope.row)"
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
						<!-- <el-tooltip effect="dark" content="删除" placement="top"> -->
						<!-- 删除按钮 -->
						<!-- <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delDialog(scope.row.cat_id)"></el-button> -->
						<!-- </el-tooltip> -->
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.num"
				:page-sizes="[1, 2, 3]"
				:page-size="queryInfo.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>

		<!-- 添加商品的对话框 -->
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
				<el-form-item label="分类名称" prop="cat_name">
					<el-input v-model="addForm.cat_name"></el-input>
				</el-form-item>
				<el-form-item label="分类父级" prop="cat_pid">
					<el-input v-model="addForm.cat_pid"></el-input>
				</el-form-item>
				<el-form-item label="分类级别" prop="cat_level">
					<el-input v-model="addForm.cat_level"></el-input>
				</el-form-item>
				<el-form-item label="分类图标" prop="cat_icon">
					<el-input v-model="addForm.cat_icon"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addSort">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//获取分类列表的参数对象
			queryInfo: {
				query: "",
				//当前的页数
				num: 1,
				///每页的数量
				size: 3,
			},
			sortList: [],
			total: 0,
			//表单名称
			title: "",
			sortFlag: false,
			//控制添加对话框的显示和隐藏
			addDialogVisible: false,
			// 登录表单的数据绑定对象
			addForm: {
				cat_id: "",
				cat_name: "",
				cat_pid: "",
				cat_level: "",
				cat_icon: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
		};
	},
	created() {
		this.getSortList();
	},
	methods: {
		async getSortList() {
			const { data: res } = await this.$http.post(
				"sorts/findAll",
				this.queryInfo
			);
			if (res.meta.status !== 200) {
				return this.$message.error("获取分类列表失败！");
			}
			this.sortList = res.data.sorts;
			this.total = res.data.total;
		},
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this.getSortList();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this.getSortList();
		},
		//监听 可用状态改变的事件
		async sortStatusChanged(sortInfo) {
			const { data: res } = await this.$http.post("sorts/update", sortInfo);
			if (res.meta.status !== 200) {
				sortInfo.status = !sortInfo.status;
				return this.$message.error("更新分类状态失败！");
			}
			return this.$message.success("更新分类状态成功！");
		},
		//监听 添加分类对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新分类
		addSort() {
			//判断是新增还是修改
			var url = "";
			if (this.addForm.cat_id != null) {
				url = "sorts/update";
			} else {
				url = "sorts/add";
			}
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				//表单都合法才向后台发起添加商品的请求
				const { data: res } = await this.$http.post(url, this.addForm);
				if (res.meta.status !== 200) {
					this.$message.error(res.meta.msg);
				}
				this.$message.success(res.meta.msg);
				//隐藏添加分类的对话框
				this.addDialogVisible = false;
				//重置表单
				this.$refs.addFormRef.resetFields();
				//重新获取分类信息列表数据
				this.getSortList();
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加分类";
			this.sortFlag = false;
			this.addForm = {};
			this.addDialogVisible = true;
		},
		// 点击修改按钮
		editDialog(sortInfo) {
			//给表单赋值
			this.title = "更新分类";
			this.sortFlag = true;
			//浅拷贝
			//this.addForm = memberInfo
			//使用深拷贝
			this.addForm = JSON.parse(JSON.stringify(sortInfo));
			this.addDialogVisible = true;
		},
		// 点击删除按钮
		async delDialog(id) {
			//弹框询问是否删除
			const confirmResult = await this.$confirm("是否删除该分类", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).catch((err) => err);
			if (confirmResult != "confirm") {
				return this.$message.info("已取消删除");
			}
			const { data: res } = await this.$http.get("sorts/del?id=" + id);
			if (res.meta.status !== 200) {
				this.$message.error(res.meta.msg);
			}
			this.$message.success(res.meta.msg);
			//重新获取会员信息列表数据
			this.getSortList();
		},
	},
};
</script>

<style lang="scss" scoped>
.cate-goods {
	min-width: 1320px;
	max-width: 1500px;
	padding: 20px;
	.cate-header {
		margin-bottom: 10px;
	}
	.search {
		margin-bottom: 20px;
	}
}
</style>
