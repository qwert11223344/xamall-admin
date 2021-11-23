<template></template>

<script>
import echarts from "../plugin/echarts";
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
		initChart() {},
	},
};
</script>

<style>
</style>
