<template>
	<div class="goods">
		<div class="nav">
			<div class="w">
				<a
					href="javascript:;"
					:class="{ active: sortType === 0 }"
					@click="reset()"
					>综合排序</a
				>
				<a
					href="javascript:;"
					@click="sortPrice(1)"
					:class="{ active: sortType === 1 }"
					>价格从低到高</a
				>
				<a
					href="javascript:;"
					@click="sortPrice(-1)"
					:class="{ active: sortType === -1 }"
					>价格从高到低</a
				>
				<div class="price-interval">
					<input type="number" class="input" placeholder="价格" v-model="min" />
					<span style="margin: 0 5px"> - </span>
					<input type="number" placeholder="价格" v-model="max" />
					<w-button
						text="确定"
						classStyle="main-btn"
						@btnClick="rangePrice"
						style="margin-left: 10px"
					></w-button>
				</div>
			</div>
		</div>

		<div
			v-loading="loading"
			element-loading-text="加载中..."
			style="min-height: 35vw"
		>
			<div class="img-item" v-if="!noResult">
				<!--商品-->
				<div class="goods-box w">
					<mall-good
						v-for="(item, i) in showGoods"
						:key="i"
						:item="item"
					></mall-good>
				</div>

				<el-pagination
					v-if="!noResult && !error"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[4, 8, 16, 20]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="goodsNum"
				>
				</el-pagination>
			</div>
			<div class="no-info" v-if="noResult">
				<div class="no-data">
					<img src="~assets/img/no-search.png" />
					<br />
					抱歉！暂时还没有商品
				</div>
			</div>
			<div class="no-info" v-if="error">
				<div class="no-data">
					<img src="~assets/img/error.png" />
					<br />
					抱歉！出错了...
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAllGoods } from "api/goods";

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