<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-form class="form" v-if="wallet.username">
					<el-form-item label="用户id">
						<el-input v-model="wallet.username" disabled />
					</el-form-item>
					<el-form-item label="账户余额">
						<el-input v-model="wallet.money" disabled />
					</el-form-item>
					<el-form-item label="账户信誉值">
						<el-input v-model="wallet.fund" disabled />
					</el-form-item>
					<div style="text-align: center; margin-top: 20px">
						<el-button size="large" type="primary" @click="updateUserWallet">充值</el-button>
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
						<el-button size="large" type="primary" @click="createUserWallet">创建钱包</el-button>
					</div>
				</el-form>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { User } from '@/api/request/index';
const wallet = User.user;
export default {
	data() {
		return {
			wallet: {
				username: 123,
				money: 123.0,
				fund: 123.0,
				updateAt: 123123,
			},
			createWallet: {
				password: '',
				confirmPassword: '',
			},
		};
	},
	mounted() {
		wallet.wallet_info().then(res => {
			console.log(res);
			this.wallet = res.data;
			
		});
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
		updateUserWallet() {
			this.$message.error('充值失败');
		},
		createUserWallet(){
			if(this.createWallet.password != this.createWallet.confirmPassword){
				this.$message.error('两次密码不一致');
				return;
			}
			wallet.wallet_create(this.createWallet.password).then(res => {
				if(res.success){
					this.$message.success('创建成功');
					this.$router.push('/user/my/coin');
				}
			});
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

		.form {
			margin: 130px 80px 0 80px;
		}
	}
}
</style>
