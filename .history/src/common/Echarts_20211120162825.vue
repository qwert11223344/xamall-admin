<template>
	<div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from "../plugin/echarts.js";
export default {
	props: {
		id: {
			type: String,
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
		text: {
			type: String,
			default: "",
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
	beforeDestroy() {
		this.chart.dispose();
	},
	methods: {
		initChart() {
			this.chart = echarts.init(document.getElementById(this.id));
			this.chart.setOption({
				title: {
					text: this.text,
					subtext: "Fake Data",
					left: "center",
				},
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "Access From",
						type: "pie",
						radius: "50%",
						data: [
							{ value: 1048, name: "Search Engine" },
							{ value: 735, name: "Direct" },
							{ value: 580, name: "Email" },
							{ value: 484, name: "Union Ads" },
							{ value: 300, name: "Video Ads" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			});
		},
	},
};
</script>

<style>
</style>
