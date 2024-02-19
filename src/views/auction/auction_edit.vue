<template>
	<div>
		<el-dialog title="编辑拍卖" v-model="dialogVisible" width="50%" align-center>
			<auction-edit></auction-edit>
			
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: true,
			auctionId: this.$route.params.id,
		};
	},
	created() {
		console.log(this.$route.params.operation);
	},
};
</script>

<style lang="scss" scoped></style>
