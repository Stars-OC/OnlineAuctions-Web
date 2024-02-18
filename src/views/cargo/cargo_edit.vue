<template>
	<div>
		<el-dialog title="编辑拍卖" v-model="dialogVisible" width="50%" append-to-body>
			<cargo-edit></cargo-edit>
			<span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="windowVisible = false">取消</el-button>
                </span>
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
