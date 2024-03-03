<template>
	<el-menu class="title" mode="horizontal" :ellipsis="false" text-color="#1E1E1E" :router="true">
		<el-menu-item index="/">
			<span class="logo">Online-Auction</span>
		</el-menu-item>

		<el-menu-item index="/"> 首页 </el-menu-item>
		<el-menu-item index="/auction"> 拍卖场 </el-menu-item>
		<el-menu-item index="/auction/later"> 近期拍卖 </el-menu-item>
		<el-menu-item index="/help"> 帮助中心 </el-menu-item>
		<div class="flex-grow" />
		<el-menu-item index="/admin/manager" v-if="isAdmin"> 管理系统 </el-menu-item>

		<el-menu-item>
			<el-button class="login-tag" v-if="!isLogin" type="primary" round @click="login">登录/注册</el-button>
			<el-button class="login-tag" v-else style="width: 50px" text @click="toMy">我的</el-button>
		</el-menu-item>
		<el-menu-item>
			<el-button class="login-tag" v-if="isLogin" style="width: 50px; margin-right: 20px" text @click="logoff"
				>退出登录</el-button
			>
		</el-menu-item>
	</el-menu>
</template>

<script>
import { useUserStore } from '@/store';

export default {
	name: 'MenuTitle',

	data() {
		return {
			isLogin: false,
			isAdmin: false,
		};
	},
	mounted() {
		var userStore = useUserStore();
		if (userStore.userInfo) {
			console.log(userStore.userInfo);
			this.isLogin = true;
			if (userStore.userInfo.role != 0) {
				this.isAdmin = true;
			}
			console.log(this.isLogin);
		}
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
		login() {
			this.$router.push('/login');
		},
		logoff() {
			var userStore = useUserStore();
			userStore.clearToken();
			this.$router.push('/login');
		},
	},
};
</script>

<style lang="scss" scoped>
.flex-grow {
	flex-grow: 1;
	// justify-content: flex-end;
}
.login-tag {
	justify-content: center;
	align-items: center;
	color: #000;
}
.logo {
	font-size: 20px;
	font-weight: bold;
}
.title {
	// margin: 0, 200px, 0, 200px;
	border-radius: 20px;
}
</style>
