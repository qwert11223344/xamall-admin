<template>
	<div class="goods">123</div>
</template>

<script>
import { getAllGoods } from "api/goods.js";

import MallGood from "components/content/mallgoods/MallGood.vue";
import WButton from "components/content/WButton.vue";
import Shelf from "components/content/shelf/Shelf.vue";
export default {
	data() {
		return {
			allGoods: [], //所有商品
			goods: [], // 满足条件的商品
			showGoods: [], // 当前页面展示的商品
			noResult: false,
			error: false,
			min: "",
			max: "",
			loading: true,
			sortType: 0,
			currentPage: 1,
			pageSize: 8,
		};
	},
	components: {
		MallGood,
		WButton,
		Shelf,
	},
	methods: {
		handleSizeChange(val) {
			this.pageSize = val;
			this.sortType = 0;
			this._showGoods();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this._showGoods();
		},
		// 默认排序
		reset() {
			this.sortType = 0;
			this.loading = true;
			this._getAllGoods();
		},
		// 价格排序
		sortPrice(val) {
			this.sortType = val;
			this.goods = this.allGoods.sort((a, b) => {
				return val === 1 ? a.price - b.price : b.price - a.price;
			});
			this._showGoods();
		},
		// 价格筛选
		rangePrice() {
			this.goods = this.allGoods.filter((item) => {
				return item.price >= this.min && item.price <= this.max;
			});
			this._showGoods();
		},
		// 截取展示的商品数据
		_showGoods() {
			let MaxLength = this.currentPage * this.pageSize;
			if (MaxLength < this.goods.length) {
				this.showGoods = this.goods.slice(
					(this.currentPage - 1) * this.pageSize,
					MaxLength
				);
			} else {
				this.showGoods = this.goods.slice(
					(this.currentPage - 1) * this.pageSize,
					this.goods.length
				);
			}
		},
		_getAllGoods() {
			getAllGoods().then((res) => {
				console.log(res);
				if (res.success === true) {
					this.allGoods = res.data;
					this.goods = res.data;
					this._showGoods();
					this.noResult = false;
					if (this.goodsNum === 0) {
						this.noResult = true;
					}
					this.error = false;
				} else {
					this.error = true;
				}
				this.loading = false;
			});
		},
	},
	computed: {
		// 商品总数量
		goodsNum() {
			return this.goods.length;
		},
	},
	mounted() {
		this._getAllGoods();
	},
};
</script>

<style>
</style>