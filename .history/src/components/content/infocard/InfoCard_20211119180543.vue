<template>
	<Card shadow="hover" class="info-card-wrapper" :padding="0">
		<div class="content-con">
			<div class="left-area" :style="{ background: color, width: leftWidth }">
				<slot name="icon" />
			</div>
			<div class="right-area" :style="{ width: rightWidth }">
				<div>
					<slot></slot>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
export default {
	name: "InforCard",
	props: {
		left: {
			type: Number,
			default: 36,
		},
		color: {
			type: String,
			default: "",
		},
		icon: {
			type: String,
			default: "",
		},
		iconSize: {
			type: Number,
			default: 20,
		},
		shadow: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		leftWidth() {
			return `${this.left}%`;
		},
		rightWidth() {
			return `${100 - this.left}%`;
		},
	},
};
</script>

<style lang="less">
.common {
	float: left;
	height: 100%;
	display: table;
	text-align: center;
}
.size {
	width: 100%;
	height: 100%;
}
.middle-center {
	display: table-cell;
	vertical-align: middle;
}
.info-card-wrapper {
	border: 1px solid rgba(100, 100, 100, 0.2);
	box-shadow: 3px 3px 3px rgba(100, 100, 100, 0.3);
	.size;
	overflow: hidden;
	.ivu-card-body {
		.size;
	}
	.content-con {
		.size;
		position: relative;
		.left-area {
			.common;
			& > .icon {
				.middle-center;
			}
		}
		.right-area {
			.common;
			& > div {
				.middle-center;
			}
		}
	}
}
</style>
