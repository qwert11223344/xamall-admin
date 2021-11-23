<template>
	<div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from "../plugin/echarts.js";
export default {
	props: {
		id: {
			type: "String",
			default: "",
		},
		height: {
			type: [Number, String],
			default: 0,
		},
		width: {
			type: [Number, String],
			default: 0,
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	mounted() {
		this.initChart();
	},
	methods: {
		initChart() {
			const myChart = echarts.init(document.getElementById(this.id));
			myChart.setOption({
				title: {
					text: "ECharts 入门示例",
				},
				tooltip: {},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
				},
				yAxis: {},
				series: [
					{
						name: "销量",
						type: "bar",
						data: [5, 20, 36, 10, 10, 20],
					},
				],
			});
		},
	},
};
</script>

<style>
</style>
