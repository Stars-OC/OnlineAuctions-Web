<template>
	<div>
		<el-container>
			<el-main class="main">
				<el-table :data="auctionList" stripe style="width: 100%">
					<el-table-column fixed prop="startTime" label="时间" width="150" />
					<el-table-column prop="auctionId" label="拍卖场id" />
					<el-table-column prop="cargoId" label="货物id" />
					<el-table-column prop="startingPrice" label="起拍价" />
					<el-table-column prop="hammerPrice" label="加价幅度" />
					<el-table-column label="落槌价">
						<template v-slot="scope">
							<div v-if="scope.row.hammerPrice != 0.0">
								{{ scope.row.hammerPrice }}
							</div>
							<div v-else>暂未出售</div>
						</template>
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" />

					<el-table-column prop="status" label="状态" />
					<el-table-column fixed="right" label="操作">
						<template #default="scope">
							<el-button link type="primary" size="small" >查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small background layout="prev, pager, next" :total="total" />
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			auctionList: [
				{
					auctionId: 3,
					cargoId: 4,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					startTime: 1707120630,
					endTime: 1707121087,
					status: 3,
				},
				{
					auctionId: 5,
					cargoId: 6,
					startingPrice: 120.0,
					additionalPrice: 10.0,
					hammerPrice: 130.0,
					startTime: 1707120630,
					endTime: 1707223132,
					status: 2,
				},
			],
			total: 10 / 15 + 1,
		};
	},
	methods: {
		toMy() {
			this.$router.push('/user/my');
		},
	},
};
</script>

<style lang="scss" scoped>
.main {
	margin: 0;
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
