<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-form class="form" v-if="wallet.username">
					<el-form-item label="用户id">
						<el-input v-model="wallet.username" disabled/>
					</el-form-item>
					<el-form-item label="账户余额">
						<el-input v-model="wallet.balance " disabled/>
					</el-form-item>
					<el-form-item label="账户信誉值">
						<el-input v-model="wallet.password" disabled/>
					</el-form-item>
					<div style="text-align: center; margin-top: 20px">
						<el-button size="large" type="primary" @click="updateUser">充值</el-button>
					</div>
				</el-form>
				<el-form class="form" v-else>
					<el-form-item label="密码">
						<el-input type="password" show-password v-model="createWallet.password" />
					</el-form-item>
					<el-form-item label="确认密码">
						<el-input type="password" show-password v-model="createWallet.confirmPassword" />
					</el-form-item>
					<div style="text-align: center; margin-top: 20px">
						<el-button size="large" type="primary" @click="updateUser">创建钱包</el-button>
					</div>
				</el-form>
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			wallet: {
				username: 123,
				balance: 123.0,
				fund: 123.0,
				updateAt: 123123,
			},
			createWallet: {
				password: '',
				confirmPassword: '',
			},
		};
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
		updateUser() {
			console.log(this.user);
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

		.form {
			margin: 130px 80px 0 80px;
		}
	}
}
</style>
