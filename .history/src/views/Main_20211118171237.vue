<template>
	<div class="main">
		<echarts :id="homeCharts" />
	</div>
</template>

<script>
import Echarts from "common/Echarts.vue";
export default {
	data() {
		return {};
	},
	components: {
		Echarts,
	},
};
</script>

<style>
</style>
