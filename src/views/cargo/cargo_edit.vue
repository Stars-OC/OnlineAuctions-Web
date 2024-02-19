<template>
	<div>
		
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
