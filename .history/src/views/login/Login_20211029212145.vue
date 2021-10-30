<template>
	<div id="login">
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
		<div class="snow"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);
body {
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
	text-align: center;
	background: black;
}
#login {
	$snow-size: 3em;
	width: $snow-size * 10;
	height: $snow-size * 10;
	padding: 10em;
	display: flex;
	flex-wrap: wrap;
	background: black;
	filter: blur(15px) contrast(30);

	.snow {
		position: relative;
		width: $snow-size;
		height: $snow-size;
		border-radius: 100%;

		&::after {
			position: absolute;
			content: "";
			left: 0;
			width: inherit;
			height: inherit;
			background: white;
			transition: 30s cubic-bezier(0.19, 1, 0.22, 1);
		}

		&:hover::after {
			transform: scale(0);
			transition-duration: 0.3s;
		}
	}
}
</style>