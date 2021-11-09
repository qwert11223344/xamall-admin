<template>
	<div>
		<nav></nav>
		<home />
	</div>
</template>

<script>
import Home from "views/Home.vue";
import Nav from "common/Nav.vue";
export default {
	components: {
		Home,
		Nav,
	},
};
</script>

<style>
</style>