<template>
	<div>
		<menu-title></menu-title>
		<el-container>
			<el-main class="main">
				<el-row :gutter="25">
					<el-col :span="24">
						<el-card class="header">
							<el-row :gutter="25">
								<el-col :span="4">
									<img class="avatar" :src="user.avatarUrl" />
								</el-col>
								<el-col :span="10" style="margin-top: 16px">
									{{ user.nickname }}
									<span style="font-size: 14px; color: #999999; margin-top: 20px; font-style: italic"
										>({{ user.username }})</span
									><br />
									<div style="font-size: 14px; color: #999999; margin-top: 30px">
										{{ user.description }}
									</div>
								</el-col>
								<el-col :offset="7" :span="1" style="margin-top: 16px">
									<el-button type="primary" @click="toMy">编辑</el-button>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="7">
						<el-card class="aside"
							><el-menu :default-active="active" :router="true">
								<el-menu-item index="/user/my">
									<template #title>
										<el-icon><Avatar /></el-icon>个人信息
									</template>
								</el-menu-item>
								<el-menu-item index="/user/coin">
									<template #title>
										<el-icon><coin /></el-icon>钱包管理
									</template>
								</el-menu-item>
								<el-menu-item index="/user/cargo">
									<template #title>
										<el-icon><Goods /></el-icon>我的货物
									</template>
								</el-menu-item>
								<el-menu-item index="/user/auction">
									<template #title>
										<el-icon><ShoppingCartFull /></el-icon>我的拍卖
									</template>
								</el-menu-item>
								<el-menu-item index="/user/order">
									<template #title>
										<el-icon><Van /></el-icon>我的订单
									</template>
								</el-menu-item>
								<el-menu-item index="/user/setting">
									<template #title>
										<el-icon><Setting /></el-icon>系统设置
									</template>
								</el-menu-item>
							</el-menu></el-card
						>
					</el-col>
					<el-col :span="17">
						<el-card class="body">
							<router-view></router-view>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: false,
			user: {
				username: 123123123123456,
				nickname: '用户名',
				description: '我是12315645645645645645646谁',
				createAt: 123132,
				avatarUrl:
					'https://bpic.588ku.com/element_origin_min_pic/19/10/09/d452ed4244c8905649194043ef1749f9.jpg',
				role: 3,
				password: '',
				newPassword: '',
			},
			active: '/user/my',
		};
	},
	methods: {
		toMy() {
			this.active = '/user/my';
			this.$router.push('/user/my');
		},
		updateUser() {
			console.log(this.user);
		},
		handleAvatarSuccess(res, file) {
			this.user.avatarUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.main {
	background-color: rgb(240, 240, 240);
	margin: 20px 20% 20px 20%;
	height: 89vh;
	.header {
		height: 20vh;
		.avatar {
			width: 120px;
			height: auto;
			margin-top: 10px;
			margin-left: 20px;
			border-radius: 50%; // 将头像框变为圆形
			overflow: hidden; // 隐藏超出头像框的部分
		}
	}
	.aside {
		margin-top: 20px;
		height: 62vh;
		.el-menu {
			margin: 0;
			height: 59vh;
			border: 1px solid #e4e7ed;
		}
	}
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

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	cursor: pointer;
	position: relative;
	overflow: hidden;
	border-radius: 50%;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 120px;
	height: 120px;
	text-align: center;
}
</style>
