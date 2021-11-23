<template>
	<div>
		<w-nav></w-nav>
		<router-view />
	</div>
</template>

<script>
import WNav from "common/Nav.vue";
export default {
	components: {
		WNav,
	},
};
</script>

<style scoped>
div {
	width: 100vw;
	overflow: hidden;
}
</style>
