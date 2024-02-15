<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-table :data="cargoList" stripe style="width: 100%">
					<el-table-column fixed prop="createAt" label="时间" width="150" />
					<el-table-column prop="cargoId" label="货物id" />
					<el-table-column prop="name" label="货物名" />
					<el-table-column prop="description" label="描述" />
					<el-table-column prop="type" label="类型" />
					<el-table-column prop="status" label="状态" />
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button link type="primary" size="small" v-if="scope.row.status == 0">编辑</el-button>
							<el-button link type="primary" size="small" v-else disabled>编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small background layout="prev, pager, next" :total="total"  />
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
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
				{
					cargoId: 2,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850821,
					updateAt: 1706850821,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
				{
					cargoId: 3,
					name: '114514',
					description: '123456',
					resource: null,
					type: '0',
					seller: 123456,
					createAt: 1706850824,
					updateAt: 1706850824,
					status: 0,
				},
			],
			total: 10/15+1
		};
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
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
