<template>
	<nav>
		<span>小爱商城后台管理</span>
		<span>欢迎您,{{ name }}</span>
		<span @click="logout"><a href="javascript,;">退出</a></span>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			name: "",
		};
	},
	methods: {
		logout() {
			window.localStorage.removeItem("admin-token");
			window.localStorage.removeItem("admin");
		},
	},
	created() {
		this.name = window.localStorage.getItem("admin");
	},
};
</script>

<style scoped>
nav {
	height: 50px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(100, 100, 100, 0.8);
	color: #f3f3f3;
	padding: 0 30px;
}
span:last-child {
}
a {
	text-decoration: none;
	color: #000;
}
</style>
