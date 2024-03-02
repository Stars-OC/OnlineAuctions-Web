<template>
	<div>
		<menu-title></menu-title>
		<div class="main">
			<el-card class="info">
				拍卖场: {{ auctionId }}
				<div style="margin-top: 8px; font-size: 14px; font-weight: bold">
					起拍价： {{ auction.startingPrice }}
				</div>
				<div style="margin-top: 3px; font-size: 12px; color: #999">信息更新时间：{{ state.updateAt }}</div>
			</el-card>
			<cargo-info :cargoId="auction.cargoId"></cargo-info>
			<el-card class="operation">
				<el-row :gutter="20">
					<el-col :span="12">
						拍卖出价：
						<el-timeline style="margin-top: 15px">
							<el-timeline-item v-for="(log, index) in auctionLog" :key="index" :timestamp="log.createAt">
								用户：{{ log.bidder }} 出价： {{ log.price }} ¥
							</el-timeline-item>
						</el-timeline>
					</el-col>

					<el-col :span="12" class="price">
						<div class="addPrice">
							<div style="font-size: 14px; margin: 0 0 20px; font-weight: bold">
								当前价格： {{ state.balance }} ¥
								<div style="margin-top: 5px">加价幅度为： {{ auction.additionalPrice }} ¥</div>
							</div>

							<el-input-number
								v-model="addOperation.additionalPrice"
								:precision="2"
								:step="auction.additionalPrice"
								:min="auction.startingPrice"
								class="input-number"
							/>

							<el-button type="primary" class="button" round @click="addOperationHandler">加价</el-button>
							<div style="margin-top: 20px; font-size: 12px; color: red">
								拍卖结束时间：{{ state.endTime }} s
							</div>
						</div>
					</el-col>
				</el-row>
			</el-card>
		</div>
	</div>
</template>

<script>
import { Auction } from '@/api/request';
import DateUtils from '@/utils/DateUtils';
export default {
	data() {
		return {
			auctionId: this.$route.params.id,
			init: false,
			addOperation: {
				auctionId: this.$route.params.id,
				additionalPrice: 0,
			},
			state: {
				balance: 0.0,
				updateAt: 0,
				endTime: 0,
			},
			auction: {
				cargoId: 1,
				startingPrice: 120.0,
				additionalPrice: 10.0,
				hammerPrice: 130.0,
				startTime: 1707120630,
				status: 2,
			},
			auctionLog: [
				{
					auctionId: 5,
					bidder: 123456,
					price: 1750.0,
					createAt: 1707125736,
				},
				{
					auctionId: 5,
					bidder: 123456,
					price: 1900.0,
					createAt: 1707125736,
				},
				{
					auctionId: 5,
					bidder: 123456,
					price: 2150.0,
					createAt: 1707125736,
				},
			],
			pageInfo: {
				page: 1,
				limit: 5,
				filter: '',
			},
		};
	},
	mounted() {
		this.checkState();
		this.auctionInfo();
		this.getAuctionLogs();
		this.timer = setInterval(() => {
			this.checkState();
		}, 1000); // 更新频率为每秒
		this.init = true;
	},
	beforeDestroy() {
		// 在组件销毁前清除定时器，以防止内存泄漏
		clearInterval(this.timer);
	},
	beforeRouteLeave(to, from, next) {
		// 在用户离开页面时销毁定时器
		clearInterval(this.timer);
		next();
	},
	methods: {
		auctionInfo() {
			Auction.info(this.auctionId).then(res => {
				if (res.success) {
					var data = res.data;
					this.auction = data;
				}
			});
		},
		checkState() {
			Auction.operationInfo(this.auctionId).then(res => {
				console.log(res);
				if (res.success) {
					this.state = res.data;
				} else if (!this.init) {
					this.$message({
						message: res.msg,
						type: 'error',
					});
					this.goBack();
				}
			});
		},
		getAuctionLogs() {
			Auction.auctionLogs(this.auctionId, this.pageInfo).then(res => {
				if (res.success) {
					var data = res.data.data;
					data.forEach(item => {
						item.createAt = DateUtils.formatTimestamp(item.createAt);
					});
					this.auctionLog = data;
				}
			});
		},
		addOperationHandler() {
			console.log(this.addOperation);
			Auction.operationAdd(this.addOperation).then(res => {
				console.log(res);
				if (res.success) {
					this.$message({
						message: '操作成功',
						type: 'success',
					});
					this.checkState();
				} else {
					this.$message({
						message: res.msg,
						type: 'error',
					});
				}
			});
		},
		goBack() {
			this.$router.go(-1);
		},
	},
};
</script>

<style lang="scss" scoped>
.main {
	margin: 1% 20% 0 20%;
	.info {
		text-align: center;
		margin-bottom: 10px;
	}
	.operation {
		margin-top: 10px;
		.price {
			text-align: center;
		}
		.addPrice {
			padding: 10px 20px 10px 20px;
			margin: 75px 50px 10px 50px;
			border: 1px solid black;
			.input-number {
				width: 200px;
			}
			.button {
				margin: 0 15px;
				font-size: 15px;
				padding: 5px 30px;
			}
		}
	}
}
</style>
