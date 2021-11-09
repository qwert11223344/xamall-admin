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
				<!-- <div class="ds pa">
					<a @click="openProduct(item.product_id)">
						<w-button text="查看详情" style="margin: 0 5px"></w-button>
					</a>
					<w-button
						text="加入购物车"
						style="margin: 0 5px"
						@btnClick="
							addCart({
								prodId: item.product_id,
								prodPrice: item.price,
								prodTitle: item.product_title,
								prodImg: item.product_img,
							})
						"
						classStyle="main-btn"
					></w-button>
				</div> -->
				<p>
					<span style="font-size: 14px">￥</span
					>{{ Number(item.price).toFixed(2) }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import { addToCart } from "api/user.js";
import WButton from "components/content/WButton";
import { mapState } from "vuex";
import { goodsDetailMixin } from "common/mixin/mixin.js";
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
	computed: mapState({
		login: "login",
		userInfo: "userInfo",
	}),
	mixins: [goodsDetailMixin],
	methods: {
		// //添加购物车
		// addCart(prod) {
		// 	if (!this.login) {
		// 		this.$router.push("/login");
		// 	} else {
		// 		prod.userId = this.userInfo.id;
		// 		if (!prod.count) {
		// 			prod.count = 1;
		// 		} else {
		// 			prod.count += 1;
		// 		}
		// 		addToCart(prod).then((res) => {
		// 			if (res.success === true) {
		// 				this.message(res.message, "success");
		// 				this._getAddressList();
		// 			} else {
		// 				this.message(res.message, "error");
		// 			}
		// 		});
		// 	}
		// },
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
