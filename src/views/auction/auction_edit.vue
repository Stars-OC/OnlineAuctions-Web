<template>
	<div></div>
</template>

<script>
export default {
	data() {
		return {
			auctionId: this.$route.params.id,
		};
	},
    created(){
        console.log(this.$route.params.operation);
    },
};
</script>

<style lang="scss" scoped></style>
