<template>
	<div class="main">
		<info-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
			<template #icon></template>
			<count-to :end="50" count-class="count-style" />
			<p>会员数量</p>
		</info-card>
		<echarts id="homeCharts" width="300px" height="200px" />
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
				{ title: "累计点击", icon: "md-locate", count: 232, color: "#19be6b" },
				{
					title: "新增问答",
					icon: "md-help-circle",
					count: 142,
					color: "#ff9900",
				},
				{ title: "分享统计", icon: "md-share", count: 657, color: "#ed3f14" },
				{
					title: "新增互动",
					icon: "md-chatbubbles",
					count: 12,
					color: "#E46CBB",
				},
				{ title: "新增页面", icon: "md-map", count: 14, color: "#9A66E4" },
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

<style>
.count-style {
	font-size: 50px;
}
</style>
