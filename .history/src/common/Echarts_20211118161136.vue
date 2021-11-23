<template></template>

<script>
import echarts from "echarts";
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
};
</script>

<style>
</style>
