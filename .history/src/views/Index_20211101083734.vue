<template>
	<div>
		<W-nav></W-nav>
		<W-home />
	</div>
</template>

<script>
import WHome from "views/Home.vue";
import WNav from "common/Nav.vue";
export default {
	components: {
		WHome,
		WNav,
	},
};
</script>

<style>
</style>