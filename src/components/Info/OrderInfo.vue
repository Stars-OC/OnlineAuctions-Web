<template>
	<div class="order-details">
		<el-card header="订单详情">
			<el-row>
				<el-col :span="8">订单ID:</el-col>
				<el-col :span="16">{{ orderInfo.orderId }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">货物ID:</el-col>
				<el-col :span="16">{{ orderInfo.cargoId }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">标题:</el-col>
				<el-col :span="16">{{ orderInfo.title }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">描述:</el-col>
				<el-col :span="16">{{ orderInfo.description }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">余额:</el-col>
				<el-col :span="16">{{ orderInfo.balance }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">类型:</el-col>
				<el-col :span="16">{{ orderTypeText }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">状态:</el-col>
				<el-col :span="16">{{ orderStatusText }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">创建时间:</el-col>
				<el-col :span="16">{{ formatDate(orderInfo.createAt) }}</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderId: this.$route.params.id,
			orderInfo: {
				orderId: 10,
				cargoId: 4,
				title: 'test',
				description: 'test.123456',
				balance: 130.0,
				type: 0,
				status: 4,
				createAt: 1707121087,
			},
			orderTypeText: '', // 用于显示订单类型的文本
			orderStatusText: '', // 用于显示订单状态的文本
		};
	},
	props: ['orderId'],
	created() {
		this.setOrderTypeText();
		this.setOrderStatusText();
	},
	methods: {
		setOrderTypeText() {
			// 根据订单类型设置对应的文本
			switch (this.orderInfo.type) {
				case 0:
					this.orderTypeText = '普通订单';
					break;
				case 1:
					this.orderTypeText = '特殊订单';
					break;
				default:
					this.orderTypeText = '未知类型';
			}
		},
		setOrderStatusText() {
			// 根据订单状态设置对应的文本
			switch (this.orderInfo.status) {
				case 0:
					this.orderStatusText = '待支付';
					break;
				case 1:
					this.orderStatusText = '已支付';
					break;
				case 2:
					this.orderStatusText = '已发货';
					break;
				case 3:
					this.orderStatusText = '已完成';
					break;
				case 4:
					this.orderStatusText = '已取消';
					break;
				default:
					this.orderStatusText = '未知状态';
			}
		},
		formatDate(timestamp) {
			// 格式化时间戳
			const date = new Date(timestamp * 1000); // 注意要将秒转换为毫秒
			return date.toLocaleString();
		},
	},
};
</script>

<style lang="scss" scoped>
.order-details {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
}

.order-card {
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-row {
	margin-bottom: 10px;
}

.label {
	font-weight: bold;
}

.value {
	color: #333;
}
</style>
