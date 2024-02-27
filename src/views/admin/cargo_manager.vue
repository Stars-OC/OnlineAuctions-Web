<template>
	<div class="container">
		<el-container>
			<el-aside class="aside" width="180px">
				<el-menu default-active="/admin/manager/cargo" :router="true">
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
					<span class="title">货物管理</span>
				</div>
				<el-card>
					<el-row :gutter="12" style="padding: 20px 0">
						<el-col :span="5">
							<!-- 搜索与添加区域 -->
							<el-input
								placeholder="请输入货物名称"
								v-model="queryInfo.filter"
								clearable
								@clear="getList"
							>
								<template #append>
									<el-button @click="search">
										<el-icon><search /></el-icon>
									</el-button>
								</template>
							</el-input>
						</el-col>
						<el-col :span="6" :offset="5">
							<div>
								<el-radio-group v-model="queryInfo.type">
									<el-radio label="1" size="large">全部</el-radio>
									<el-radio label="2" size="large">待审核</el-radio>
									<el-radio label="3" size="large">已发布</el-radio>
								</el-radio-group>
							</div>
						</el-col>
						<el-col :span="1" :offset="6">
							<el-button type="primary" @click="addCargo">添加货物</el-button>
						</el-col>
						<!-- <el-col :span="12" style="background-color: antiquewhite">123</el-col> -->
					</el-row>
					<!-- 用户列表区域  -->
					<el-table :data="cargoList" border stripe>
						<el-table-column type="index"></el-table-column>
						<el-table-column label="展示图" prop="image">
							<template #default="scope">
								<div v-if="scope.row.resource && scope.row.resource.images">
									<img
										:src="scope.row.resource.images[0]"
										alt="图片"
										style="width: 100px; height: auto"
									/>
								</div>
								<div style="display: inline-flex" v-else>无</div>
							</template>
						</el-table-column>
						<el-table-column label="id" prop="cargoId"></el-table-column>
						<el-table-column label="名称" prop="name"></el-table-column>
						<el-table-column label="描述" prop="description"></el-table-column>
						<el-table-column label="类型" prop="type"></el-table-column>
						<el-table-column label="出售者" prop="seller"></el-table-column>
						<!-- 后面直接处理 -->
						<el-table-column label="创建时间/修改时间" prop="time"></el-table-column>
						<el-table-column label="状态">
							<template v-slot="scope">
								<div>
									{{ scope.row.status }}
									<el-button
										style="margin-left: 20px"
										v-if="scope.row.status == 0"
										type="primary"
										@click="auditCargo(scope.row)"
										size="small"
									>
										<el-icon><Stamp /></el-icon>
									</el-button>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="130px">
							<template v-slot="scope">
								<!-- 修改按钮 -->
								<el-button type="primary" @click="updateCargo(scope.row)" size="small">
									<el-icon><edit /></el-icon>
								</el-button>
								<!-- 删除按钮 -->
								<el-button type="danger" size="small">
									<el-icon><delete /></el-icon>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 页面区域 -->
					<el-pagination
						:page-size="pageInfo.limit"
						:current-page="pageInfo.page"
						layout="prev, pager, next"
						:total="total"
						style="margin: 20px 0"
						@current-change="pageChange"
					/> </el-card
			></el-main>
			<!-- </el-container> -->
		</el-container>
		<el-dialog title="编辑拍卖物品" v-model="dialogVisible" width="50%" append-to-body destroy-on-close>
			<cargo-edit v-if="isAudit" :cargo="this.cargo" :operation="this.operation" @add="addEvent"></cargo-edit>
			<auction-edit v-else :auction="this.cargo" operation="audit" ></auction-edit>
		</el-dialog>
	</div>
</template>

<script>
import { Cargo } from '@/api/request';
import DateUtils from '@/utils/DateUtils';
export default {
	data() {
		return {
			cargo: null,
			operation: 'add',
			dialogVisible: false,
			total: 10 / 10,
			isAudit: false,
			queryInfo: {
				filter: '',
				type: '2',
			},
			cargoList: [
				{
					cargoId: 2,
					name: '114514',
					description: '123456',
					type: '0',
					seller: 123456,
					time: '1706850824/1706850824',
					resource: {
						images: [
							'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
						],
						video: [],
					},
					status: 0,
				},
				{
					cargoId: 14,
					name: '啊啊啊',
					description: '啊啊',
					resource: {
						images: [
							'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
						],
						videos: [],
					},
					type: '2',
					seller: 123456,
					createAt: 1708355816,
					updateAt: 1708355816,
					status: 0,
				},
			],
			pageInfo: {
				page: 1,
				limit: 10,
				filter: '',
			},
		};
	},
	mounted() {
		Cargo.listAudit(this.pageInfo).then(res => {
			this.dateChange(res);
		});
	},
	computed: {},
	methods: {
		addEvent() {
			this.search();
			this.dialogVisible = false;
		},
		getList() {
			this.queryInfo.filter = '';
		},
		pageChange(num) {
			this.pageInfo.page = num;
			this.search();
		},
		search() {
			var type = this.queryInfo.type;
			this.pageInfo.filter = this.queryInfo.filter;
			var pageInfo = this.pageInfo;

			switch (type) {
				case '1':
					Cargo.list(pageInfo).then(res => {
						this.dateChange(res);
					});
					break;
				case '2':
					Cargo.listAudit(pageInfo).then(res => {
						this.dateChange(res);
					});
					break;
				case '3':
					Cargo.listPublished(pageInfo).then(res => {
						this.dateChange(res);
					});
					break;
			}
			console.log(this.cargoList);
		},
		addCargo() {
			this.operation = 'add';
			this.cargoId = 0;
			this.dialogVisible = true;
		},
		updateCargo(cargo) {
			this.cargo = cargo;
			this.operation = 'update';
			this.dialogVisible = true;
		},
		auditCargo(cargo) {
			this.cargo = cargo;
			this.operation = 'audit';
			this.dialogVisible = true;
		},
		dateChange(res) {
			if (res.success) {
				this.total = res.data.count;
				res.data.data.forEach(item => {
					item.time =
						DateUtils.formatTimestamp(item.updateAt) + ' - ' + DateUtils.formatTimestamp(item.createAt);
				});
				this.cargoList = res.data.data;
			}
		},
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
