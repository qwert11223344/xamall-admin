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
export default {};
</script>

<style>
</style>