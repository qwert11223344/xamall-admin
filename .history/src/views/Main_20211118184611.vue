<template>
	<div class="main">
		<info-card shadow>
			<template #icon> 123 </template>
			<count-to :end="50" count-class="count-style" />
			<p>123</p>
		</info-card>
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
		InfoCard,
	},
};
</script>

<style>
.count-style {
	font-size: 50px;
}
</style>
