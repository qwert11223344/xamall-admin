<template>
	<div class="main">
		<echarts id="homeCharts" width="300px" height="200px" />
	</div>
</template>

<script>
import CountTo from "components/content/countto/CountTo.vue";
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
