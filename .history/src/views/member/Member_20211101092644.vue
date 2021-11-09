<template>
	<div id="member">
		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input
						placeholder="请输入会员名"
						v-model="queryInfo.query"
						clearable
						@clear="getUserList"
						@keyup.enter.native="getUserList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getUserList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialog()">添加会员</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 -->
			<el-table :data="memberList" border stripe>
				<el-table-column label="id" prop="id"></el-table-column>
				<el-table-column label="会员名称" prop="username"></el-table-column>
				<el-table-column label="昵称" prop="nickname"></el-table-column>
				<el-table-column label="电话" prop="tel"></el-table-column>
				<el-table-column label="email" prop="email"></el-table-column>
				<el-table-column label="性别" prop="sex"></el-table-column>
				<el-table-column label="地址" prop="address"></el-table-column>
				<el-table-column label="头像" prop="file"></el-table-column>
				<el-table-column label="签名" prop="description"></el-table-column>
				<el-table-column label="积分" prop="integral"></el-table-column>
				<el-table-column label="可用状态" prop="status">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							@change="memberStatusChanged(scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- Tooltip文字提示 -->
						<el-tooltip
							effect="dark"
							content="修改"
							placement="top"
							:enterable="false"
						>
							<!-- 修改按钮 -->
							<el-button
								type="primary"
								icon="el-icon-edit"
								circle
								size="mini"
								@click="editDialog(scope.row)"
							></el-button>
						</el-tooltip>
						<!-- Tooltip文字提示 -->
						<el-tooltip effect="dark" content="删除" placement="top">
							<!-- 删除按钮 -->
							<el-button
								type="danger"
								icon="el-icon-delete"
								circle
								size="mini"
								@click="delDialog(scope.row.id)"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.num"
				:page-sizes="[1, 2, 4]"
				:page-size="queryInfo.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>

		<!-- 添加会员的对话框 -->
		<el-dialog
			:title="title"
			:visible.sync="addDialogVisible"
			width="50%"
			@close="addDialogClosed"
		>
			<!-- 内容主体区域 -->
			<el-form
				ref="addFormRef"
				:model="addForm"
				:rules="addFormRules"
				label-width="70px"
			>
				<el-form-item label="会员名" prop="username">
					<el-input
						v-model="addForm.username"
						:disabled="memberFlag"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="addForm.nickname"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="addForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="email" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="addForm.sex"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="file">
					<el-input v-model="addForm.file"></el-input>
				</el-form-item>
				<el-form-item label="个性签名" prop="description">
					<el-input v-model="addForm.description"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addMember">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>