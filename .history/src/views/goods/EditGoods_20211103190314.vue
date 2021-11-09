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
						@keyup.enter.native="_searchGoods"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="_searchGoods"
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
							@change="_updateGoodsState(scope.row)"
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
				<el-form-item label="分类" prop="cid">
					<el-select v-model="addForm.cid" placeholder="请选择">
						<el-option
							v-for="(item, i) in category"
							:key="i"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="product_title">
					<el-input v-model="addForm.product_title"></el-input>
				</el-form-item>
				<el-form-item label="商品图片" prop="product_img">
					<el-upload
						class="upload-demo"
						:action="action"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:on-success="uploadSuccess"
						:on-error="uploadError"
						name="image"
						multiple
						:auto-upload="false"
						:data="addForm"
						ref="upload"
						:limit="3"
						:on-exceed="handleExceed"
						:file-list="fileList"
					>
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">最多上传3个</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="商品描述" prop="product_desc">
					<el-input v-model="addForm.product_desc"></el-input>
				</el-form-item>
				<el-form-item label="商品价格" prop="price">
					<el-input v-model="addForm.price"></el-input>
				</el-form-item>
				<el-form-item label="库存" prop="count">
					<el-input v-model="addForm.count"></el-input>
				</el-form-item>
				<el-form-item label="限售" prop="limit_num">
					<el-input v-model="addForm.limit_num"></el-input>
				</el-form-item>
				<el-form-item label="颜色" prop="product_color">
					<el-input v-model="addForm.product_color"></el-input>
				</el-form-item>
				<el-form-item label="规格" prop="product_capacity">
					<el-input v-model="addForm.product_capacity"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="_addGoods">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
	getAllGoods,
	getGoodsLimit,
	getCategory,
	searchGoods,
	addGoods,
	updateGoods,
	updateGoodsState,
	delGoods,
} from "api/goods.js";
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
			action: "",
			// 登录表单的数据绑定对象
			addForm: {
				product_id: "",
				cid: "",
				product_title: "",
				product_desc: "",
				price: "",
				count: "",
				limit_num: 0,
				product_img: "",
				product_color: "",
				product_capacity: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
			fileList: [],
		};
	},
	created() {
		this._getAllGoods();
		this._getCategory();
	},
	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
					files.length + fileList.length
				} 个文件`
			);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		async _getAllGoods() {
			let allres = await getAllGoods();
			if (allres.success === false) {
				return this.$message.error("获取商品列表失败！");
			}
			let limitGoods = await getGoodsLimit(this.queryInfo);
			this.itemList = limitGoods.data;
			this.total = allres.data.length;
		},
		//获取分类
		async _getCategory() {
			let res = await getCategory();
			this.category = res.data;
		},
		//搜索商品
		async _searchGoods() {
			let res = await searchGoods(this.queryInfo.query);
			this.itemList = res.data;
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
		async _updateGoodsState(itemInfo) {
			let res = await updateGoodsState(itemInfo);
			if (res.success !== true) {
				itemInfo.state = !itemInfo.state;
				return this.$message.error(res.message);
			}
			return this.$message.success(res.message);
		},
		//监听 添加商品对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新商品
		_addGoods() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return;
				//表单都合法才向后台发起添加商品的请求
				if (this.addForm.product_id === "") {
					//添加
					this.action = "http://localhost:3333/goods/addGoods";
					this.$refs.upload.submit();
				} else {
					//修改
					let res = await updateGoods(this.addForm);
					if (res.success === true) {
						this.$message.success(res.message);
					} else {
						this.$message.error(res.message);
					}
				}
				//隐藏添加商品的对话框
				this.addDialogVisible = false;
				//重置表单
				this.$refs.addFormRef.resetFields();
				//重新获取商品信息列表数据
				this._getAllGoods();
			});
		},
		uploadSuccess(res) {
			this.$message.success(res.message);
		},
		uploadError(res) {
			this.$message.error(res.message);
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加商品";
			this.itemFlag = false;
			Object.keys(this.addForm).forEach((v) => (this.addForm[v] = ""));
			this.addDialogVisible = true;
		},
		// 点击修改按钮
		editDialog(itemInfo) {
			//给表单赋值
			this.title = "更新商品";
			this.itemFlag = true;
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
