<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-table :data="orderList" stripe style="width: 100%">
					<el-table-column fixed prop="createAt" label="时间" width="150" />
					<el-table-column prop="orderId" label="订单id" />
					<el-table-column prop="cargoId" label="货物id" />
					<el-table-column prop="title" label="订单名称" width="120" />
					<el-table-column prop="description" label="描述" width="150" />
					<el-table-column prop="balance" label="成交金额" />
					<el-table-column prop="type" label="类型" />
					<el-table-column prop="status" label="状态" />
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button link type="primary" size="small">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small background layout="prev, pager, next" :total="total" />
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { useUserStore } from '@/store';
var userStore = useUserStore();
export default {
	data() {
		return {
			orderList: [
				{
					orderId: 7,
					cargoId: 1,
					title: 'awq',
					description: 'aaaa',
					balance: 100.0,
					type: 0,
					status: 1,
					createAt: 0,
				},
				{
					orderId: 8,
					cargoId: 1,
					title: 'awq',
					description: 'aaaa',
					balance: 100.0,
					type: 0,
					status: 1,
					createAt: 0,
				},
				{
					orderId: 10,
					cargoId: 4,
					title: 'test',
					description: 'test.123456',
					balance: 130.0,
					type: 0,
					status: 4,
					createAt: 1707121087,
				},
			],
			total: 10 / 15 + 1,
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
