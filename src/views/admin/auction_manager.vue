<template>
	<div class="container">
		<el-container>
			<el-aside class="aside" width="180px">
				<el-menu default-active="/admin/manager/auction" :router="true">
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
					<span class="title">拍卖管理</span>
				</div>
				<el-card>
					<el-row :gutter="12" style="padding: 20px 0">
						<el-col :span="5"> </el-col>
						<el-col :span="6" :offset="5">
							<div>
								<el-radio-group v-model="queryInfo.type" @change="typeView">
									<el-radio label="1" size="large">全部</el-radio>
									<el-radio label="2" size="large">已发布</el-radio>
								</el-radio-group>
							</div>
						</el-col>

						<!-- <el-col :span="12" style="background-color: antiquewhite">123</el-col> -->
					</el-row>
					<!-- 用户列表区域  -->
					<el-table :data="auctionList" border stripe>
						<el-table-column type="index"></el-table-column>
						<el-table-column label="拍卖场id" prop="auctionId"></el-table-column>
						<el-table-column label="货物id">
							<template v-slot="scope">
								{{ scope.row.cargoId }}
								<el-button type="text" size="large" @click="checkCargoInfo(scope.row.cargoId)">
									<el-icon><Link /></el-icon>
								</el-button>
							</template>
						</el-table-column>
						<el-table-column label="起拍价" prop="startingPrice"></el-table-column>
						<el-table-column label="加价幅度" prop="additionalPrice"></el-table-column>
						<el-table-column label="落槌价">
							<template v-slot="scope">
								<div v-if="scope.row.hammerPrice != 0.0">
									{{ scope.row.hammerPrice }}
								</div>
								<div v-else>暂未出售</div>
							</template>
						</el-table-column>
						<!-- 后面直接处理 -->
						<el-table-column label="开始时间/结束时间" prop="time" width="300px"></el-table-column>
						<el-table-column label="状态" prop="status" width="50px"></el-table-column>
						<el-table-column label="操作" width="130px">
							<template v-slot="scope">
								<!-- 修改按钮 -->
								<el-button type="primary" @click="updateAuction(scope.row)" size="small">
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
		<el-dialog title="编辑拍卖" v-model="dialogVisible" width="50%" append-to-body destroy-on-close>
			<auction-edit :auction="this.auction" :operation="this.operation" @close="closeAuction"></auction-edit>
		</el-dialog>
		<el-dialog title="查看拍卖物品" v-model="cargoInfo" width="60%" append-to-body destroy-on-close>
			<cargo-info :cargoId="cargoId" @close="closeCargo"></cargo-info>
		</el-dialog>
	</div>
</template>

<script>
import { Auction } from '@/api/request';
import DateUtils from '@/utils/DateUtils';
export default {
	data() {
		return {
			total: 10 / 10,
			auction: {},
			operation: 'update',
			dialogVisible: false,
			cargoInfo: false,
			cargoId: null,
			queryInfo: {
				type: '1',
			},
			pageInfo: {
				page: 1,
				limit: 10,
				filter: '',
			},
			auctionList: [
				{
					auctionId: 1,
					cargoId: 1,
					startingPrice: 100.0,
					additionalPrice: 20.0,
					hammerPrice: 0.0,
					time: 0,
					status: 3,
				},
				{
					auctionId: 2,
					cargoId: 1,
					startingPrice: 100.0,
					additionalPrice: 20.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
			],
		};
	},
	mounted() {
		Auction.list(this.pageInfo).then(res => {
			this.dateChange(res);
		});
	},
	methods: {
		updateAuction(auction) {
			this.auction = auction;
			this.operation = 'update';
			this.cargoInfo = false;
			this.dialogVisible = true;
		},
		dateChange(res) {
			if (res.success) {
				this.total = res.data.count;
				res.data.data.forEach(item => {
					item.time =
						DateUtils.formatTimestamp(item.startTime) + ' - ' + DateUtils.formatTimestamp(item.endTime);
					item.startTime *= 1000;
					item.endTime *= 1000; 
				});
				this.auctionList = res.data.data;
			}
		},
		typeView() {
			switch (this.queryInfo.type) {
				case '1':
					Auction.list(this.pageInfo).then(res => {
						this.dateChange(res);
					});
					break;
				case '2':
					Auction.listPublished(this.pageInfo).then(res => {
						this.dateChange(res);
					});
					break;
			}
		},
		pageChange(num) {
			this.pageInfo.page = num;
			this.typeView();
		},
		checkCargoInfo(cargoId) {
			this.cargoId = cargoId;
			this.cargoInfo = true;
		},
		closeCargo(){
			this.cargoInfo = false;
		},
		closeAuction(){
			this.dialogVisible = false;
			this.typeView();
		}
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
