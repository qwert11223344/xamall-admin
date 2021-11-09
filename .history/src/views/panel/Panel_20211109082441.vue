<template>
	<div id="panel">
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" class="panel-header">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>版块管理</el-breadcrumb-item>
			<el-breadcrumb-item>所有版块</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20" class="search">
				<el-col :span="6">
					<el-input
						placeholder="请输入版块名称"
						v-model="queryInfo.query"
						clearable
						@clear=""
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
					<el-button type="primary" @click="addDialog()">添加版块</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="PanelList" border stripe>
				<el-table-column label="id" prop="id"></el-table-column>
				<!-- <el-table-column label="分类id" prop="cat_id"></el-table-column> -->
				<el-table-column label="版块名称" prop="name"></el-table-column>
				<el-table-column label="版块类型" prop="type"></el-table-column>
				<el-table-column label="可用状态" prop="state">
					<template slot-scope="scope">
						<el-switch
							:active-value="1"
							:inactive-value="0"
							v-model="scope.row.state"
							@change="_updatePanelOne(scope.row)"
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
								@click="_delPanel(scope.row.id)"
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
				:page-sizes="[4, 8, 12, 20]"
				:page-size="queryInfo.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>

		<!-- 添加版块的对话框 -->
		<el-dialog
			:title="title"
			:visible.sync="addDialogVisible"
			width="20%"
			@close="addDialogClosed"
		>
			<!-- 内容主体区域 -->
			<el-form
				ref="addFormRef"
				:model="addForm"
				:rules="addFormRules"
				label-width="70px"
			>
				<el-form-item label="版块名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>

				<el-form-item label="版块类型" prop="type">
					<el-input v-model="addForm.type"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="_addPanel">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
	getAllPanel,
	addPanel,
	updatePanelOne,
	updatePanelContent,
	delPanel,
} from "api/panel.js";

export default {
	data() {
		return {
			//获取商品列表的参数对象
			queryInfo: {
				query: "",
				//当前的页数
				num: 1,
				///每页的数量
				size: 8,
			},
			PanelList: [],
			total: 0,
			//表单名称
			title: "",
			itemFlag: false,
			//控制添加对话框的显示和隐藏
			addDialogVisible: false,
			// 登录表单的数据绑定对象
			addForm: {
				id: "",
				name: "",
				type: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
		};
	},
	created() {
		this._getAllPanel();
	},
	methods: {
		async _getAllPanel() {
			let res = await getAllPanel();
			if (res.success === false) {
				return this.$message.error("获取版块列表失败！");
			}
			this.PanelList = res.data;
			this.total = res.data.length;
		},
		//搜索商品
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this._getAllPanel();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this._getAllPanel();
		},
		//监听 修改版块单条信息
		async _updatePanelOne() {
			let res = await updatePanelOne();
			if (res.success === true) {
				this.$message.success(res.message);
			} else {
				this.$message.error(res.message);
			}
		},

		//监听 添加商品对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
			//隐藏添加商品的对话框
			this.addDialogVisible = false;
		},
		// 点击按钮 添加新版块
		async _addPanel() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				//表单都合法才向后台发起添加的请求
				if (this.addForm.id === "") {
					let res = await addPanel(this.addForm);
					if (res.success === true) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				} else {
					let res = await updatePanelOne(this.addForm);
					if (res.success === true) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				}
				this.addDialogClosed();
				this._getAllPanel();
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加版块";
			this.itemFlag = false;
			Object.keys(this.addForm).forEach((v) => (this.addForm[v] = ""));
			this.addDialogVisible = true;
		},
		// 	// 点击修改按钮
		editDialog(itemInfo) {
			//给表单赋值
			this.title = "更新版块";
			this.itemFlag = true;
			//使用深拷贝
			this.addForm = JSON.parse(JSON.stringify(itemInfo));
			this.addDialogVisible = true;
		},
		// 	// 点击删除按钮
		async _delPanel(id) {
			//弹框询问是否删除
			const confirmResult = await this.$confirm("是否删除该商品", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).catch((err) => err);
			if (confirmResult != "confirm") {
				return this.$message.info("已取消删除");
			}
			let res = await delPanel({ id });
			if (res.success != true) {
				this.$message.error(res.message);
			} else {
				this.$message.success(res.message);
				//重新获取版块列表数据
				this._getAllPanel();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
#panel {
	min-width: 1320px;
	max-width: 1500px;
	padding: 20px;
	.panel-header {
		margin-bottom: 10px;
	}
	.search {
		margin-bottom: 20px;
	}
}
</style>
