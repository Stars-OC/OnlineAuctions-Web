<template>
	<el-menu
		:default-active="activeIndex"
		class="title"
		mode="horizontal"
		:ellipsis="false"
		@select="handleSelect"
		text-color="#1E1E1E"
		active-text-color="#18B5D4"
		:router="true"
	>
		<el-menu-item index="/">
			<span class="logo">Online-Auction</span>
		</el-menu-item>

		<el-menu-item index="/"> 首页 </el-menu-item>
		<el-menu-item index="/auction"> 拍卖场 </el-menu-item>
		<el-menu-item index="/auction/later"> 近期拍卖 </el-menu-item>
		<el-menu-item index="/help"> 帮助中心 </el-menu-item>
		<div class="flex-grow" />
		<el-menu-item index="/user/my"> 我的 </el-menu-item>
		<el-menu-item index="/login"
			><el-button class="login-tag" type="primary" round>登录/注册</el-button></el-menu-item
		>
	</el-menu>
</template>

<script>
export default {
	name: 'MenuTitle',

	data() {
		return {};
	},
	mounted() {},
	methods: {},
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
