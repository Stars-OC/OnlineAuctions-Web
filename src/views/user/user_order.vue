<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-table :data="orderList" stripe style="width: 100%">
					<el-table-column fixed prop="createAt" label="时间" width="200" />
					<el-table-column prop="orderId" label="订单id" />
					<el-table-column prop="cargoId" label="货物id" />
					<el-table-column prop="title" label="订单名称" width="120" />
					<el-table-column prop="description" label="描述" width="150" />
					<el-table-column prop="balance" label="成交金额" />
					<el-table-column prop="type" label="类型" />
					<el-table-column prop="status" label="状态" />
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button link type="primary" size="small" @click="checkOrder(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:page-size="pageInfo.limit"
					:current-page="pageInfo.page"
					layout="prev, pager, next"
					:total="total"
					style="margin: 20px 0"
					@current-change="pageChange"
					small
					background
				/>
			</el-main>
		</el-container>
		<el-dialog title="查看订单信息" v-model="dialogVisible" width="50%" append-to-body destroy-on-close>
			<order-info :order="order" ></order-info>
		</el-dialog>
	</div>
</template>

<script>
import { useUserStore } from '@/store';
import { User } from '@/api/request';
import DateUtils from '@/utils/DateUtils';
const userStore = useUserStore();
const order = User.order;
export default {
	data() {
		return {
			order: {},
			dialogVisible: false,
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
			order.list(this.pageInfo).then(res => {
				if (res.success) {
					res.data.data.forEach(item => {
						item.createAt = DateUtils.formatTimestamp(item.createAt);
					});
					this.orderList = res.data.data;
					this.total = res.data.count;
				}
			});
		},
		pageChange(num) {
			this.pageInfo.page = num;
			this.typeView();
		},
		toMy() {
			this.$router.push('/user/my');
		},
		checkOrder(order){
			this.order = order;
			this.dialogVisible = true;
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
