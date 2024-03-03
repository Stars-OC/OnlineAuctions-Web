<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-upload
					class="avatar-uploader"
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				>
					<el-icon class="avatar-uploader-icon"><Plus /></el-icon>
				</el-upload>
				<el-form class="form">
					<el-form-item label="用户名">
						<el-input v-model="user.nickname" />
					</el-form-item>
					<el-form-item label="个性签名">
						<el-input v-model="user.description" />
					</el-form-item>
					<el-form-item label="注册时间">
						<el-input v-model="user.createAt" disabled />
					</el-form-item>
					<el-form-item label="用户组">
						<el-input v-model="user.role" disabled />
					</el-form-item>
					<el-form-item label="新密码">
						<el-input type="password" show-password v-model="user.password" />
					</el-form-item>
					<el-form-item label="确认新密码">
						<el-input type="password" show-password v-model="user.newPassword" />
					</el-form-item>
				</el-form>
				<div style="text-align: center">
					<el-button  type="primary" @click="updateUser">更新</el-button>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { useUserStore } from '@/store';
import { User } from '@/api/request/index';
const user = User.user;
import DateUtils from '@/utils/DateUtils';
var userStore = useUserStore();
export default {
	data() {
		return {
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
		};
	},
	mounted() {
		
		this.user = userStore.userInfo;
		this.user.createAt = DateUtils.formatTimestamp(userStore.userInfo.createAt);
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
		updateUser() {
			user.update(this.user).then(res => {
				if (res.success) {
					userStore.saveToken(res.data);
					this.$message.success('更新成功');
					console.log(userStore.userInfo);
					return
				}
			});
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
	margin: 0;
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
