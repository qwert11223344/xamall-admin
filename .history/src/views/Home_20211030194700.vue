<template>
	<div id="home">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
			<el-radio-button :label="false">+</el-radio-button>
			<el-radio-button :label="true">-</el-radio-button>
		</el-radio-group>
		<el-menu
			default-active="1-4-1"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="isCollapse"
		>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">版块管理</span>
				</template>
				<el-menu-item-group>
					<span slot="title">首页模块</span>
					<el-menu-item index="1-1">轮播图</el-menu-item>
					<el-menu-item index="1-2">热门商品</el-menu-item>
					<el-menu-item index="1-3">坚果R2及配件</el-menu-item>
					<el-menu-item index="1-4">活动版块</el-menu-item>
					<el-menu-item index="1-5">官方精选</el-menu-item>
					<el-menu-item index="1-6">足迹保护套</el-menu-item>
					<el-menu-item index="1-7">Smartisan TNT</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="2">
				<template #title>
					<i class="el-icon-menu"></i>
					<span slot="title">商品管理</span>
				</template>
				<el-menu-item-group>
					<span slot="title">商品数据</span>
					<el-menu-item index="2-1">所有商品</el-menu-item>
					<el-menu-item index="2-2">添加商品</el-menu-item>
					<el-menu-item index="2-3">修改商品</el-menu-item>
					<el-menu-item index="2-4">下架商品</el-menu-item>
					<el-menu-item index="2-5">查找商品</el-menu-item>
				</el-menu-item-group>
			</el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-document"></i>
				<span slot="title">订单管理</span>
				<el-menu-item-group>
					<span slot="title">处理订单</span>
					<el-menu-item index="3-1">所有订单</el-menu-item>
					<el-menu-item index="3-2">查找订单</el-menu-item>
					<el-menu-item index="3-3">待付款</el-menu-item>
					<el-menu-item index="3-4">未发货</el-menu-item>
					<el-menu-item index="3-5">已发货</el-menu-item>
					<el-menu-item index="3-6">已结算</el-menu-item>
					<el-menu-item index="3-7">删除订单</el-menu-item>
				</el-menu-item-group>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isCollapse: true,
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	},
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>