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
						@clear="_getCategory"
						@keyup.enter.native=""
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click=""
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialog()">添加分类</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="sortList" border stripe>
				<el-table-column label="id" prop="id"></el-table-column>
				<el-table-column label="分类名称" prop="name"></el-table-column>
				<el-table-column label="是否冻结" prop="state">
					<template slot-scope="scope">
						<el-switch
							:active-value="1"
							:inactive-value="0"
							v-model="scope.row.state"
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
						<el-tooltip effect="dark" content="删除" placement="top">
							<!-- 删除按钮 -->
							<el-button
								type="danger"
								icon="el-icon-delete"
								circle
								size="mini"
								@click="delDialog(scope.row)"
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
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
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
import {
	getCategory,
	getCategoryLimit,
	addCategory,
	updateCategory,
	delCategory,
} from "api/category.js";
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
				id: "",
				name: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
		};
	},
	created() {
		this._getCategory();
	},
	methods: {
		async _getCategory() {
			let total = await getCategory();

			let res = await getCategoryLimit(this.queryInfo);
			if (res.success !== true) {
				return this.$message.error("获取分类列表失败！");
			}
			this.sortList = res.data;
			this.total = total.data.length;
		},
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this._getCategory();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this._getCategory();
		},
		//监听 可用状态改变的事件
		async sortStatusChanged(sortInfo) {
			let params = {
				column: "state",
				value: sortInfo.state,
				id: sortInfo.id,
			};
			let res = await updateCategory(params);
			if (res.success === true) {
				this.$message.success("冻结成功");
			} else {
				this.$message.error("冻结失败");
			}
			this._getCategory();
		},
		//监听 添加分类对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新分类
		addSort() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				if (this.addForm.id === "") {
					//添加
					let res = await addCategory(this.addForm);
					if (res.success === true) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				} else {
					//修改
					let params = {
						column: "name",
						value: this.addForm.name,
						id: this.addForm.id,
					};
					let res = await updateCategory(params);
					if (res.success === true) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				}
				//隐藏添加分类的对话框
				this.addDialogVisible = false;
				//重置表单
				this.$refs.addFormRef.resetFields();
				//重新获取分类信息列表数据
				this._getCategory();
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加分类";
			this.sortFlag = false;
			Object.keys(this.addForm).forEach((v) => (this.addForm[v] = ""));
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
			let res = await delCategory(id);
			if (res.success === true) {
				this.$message.success(res.message);
				//重新获取会员信息列表数据
				this._getCategory();
			} else {
				this.$message.error(res.message);
			}
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
