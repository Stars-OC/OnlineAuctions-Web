<template>
	<div>
		<el-container>
			<el-main class="main"> 

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

