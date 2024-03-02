<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-table :data="cargoList" stripe style="width: 100%">
					<el-table-column fixed prop="createAt" label="时间" width="200" />
					<el-table-column prop="cargoId" label="货物id" />
					<el-table-column prop="name" label="货物名" />
					<el-table-column prop="description" label="描述" width="300" />
					<el-table-column prop="type" label="类型" />
					<el-table-column prop="status" label="状态" />
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button link type="primary" size="small" v-if="scope.row.status == 0" @click="updateCargo(scope.row)">编辑</el-button>
							<el-button link type="primary" size="small" v-else disabled>编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:page-size="pageInfo.limit"
					:current-page="pageInfo.page"
					layout="prev, pager, next"
					:total="total"
					style="margin: 10px 0"
					@current-change="pageChange"
					small
					background
				/>
				<div style="text-align: center">
					<el-button type="primary" @click="addCargo">添加货物</el-button>
				</div>
			</el-main>
		</el-container>
		<el-dialog title="编辑拍卖物品" v-model="dialogVisible" width="50%" append-to-body destroy-on-close>
			<cargo-edit :cargo="cargo" :operation="operation" @close="closeCargo"></cargo-edit>

		</el-dialog>
	</div>
</template>

<script>
import { Cargo } from '@/api/request';
import DateUtils from '@/utils/DateUtils';
export default {
	data() {
		return {
			operation: "add",
			dialogVisible: false,
			cargo: {},
			cargoList: [
				{
					cargoId: 1,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850519,
					updateAt: 1706850519,
					status: 4,
				},
			],
			pageInfo: {
				page: 1,
				limit: 10,
				filter: '',
			},
			total: 10 / 10,
			
		};
	},
	mounted() {
		this.typeView();
	},
	methods: {
		typeView() {
			Cargo.list(this.pageInfo).then(res => {
				this.dateChange(res);
			});
		},
		dateChange(res) {
			if (res.success) {
				console.log(res);
				this.total = res.data.count;
				res.data.data.forEach(item => {
					item.createAt = DateUtils.formatTimestamp(item.createAt);
					item.updateAt = DateUtils.formatTimestamp(item.updateAt);
				});
				this.cargoList = res.data.data;
			}
		},
		toMy() {
			this.$router.push('/user/my');
		},
		pageChange(num) {
			this.pageInfo.page = num;
			this.typeView();
		},
		addCargo(){
			this.operation = 'add';
			this.dialogVisible = true;
		},
		updateCargo(cargo) {
			this.cargo = cargo;
			this.operation = 'update';
			this.dialogVisible = true;
		},
		closeCargo(){
			this.typeView();
			this.dialogVisible = false;
			
		}
	},
};
</script>

<style lang="scss" scoped>
.main {
	margin: 0;
	.body {
		margin-top: 20px;
		height: 62vh;

		.avatar-uploader {
			text-align: center;
			margin-bottom: 30px;
			.avatar {
				width: 120px;
				height: auto;
				display: block;
			}
		}
		.form {
			margin: 10px 80px 0 80px;
		}
	}
}
</style>
