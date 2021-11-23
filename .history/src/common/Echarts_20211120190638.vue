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
		type: {
			type: String,
			default: "",
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
		desc: {
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
		setTimeout(this.initChart, 1000);
	},
	beforeDestroy() {
		this.chart.dispose();
	},
	methods: {
		initChart() {
			console.log(this.desc);
			this.chart = echarts.init(document.getElementById(this.id));
			this.chart.setOption({
				title: {
					text: this.text,
					subtext: "",
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
						name: this.desc,
						type: this.type,
						radius: "50%",
						data: this.data,
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
