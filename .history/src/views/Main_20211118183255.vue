<template>
	<div class="main">
		<count-to :end="50" count-class="count-style" />
		<echarts id="homeCharts" width="300px" height="200px" />
	</div>
</template>

<script>
import CountTo from "components/content/countto/CountTo.vue";
import InfoCard from "components/content/infocard/InfoCard.vue";
import Echarts from "common/Echarts.vue";
export default {
	data() {
		return {};
	},
	components: {
		Echarts,
		CountTo,
	},
};
</script>

<style>
.count-style {
	font-size: 50px;
}
</style>
