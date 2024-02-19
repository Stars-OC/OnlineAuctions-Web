<template>
	<div>
		<order-info></order-info>
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
};
</script>

<style lang="scss" scoped></style>
