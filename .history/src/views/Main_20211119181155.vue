<template>
	<div class="main">
		<el-row :gutter="10" style="width: 1200px">
			<el-col
				:span="6"
				v-for="(infor, i) in inforCardData"
				:key="`infor-${i}`"
				style="height: 120px; padding-bottom: 10px"
			>
				<info-card shadow :color="infor.color">
					<template #icon></template>
					<count-to :end="infor.count" count-class="count-style" />
					<p>{{ infor.title }}</p>
				</info-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<echarts id="homeCharts" width="300px" height="200px" />
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
export default {
	data() {
		return {
			inforCardData: [
				{
					title: "会员数量",
					icon: "md-person-add",
					count: 50,
					color: "#2d8cf0",
				},
				{ title: "商品总量", icon: "md-locate", count: 232, color: "#19be6b" },
				{
					title: "订单总量",
					icon: "md-help-circle",
					count: 142,
					color: "#ff9900",
				},
				{ title: "当日订单量", icon: "md-share", count: 657, color: "#ed3f14" },
			],
		};
	},
	components: {
		Echarts,
		CountTo,
		InfoCard,
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
	justify-content: center;
	align-items: center;
}
</style>
