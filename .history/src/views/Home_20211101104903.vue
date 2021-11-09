<template>
	<div id="home">
		<div class="left-nav">
			<el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
				<el-radio-button :label="false">展开</el-radio-button>
				<el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>
			<el-menu
				default-active="1-4-1"
				class="el-menu-vertical-demo"
				:collapse="isCollapse"
				background-color="rgba(100, 100, 100, .8)"
				text-color="#f3f3f3"
				:unique-opened="true"
				:router="true"
			>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span slot="title">版块管理</span>
					</template>
					<el-menu-item-group>
						<span slot="title">首页模块</span>
						<el-menu-item index="/home/carousel">轮播图</el-menu-item>
						<el-menu-item index="/home/hotgoods">热门商品</el-menu-item>
						<el-menu-item index="/home/phone">坚果R2及配件</el-menu-item>
						<el-menu-item index="/home/activity">活动版块</el-menu-item>
						<el-menu-item index="/home/office">官方精选</el-menu-item>
						<el-menu-item index="/home/smartcover">足迹保护套</el-menu-item>
						<el-menu-item index="/home/computer">Smartisan TNT</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">会员管理</span>
					</template>

					<el-menu-item-group>
						<span slot="title">所有会员</span>
						<el-menu-item index="/home/member">会员编辑</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">商品管理</span>
					</template>

					<el-menu-item-group>
						<span slot="title">商品数据</span>
						<el-menu-item index="/home/allgoods">所有商品</el-menu-item>
						<el-menu-item index="/home/addgoods">添加商品</el-menu-item>
						<el-menu-item index="/home/updategoods">修改商品</el-menu-item>
						<el-menu-item index="/home/delgoods">下架商品</el-menu-item>
						<el-menu-item index="/home/findgoods">查找商品</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-document"></i>
						<span slot="title">订单管理</span>
					</template>

					<el-menu-item-group>
						<span slot="title">处理订单</span>
						<el-menu-item index="/home/allorder">所有订单</el-menu-item>
						<el-menu-item index="/home/findorder">查找订单</el-menu-item>
						<el-menu-item index="/home/notpay">待付款</el-menu-item>
						<el-menu-item index="/home/notdelive">未发货</el-menu-item>
						<el-menu-item index="/home/delived">已发货</el-menu-item>
						<el-menu-item index="/home/settlemented">已结算</el-menu-item>
						<el-menu-item index="/home/delorder">删除订单</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	data() {
		return {
			isCollapse: true,
		};
	},
	components: {},
	methods: {
		// handleOpen(key, keyPath) {
		// 	console.log(key, keyPath);
		// },
		// handleClose(key, keyPath) {
		// 	console.log(key, keyPath);
		// },
	},
};
</script>

<style lang="scss" scoped>
#home {
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	height: 85vh;
}
</style>