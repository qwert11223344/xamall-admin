<template>
	<div id="edit-goods">
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" class="edit-header">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品编辑</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20" class="search">
				<el-col :span="8">
					<el-input
						placeholder="请输入商品名"
						v-model="queryInfo.query"
						clearable
						@clear="_getAllGoods"
						@keyup.enter.native="getItemList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getItemList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialog()">添加商品</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="itemList" border stripe>
				<el-table-column label="id" prop="product_id"></el-table-column>
				<!-- <el-table-column label="分类id" prop="cat_id"></el-table-column> -->
				<el-table-column
					label="商品名称"
					prop="product_title"
				></el-table-column>
				<el-table-column label="商品描述" prop="product_desc"></el-table-column>
				<el-table-column label="商品价格" prop="price"></el-table-column>
				<el-table-column label="库存" prop="count"></el-table-column>
				<el-table-column label="限售" prop="limit_num"></el-table-column>
				<el-table-column label="颜色" prop="product_color"></el-table-column>
				<el-table-column label="规格" prop="product_capacity"></el-table-column>
				<el-table-column label="可用状态" prop="state">
					<template slot-scope="scope">
						<el-switch
							:active-value="1"
							:inactive-value="0"
							v-model="scope.row.state"
							@change="itemStatusChanged(scope.row)"
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
								@click="delDialog(scope.row.goods_id)"
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
				<el-form-item label="分类" prop="cat_id">
					<el-select v-model="addForm.cat_id" placeholder="请选择">
						<el-option
							v-for="(item, i) in category"
							:key="i"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="goods_name">
					<el-input v-model="addForm.goods_name"></el-input>
				</el-form-item>
				<el-form-item label="商品价格" prop="goods_price">
					<el-input v-model="addForm.goods_price"></el-input>
				</el-form-item>
				<el-form-item label="库存" prop="goods_number">
					<el-input v-model="addForm.goods_number"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addItem">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getAllGoods, getGoodsLimit, getCategory } from "api/goods.js";
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
			itemList: [],
			category: [],
			total: 0,
			//表单名称
			title: "",
			itemFlag: false,
			//控制添加对话框的显示和隐藏
			addDialogVisible: false,
			// 登录表单的数据绑定对象
			addForm: {
				goods_id: "",
				cat_id: "",
				goods_name: "",
				goods_price: "",
				goods_number: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
		};
	},
	created() {
		this._getAllGoods();
		this._getCategory();
	},
	methods: {
		async _getAllGoods() {
			let allres = await getAllGoods();
			if (allres.success === false) {
				return this.$message.error("获取商品列表失败！");
			}
			let limitGoods = await getGoodsLimit(this.queryInfo);
			this.itemList = limitGoods.data;
			this.total = allres.data.length;
		},
		async _getCategory() {
			let res = await getCategory();
			this.category = res.data;
		},
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this._getAllGoods();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this._getAllGoods();
		},
		//监听 可用状态改变的事件
		async itemStatusChanged(itemInfo) {
			const { data: res } = await this.$http.post("items/update", itemInfo);
			if (res.meta.status !== 200) {
				itemInfo.status = !itemInfo.status;
				return this.$message.error("更新商品状态失败！");
			}
			return this.$message.success("更新商品状态成功！");
		},
		//监听 添加商品对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新商品
		addItem() {
			//判断是新增还是修改
			var url = "";
			if (this.addForm.goods_id != null) {
				url = "items/update";
			} else {
				url = "items/add";
			}
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				//表单都合法才向后台发起添加商品的请求
				const { data: res } = await this.$http.post(url, this.addForm);
				if (res.meta.status !== 200) {
					this.$message.error(res.meta.msg);
				}
				this.$message.success(res.meta.msg);
				//隐藏添加商品的对话框
				this.addDialogVisible = false;
				//重置表单
				this.$refs.addFormRef.resetFields();
				//重新获取商品信息列表数据
				this._getAllGoods();
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加商品";
			this.itemFlag = false;
			this.addForm = {};
			this.addDialogVisible = true;
		},
		// 点击修改按钮
		editDialog(itemInfo) {
			//给表单赋值
			this.title = "更新商品";
			this.itemFlag = true;
			//浅拷贝
			//this.addForm = memberInfo
			//使用深拷贝
			this.addForm = JSON.parse(JSON.stringify(itemInfo));
			this.addDialogVisible = true;
		},
		// 点击删除按钮
		async delDialog(id) {
			//弹框询问是否删除
			const confirmResult = await this.$confirm("是否删除该商品", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).catch((err) => err);
			if (confirmResult != "confirm") {
				return this.$message.info("已取消删除");
			}
			const { data: res } = await this.$http.get("items/del?id=" + id);
			if (res.meta.status !== 200) {
				this.$message.error(res.meta.msg);
			}
			this.$message.success(res.meta.msg);
			//重新获取会员信息列表数据
			this.getItemList();
		},
	},
};
</script>

<style lang="scss" scoped>
#edit-goods {
	min-width: 1320px;
	max-width: 1500px;
	padding: 20px;
	.edit-header {
		margin-bottom: 10px;
	}
	.search {
		margin-bottom: 20px;
	}
}
</style>
