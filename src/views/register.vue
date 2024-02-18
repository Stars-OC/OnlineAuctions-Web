<template>
	<div class="register">
		<el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="register-form">
			<h3 class="title">用户 注册</h3>
			<el-form-item prop="username">
				<el-input
					v-model="registerForm.username"
					type="text"
					size="large"
					auto-complete="off"
					placeholder="账号"
				>
					<template #prefix
						><el-icon class="el-input__icon input-icon"><UserFilled /></el-icon
					></template>
				</el-input>
			</el-form-item>
			<el-form-item prop="nickname">
				<el-input
					v-model="registerForm.nickname"
					type="text"
					size="large"
					auto-complete="off"
					placeholder="用户名"
				>
					<template #prefix
						><el-icon class="el-input__icon input-icon"><User /></el-icon
					></template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="registerForm.password"
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
			<el-form-item prop="confirmPassword">
				<el-input
					v-model="registerForm.confirmPassword"
					type="password"
					size="large"
					auto-complete="off"
					placeholder="确认密码"
				>
					<template #prefix
						><el-icon class="el-input__icon input-icon"><Lock /></el-icon
					></template>
				</el-input>
			</el-form-item>
			<el-form-item style="width: 100%">
				<el-button :loading="loading" size="large" type="primary" style="width: 100%" @click="register">
					<span v-if="!loading">注 册</span>
					<span v-else>注 册 中...</span>
				</el-button>
				<div style="float: right">
					<router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
				</div>
			</el-form-item>
		</el-form>
		<!--  底部  -->
		<div class="el-register-footer">
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
			registerForm: {
				username: '',
				nickname: '',
				password: '',
				confirmPassword: '',
			},
			registerRules: {
				username: [
					{ required: true, trigger: 'blur', message: '用户名不能为空' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		register() {
			if(this.registerForm.username == '' || this.registerForm.password == '' || this.registerForm.nickname == ''){
				this.$message.error('用户名或密码不能为空');
				return;
			}
			if(this.registerForm.password != this.registerForm.confirmPassword){
				this.$message.error('两次密码不一致');
				return;
			}
		
			this.loading = true;
			Auth.register(this.registerForm).then(res => {
				var userStore = useUserStore();
				if (res.success) {
					userStore.saveToken(res.data);
					this.$router.push({ name: 'login' });
					this.$message.success(res.msg)
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
.register {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('../assets/images/background.png');
	background-size: cover;
}
.title {
	margin: 0px auto 30px auto;
	text-align: center;
	color: #707070;
}

.register-form {
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
.register-tip {
	font-size: 13px;
	text-align: center;
	color: #bfbfbf;
}
.register-code {
	width: 33%;
	height: 40px;
	float: right;
	img {
		cursor: pointer;
		vertical-align: middle;
	}
}
.el-register-footer {
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
.register-code-img {
	height: 40px;
	padding-left: 12px;
}
</style>
