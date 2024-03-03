<template>
	<div class="main">
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
				<div class="banner">
					<el-carousel trigger="click" height="300px">
						<el-carousel-item v-for="item in banners" :key="item">
							<img :src="item" class="image" />
							<h3 class="small justify-center" text="2xl">{{ item }}</h3>
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-header>
			<el-main>
				<div class="auction">
					<h2>精选专场</h2>
					<el-row :gutter="20">
						<el-col :span="6" v-for="index in cargoList.slice(0, 4)" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<img :src="index.resource.images[0]" class="image" />
								<div style="padding: 14px">
									<span>{{ index.name }}</span>
									<div class="bottom">
										<time class="time">{{ index.time }}</time>
										<el-button text class="button" @click="checkCargoInfo(index.cargoId)"
											>点击查看</el-button
										>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>

					<h2>历史好品</h2>
					<el-row :gutter="20">
						<el-col :span="8" v-for="index in cargoList.slice(4, 7)" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<img :src="index.resource.images[0]" class="image" style="height: 400px" />
								<div style="padding: 14px">
									<span>{{ index.name }}</span>
									<div class="bottom">
										<time class="time">{{ index.time }}</time>
										<el-button text class="button" @click="checkCargoInfo(index.cargoId)"
											>点击查看</el-button
										>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-button text class="more" @click="toMore">更多拍卖 点击查看</el-button>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { Cargo, Auction } from '@/api/request';
import router from '@/router';
import DateUtils from '@/utils/DateUtils';
export default {
	data() {
		return {
			queryInfo: {
				query: '',
			},
			banners: [
				'https://imgqn.epailive.com/cloud_60_ad_1709004506077.png',
				'https://imgqnb.epailive.com/cloud_60_ad_1709083841211.jpg',
				'https://imgqna.epailive.com/cloud_60_ad_1708767666782.png',
			],
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
		};
	},
	mounted() {
		Cargo.listPublished().then(res => {
			this.dateChange(res);
		});
	},
	methods: {
		dateChange(res) {
			if (res.success) {
				res.data.data.forEach(item => {
					if (!item.resource || item.resource.images.length == 0) {
						item.resource = {
							images: ['https://imgqna.epailive.com/cloud_40_78518_1708841542534.jpg'],
						};
					}
					item.time = DateUtils.formatTimestamp(item.createAt);
				});
				this.cargoList = res.data.data;
				console.log(this.cargoList);
			}
		},
		checkCargoInfo(cargoId) {
			Auction.infoByCargoId(cargoId).then(res => {
				if (res.success) {
					router.push({
						path: '/auction/info/' + res.data.auctionId,
					});
				} else {
					this.$message.error('该拍卖品已被下架');
				}
			});
		},
		toMore() {
			router.push({ name: 'auction_list' });
		},
	},
};
</script>

<style lang="scss" scoped>
.el-header {
	.banner {
		.demonstration {
			color: var(--el-text-color-secondary);
		}

		.el-carousel__item h3 {
			color: #475669;
			opacity: 0.75;
			line-height: 150px;
			margin: 0;
			text-align: center;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n + 1) {
			background-color: #d3dce6;
		}
	}
	.search {
		justify-content: center;
		align-items: center;
		margin-top: 2%;
		margin-bottom: 1%;
		margin-inline: 35%;
	}
}

.el-main {
	// background-color: aqua;
	margin: 20%;
	// margin-top: 2%;

	.auction {
		// width: 600px;
		time {
			font-size: 12px;
			color: #999;
		}

		.bottom {
			margin-top: 13px;
			line-height: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.button {
			padding: 0;
			min-height: auto;
		}

		.image {
			width: 100%;
			height: 300px;
			display: block;
		}
		.more {
			font-size: small;
			color: blue;
			margin-top: 10%;
			margin-inline: 40%;
		}
	}
}
</style>
