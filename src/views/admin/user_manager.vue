<template>
	<div class="container">
		<el-container>
			<el-aside class="aside" width="180px">
				<el-menu default-active="/admin/manager" :router="true">
					<el-menu-item index="/">
						<template #title>
							<span class="logo">Online-Auction</span>
						</template>
					</el-menu-item>
					<el-menu-item index="/admin/manager">
						<template #title>
							<el-icon><Management /></el-icon>用户管理
						</template>
					</el-menu-item>
					<el-menu-item index="/admin/manager/cargo">
						<template #title>
							<el-icon><Goods /></el-icon>货物管理
						</template>
					</el-menu-item>
					<el-menu-item index="/admin/manager/auction">
						<template #title>
							<el-icon><ShoppingCartFull /></el-icon>拍卖管理
						</template>
					</el-menu-item>
					<el-menu-item index="/admin/manager/setting">
						<template #title>
							<el-icon><Setting /></el-icon>系统设置
						</template>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- <el-container> -->
			<!-- 卡片视图区域 -->

			<el-main>
				<div class="header">
					<span class="title">用户管理</span>
				</div>
				<el-card>
					<el-row :gutter="12" style="padding: 20px 0">
						<el-col :span="5">
							<!-- 搜索与添加区域 -->
							<el-input
								placeholder="请输入用户名称"
								v-model="queryInfo.filter"
								clearable
								@clear="getUserList"
							>
								<template #append>
									<el-button @click="search">
										<el-icon><search /></el-icon>
									</el-button>
								</template>
							</el-input>
						</el-col>
						<el-col :span="6" :offset="5"> </el-col>
						<el-col :span="1" :offset="6">
							<el-button type="primary">添加用户</el-button>
						</el-col>
						<!-- <el-col :span="12" style="background-color: antiquewhite">123</el-col> -->
					</el-row>
					<!-- 用户列表区域  -->
					<el-table :data="userList" border stripe>
						<el-table-column type="index"></el-table-column>
						<el-table-column label="头像" prop="avatarUrl">
							<template #default="scope">
								<div v-if="scope.row.avatarUrl">
									<img
										:src="scope.row.avatarUrl"
										alt="图片"
										style="width: 50px; height: auto; display: inline"
									/>
								</div>
								<div style="display: inline-flex" v-else>无</div>
							</template>
						</el-table-column>
						<el-table-column label="用户id" prop="username"></el-table-column>
						<el-table-column label="名称" prop="nickname"></el-table-column>
						<el-table-column label="描述" prop="description"></el-table-column>
						<el-table-column label="职责" prop="role"></el-table-column>
						<!-- 后面直接处理 -->
						<el-table-column label="创建时间" prop="time"></el-table-column>
						<el-table-column label="钱包" width="66px">
							<template v-slot="scope">
								<!-- 修改按钮 -->
								<el-button v-model="scope.row.username" type="success" size="small"
									><el-icon><Coin /></el-icon
								></el-button>
							</template>
						</el-table-column>

						<el-table-column label="操作" width="130px">
							<template v-slot="scope">
								<!-- 修改按钮 -->
								<el-button type="primary" v-model="scope.row.username" size="small"
									><el-icon><edit /></el-icon
								></el-button>
								<!-- 删除按钮 -->
								<el-button type="danger" size="small"
									><el-icon><delete /></el-icon
								></el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 页面区域 -->
					<el-pagination
						:page-size="1"
						:pager-count="15"
						layout="prev, pager, next"
						:total="total"
						style="margin: 20px 0"
					/> </el-card
			></el-main>
			<!-- </el-container> -->
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			total: 10 / 15 + 1,
			queryInfo: {
				filter: '',
				type: '1',
			},
			userList: [
				{
					username: 123456,
					nickname: 'aaaa',
					description: 'aaa',
					avatarUrl:
						'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
					role: 5,
					time: 1706786651,
				},
				{
					username: 123,
					nickname: 'aaaa',
					description: 'aaa',
					avatarUrl: null,
					role: 3,
					time: 1706793944,
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.logo {
	font-size: 20px;
	font-weight: bold;
	justify-content: space-between;
}

.el-main {
	padding: 0;
	.el-card {
		padding: 0 20px 0;
	}
	.header {
		border: 1px solid #e4e7ed;
		height: 59px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 30px;
		.title {
			font-size: 20px;
			font-weight: bold;
		}
	}
}
.aside {
	padding: 0;
	.el-menu {
		height: 97vh;
		border: 1px solid #e4e7ed;
	}
}
.container {
	height: 100%;
}
</style>
