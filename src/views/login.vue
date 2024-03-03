<template>
	<div class="login">
		<el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
			<h3 class="title">用户 登录</h3>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
					<template #prefix>
						<el-icon class="el-input__icon input-icon"><UserFilled /></el-icon
					></template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="loginForm.password"
					type="password"
					size="large"
					auto-complete="off"
					placeholder="密码"
				>
					<template #prefix
						><el-icon class="el-input__icon input-icon"><Lock /></el-icon
					></template>
				</el-input>
			</el-form-item>
			<el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
			<el-form-item style="width: 100%">
				<el-button :loading="loading" size="large" type="primary" style="width: 100%" @click="login">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
				<div style="float: right" v-if="register">
					<router-link class="link-type" :to="'/register'">立即注册</router-link>
				</div>
			</el-form-item>
		</el-form>
		<!-- 底部  -->
		<div class="el-login-footer">
			<span>Copyright © 2024-2024 All Rights Reserved.</span>
		</div>
	</div>
</template>

<script>
import { Auth } from '@/api/request';
import { useUserStore } from '@/store';
export default {
	data() {
		return {
			loading: false,
			register: true,
			loginForm: {
				username: '',
				password: '',
				rememberMe: false,
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
				password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
			},
		};
	},
	methods: {
		login() {
			if(this.loginForm.username == '' || this.loginForm.password == ''){
				this.$message.error('用户名或密码不能为空');
				return;
			}
			this.loading = true;
			Auth.login(this.loginForm).then(res => {
				var userStore = useUserStore();
				if (res.success) {
					userStore.saveToken(res.data);
					if (userStore.userInfo.role == 0) {
						this.$router.back(-1);
					} else if (userStore.userInfo.role != null) {
						this.$router.push({ name: 'user_manager' });
					}
				} else {
					this.$message.error(res.msg);
				}
			});
			this.loading = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('../assets/images/background.png');
	background-size: cover;
}
.title {
	margin: 0px auto 20px auto;
	text-align: center;
	color: #707070;
}

.login-form {
	border-radius: 6px;
	background: #ffffff;
	width: 400px;
	padding: 25px 25px 5px 25px;
	.el-input {
		height: 40px;
		input {
			height: 40px;
		}
	}
	.input-icon {
		height: 39px;
		width: 14px;
		margin-left: 0px;
	}
}
.login-tip {
	font-size: 13px;
	text-align: center;
	color: #bfbfbf;
}
.login-code {
	width: 33%;
	height: 40px;
	float: right;
	img {
		cursor: pointer;
		vertical-align: middle;
	}
}
.el-login-footer {
	height: 40px;
	line-height: 40px;
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: center;
	color: black;
	font-family: Arial;
	font-size: 12px;
	letter-spacing: 1px;
}
.login-code-img {
	height: 40px;
	padding-left: 12px;
}
</style>
