<template>
	<div id="order">
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" class="order-header">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单发货</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20" class="search">
				<el-col :span="8">
					<el-input
						placeholder="请输入订单号"
						v-model="queryInfo.query"
						clearable
						@clear="getOrderList"
						@keyup.enter.native="getOrderList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getOrderList"
						></el-button>
					</el-input>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="orderList" border stripe>
				<!-- <el-table-column label="id" prop="_id"></el-table-column> -->
				<el-table-column type="expand">
					<template slot-scope="item">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="商品名称">
								<span>{{ item.row.prod_list[0].prod_title }}</span>
							</el-form-item>
							<el-form-item label="商品 ID">
								<span>{{ item.row.prod_list[0].prod_id }}</span>
							</el-form-item>
							<el-form-item label="商品单价">
								<span>{{ item.row.prod_list[0].prod_price }}</span>
							</el-form-item>
							<el-form-item label="商品数量">
								<span>{{ item.row.prod_list[0].prod_count }}</span>
							</el-form-item>
							<el-form-item label="商品">
								<span
									><img :src="item.row.prod_list[0].prod_img" alt=""
								/></span>
							</el-form-item>
							<el-form-item label="收货人昵称">
								<span>{{ item.row.address_list[0].nick_name }}</span>
							</el-form-item>
							<el-form-item label="收货人电话">
								<span>{{ item.row.address_list[0].tel }}</span>
							</el-form-item>
							<el-form-item label="收获地址">
								<span
									>{{ item.row.address_list[0].province
									}}{{ item.row.address_list[0].downtown_area
									}}{{ item.row.address_list[0].county
									}}{{ item.row.address_list[0].street }}</span
								>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="订单号" prop="order_num"></el-table-column>
				<el-table-column
					label="订单总金额"
					prop="total_price"
				></el-table-column>
				<el-table-column label="订单状态" prop="state" :formatter="showState">
				</el-table-column>
				<el-table-column
					label="付款类型"
					prop="pay_type"
					:formatter="payType"
					min-width="50px"
				></el-table-column>
				<el-table-column
					label="用户id"
					prop="user_id"
					min-width="50px"
				></el-table-column>
				<el-table-column
					label="创建时间"
					prop="created"
					:formatter="showTime"
				></el-table-column>
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
				:page-sizes="[4, 8, 12, 16]"
				:page-size="queryInfo.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>

		<!-- 添加订单的对话框 -->
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
				label-width="80px"
			>
				<el-form-item label="订单总金额" prop="total_price">
					<el-input v-model="addForm.total_price"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-select v-model="seletedStatusId" placeholder="请选择订单状态">
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="物流名称" prop="express">
					<el-input v-model="addForm.express"></el-input>
				</el-form-item>
				<el-form-item label="物流单号" prop="express_num">
					<el-input v-model="addForm.express_num"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addOrder">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getOrderNum, getOrderLimit } from "api/order.js";
import { formatDate } from "utils/utils.js";
export default {
	data() {
		return {
			//获取商品列表的参数对象
			queryInfo: {
				query: "",
				//当前的页数
				num: 1,
				///每页的数量
				size: 4,
			},
			orderList: [],
			total: 0,
			//表单名称
			title: "",
			orderFlag: false,
			//控制添加对话框的显示和隐藏
			addDialogVisible: false,
			// 登录表单的数据绑定对象
			addForm: {
				state: "",
				total_price: "",
				express: "",
				express_num: "",
			},
			// 添加表单的验证规则
			addFormRules: {},
			//订单选择状态id
			seletedStatusId: "",
			//订单状态
			statusList: [
				{
					id: 1,
					name: "0-未付款",
				},
				{
					id: 2,
					name: "1-未发货",
				},
				{
					id: 3,
					name: "2-已发货",
				},
				{
					id: 4,
					name: "3-已完成",
				},
				{
					id: 5,
					name: "4-订单关闭",
				},
			],
		};
	},

	created() {
		this.getOrderList();
	},
	methods: {
		async getOrderList() {
			let total = await getOrderNum();

			let res = await getOrderLimit(this.queryInfo);
			if (res.success !== true) {
				return this.$message.error("获取订单列表失败！");
			}
			this.orderList = res.data;
			this.total = total.data;
		},
		//格式化创建时间
		showTime(row, column, cellValue) {
			return formatDate(new Date(cellValue * 1), "yyyy-MM-dd hh:mm:ss");
		},
		//格式化订单状态
		showState(row, column, cellValue) {
			switch (cellValue) {
				case 0:
					return (cellValue = "未付款");
				case 1:
					return (cellValue = "未发货");
				case 2:
					return (cellValue = "已完成");
				case 3:
					return (cellValue = "订单关闭");
			}
		},
		payType(row, column, cellValue) {
			switch (cellValue) {
				case 0:
					return (cellValue = "未付款");
				case 1:
					return (cellValue = "支付宝");
				case 2:
					return (cellValue = "微信");
			}
		},
		//监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			this.queryInfo.size = newSize;
			this.getOrderList();
		},
		//监听 页码值 改变的事件
		handleCurrentChange(newNum) {
			this.queryInfo.num = newNum;
			this.getOrderList();
		},
		//监听 可用状态改变的事件
		async orderStatusChanged(orderInfo) {
			const { data: res } = await this.$http.post("orders/update", orderInfo);
			if (res.meta.status !== 200) {
				orderInfo.status = !orderInfo.status;
				return this.$message.error("更新订单状态失败！");
			}
			return this.$message.success("更新订单状态成功！");
		},
		//监听 添加商品对话框的关闭事件（重置表单）
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 点击按钮 添加新商品
		addOrder() {
			//判断是新增还是修改
			var url = "";
			if (this.addForm.id != null) {
				url = "orders/update";
			} else {
				url = "orders/add";
			}
			this.addForm.status = this.seletedStatusId;
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
				this.getOrderList();
				console.log(this.seletedStatusId);
			});
		},
		// 点击新增按钮
		addDialog() {
			//给表单赋值
			this.title = "添加订单";
			this.orderFlag = false;
			this.addForm = {};
			this.addDialogVisible = true;
		},
		// 点击修改按钮
		editDialog(orderInfo) {
			//给表单赋值
			this.title = "更新订单";
			this.orderFlag = true;
			//浅拷贝
			//this.addForm = memberInfo
			//使用深拷贝
			this.addForm = JSON.parse(JSON.stringify(orderInfo));
			this.seletedStatusId = orderInfo.status;
			this.addDialogVisible = true;
		},
		// 点击删除按钮
		async delDialog(id) {
			//弹框询问是否删除
			const confirmResult = await this.$confirm("是否删除该订单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).catch((err) => err);
			if (confirmResult != "confirm") {
				return this.$message.info("已取消删除");
			}
			const { data: res } = await this.$http.get("orders/del?id=" + id);
			if (res.meta.status !== 200) {
				this.$message.error(res.meta.msg);
			}
			this.$message.success(res.meta.msg);
			//重新获取会员信息列表数据
			this.getOrderList();
		},
	},
};
</script>

<style lang="scss" scoped>
#order {
	min-width: 1320px;
	max-width: 1500px;
	padding: 20px;
	.order-header {
		margin-bottom: 10px;
	}
	.search {
		margin-bottom: 20px;
	}
	.demo-table-expand {
		img {
			width: 50px;
			height: 50px;
		}
	}
}
</style>
