<template>
	<div class="common-layout">
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
						<el-col :span="6" v-for="(o, index) in 4" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<img
									src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
									class="image"
								/>
								<div style="padding: 14px">
									<span>{{ time }}</span>
									<div class="bottom">
										<time class="time">114514</time>
										<el-button text class="button">点击查看</el-button>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>

					<h2>历史好品</h2>
					<el-row :gutter="20">
						<el-col :span="8" v-for="(o, index) in 3" :key="index">
							<el-card :body-style="{ padding: '0px' }">
								<img
									src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
									class="image"
								/>
								<div style="padding: 14px">
									<span>{{ time }}</span>
									<div class="bottom">
										<time class="time">{{ currentDate }}</time>
										<el-button text class="button">点击查看</el-button>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-button text class="more">更多拍卖 点击查看</el-button>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
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
		};
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
