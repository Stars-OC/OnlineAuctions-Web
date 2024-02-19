<template>
	<div>
		<el-dialog title="编辑拍卖" v-model="dialogVisible" width="50%" append-to-body>
			<cargo-edit></cargo-edit>
			
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: true,
			cargoId: this.$route.params.id,
		};
	},
	created() {
		console.log(this.$route.params.operation);
	},
};
</script>

<style lang="scss" scoped></style>
