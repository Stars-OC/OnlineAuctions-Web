<template>
	<div>
		<menu-title></menu-title>
		<el-container>
			<el-header>
				<div class="search">
					<el-input placeholder="搜索你想看的物品" v-model="queryInfo.query" clearable @clear="getUserList">
						<template #prepend>
							<el-button @click="getUserList"
								><el-icon><search /></el-icon
							></el-button>
						</template>
						<template #append>
							<el-button>搜索</el-button>
						</template>
					</el-input>
				</div>
			</el-header>
			<el-main>
				<el-card class="filter">
					筛选：
					<el-row :gutter="10">
						<el-col :span="8">
							<el-checkbox-group v-model="checkList">
								<el-checkbox label="正在拍卖" />
								<el-checkbox label="火热场次" />
								<el-checkbox label="有保证金" />
							</el-checkbox-group>
						</el-col>
						<el-col :span="12" :offset="4">
							<span style="font-size: 14px; margin: 0 20px"> 时间选择: </span>
							<el-date-picker
								v-model="time"
								type="datetimerange"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								:default-time="defaultTime1"
							/>
						</el-col>
					</el-row>
				</el-card>
				<el-card class="main">
					<el-table :data="auctionList" style="width: 100%" max-height="57vh">
						<el-table-column label="拍卖场id" prop="auctionId"></el-table-column>
						<el-table-column label="货物id ">
							<template v-slot="scope">
								{{ scope.row.cargoId }}
								<el-button type="primary" circle size="mini">
									<el-icon> <Link /></el-icon>
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
						<el-table-column label="开始时间/结束时间" prop="time"></el-table-column>
						<el-table-column label="状态" prop="status"></el-table-column>
					</el-table>
				</el-card>
			</el-main>
		</el-container>
		<el-dialog title="商品详情" v-model="dialogVisible" width="60%" align-center>
			<cargo-info></cargo-info>
		</el-dialog>
		<el-button type="primary" @click="dialogVisible = true" >查看</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			time: 0,
			queryInfo: {
				query: '',
			},
			auctionList: [
				{
					auctionId: 2,
					cargoId: 1,
					startingPrice: 100.0,
					additionalPrice: 20.0,
					hammerPrice: 0.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					time: 0,
					status: 2,
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.el-header {
	height: 100px;
	.search {
		justify-content: center;
		align-items: center;
		margin-top: 2%;
		margin-bottom: 1%;
		margin-inline: 35%;
	}
}
.el-main {
	margin: 2% 20% 0 20%;
	.el-card {
		height: 100%;
	}
	.main {
		margin-top: 2%;
	}
}
</style>
