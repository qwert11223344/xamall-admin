<template>
	<div class="good-item">
		<div style="">
			<div class="good-img">
				<a @click="goodsDetails(item.product_id, item.groups)">
					<img v-lazy="item.product_img" />
				</a>
			</div>
			<h6 class="good-title">
				{{ item.product_title }}
			</h6>
			<h3 class="good-desc">{{ item.product_desc }}</h3>
			<div class="good-price pr">
				<p>
					<span style="font-size: 14px">￥</span
					>{{ Number(item.price).toFixed(2) }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import WButton from "components/content/WButton";
export default {
	props: {
		item: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	mounted() {},
	components: {
		WButton,
	},
};
</script>
<style lang="scss" scoped>
@import "assets/style/mixin.scss";
@import "assets/style/theme.scss";
.good-item {
	background: #fff;
	width: 25%;
	transition: all 0.5s;
	height: 430px;
	&:hover {
		transform: translate(0, -3px) scale(0.95);
		box-shadow: 1px 1px 20px #999;
		// .good-price p {
		// 	display: none;
		// }
		.ds {
			display: flex;
		}
	}
	.ds {
		@extend %block-center;
		width: 100%;
		display: none;
	}

	.good-img {
		img {
			margin: 50px auto 10px;
			@include wh(206px);
			display: block;
		}
	}
	.good-price {
		margin: 15px 0;
		height: 30px;
		text-align: center;
		line-height: 30px;
		color: #d44d44;
		font-family: Arial;
		font-size: 18px;
		font-weight: 700;
	}
	.good-title {
		color: #424242;
		font-weight: 700;
		margin: 0 auto;
		padding: 0 14px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.good-desc {
		margin-top: 10px;
		color: #999;
	}
	h3 {
		text-align: center;
		line-height: 1.2;
		font-size: 12px;
		color: #d0d0d0;
		padding: 10px;
	}
}
</style>
