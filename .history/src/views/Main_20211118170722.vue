<template>
	<div class="main">
		<e-charts :id="home - charts" />
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
