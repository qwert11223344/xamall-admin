<template>
	<div :id="id" :style="mystyle"></div>
</template>

<script>
import echarts from "../plugin/echarts.js";
export default {
	props: {
		id: {
			type: "String",
			default: "",
		},
		mystyle: {
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
	methods: {
		initChart() {},
	},
};
</script>

<style>
</style>
