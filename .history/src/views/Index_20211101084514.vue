<template>
	<div>
		<W-nav></W-nav>
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

<style>
</style>