<template>
	<div class="main">
		<el-row :gutter="30" style="width: 1200px">
			<el-col
				:span="6"
				v-for="(infor, i) in inforCardData"
				:key="`infor-${i}`"
				style="height: 120px; padding-bottom: 10px"
			>
				<info-card shadow :color="infor.color">
					<template #icon>
						<i :class="infor.icon"></i>
					</template>
					<count-to :end="infor.count" count-class="count-style" />
					<p class="info-title">{{ infor.title }}</p>
				</info-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<echarts type="pie" id="homeCharts" width="400px" height="500px" />
			</el-col>
			<el-col :span="16">
				<el-calendar>
					<template slot="dateCell" slot-scope="{ date, data }">
						<p :class="data.isSelected ? 'is-selected' : ''" class="cell-data">
							{{ data.day.split("-").slice(2)[0] }}
							{{ data.isSelected ? "✔️" : "" }}
						</p>
					</template>
				</el-calendar>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import CountTo from "components/content/countto/CountTo.vue";
import InfoCard from "components/content/infocard/InfoCard.vue";
import Echarts from "common/Echarts.vue";

import { getAllMember } from "api/member.js";
import { getAllGoods } from "api/goods.js";
import { getOrderNum } from "api/order.js";
import { getCategory } from "api/category.js";
export default {
	data() {
		return {
			memberNum: 0,
			goodsNum: 0,
			orderNum: 0,
			inforCardData: [],
		};
	},
	components: {
		Echarts,
		CountTo,
		InfoCard,
	},
	async created() {
		let resMember = await getAllMember();
		let resGoods = await getAllGoods();
		let resOrder = await getOrderNum();
		this.memberNum = parseInt(resMember.data);
		this.goodsNum = resGoods.data.length;
		this.orderNum = resOrder.data;
		this.inforCardData = [
			{
				title: "会员数量",
				icon: "el-icon-user-solid",
				count: this.memberNum,
				color: "#2d8cf0",
			},
			{
				title: "商品总量",
				icon: "el-icon-s-goods",
				count: this.goodsNum,
				color: "#19be6b",
			},
			{
				title: "订单总量",
				icon: "el-icon-document",
				count: this.orderNum,
				color: "#ff9900",
			},
			{ title: "当日订单量", icon: "md-share", count: 657, color: "#ed3f14" },
		];
		let resCategory = await getCategory();
		console.log(resCategory);
	},
};
</script>

<style lang="less" scoped>
.main {
	padding: 30px 50px;
}
.count-style {
	font-size: 50px;
}
.is-selected {
	color: #1989fa;
}
/deep/ .cell-data {
	display: flex;
	height: 100%;
	font-size: 18px;
	font-weight: 600;
	justify-content: center;
	align-items: center;
}
.info-title {
	font-size: 14px;
}
</style>
