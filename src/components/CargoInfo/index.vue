<template>
	<div class="body">
		<el-card>
			<el-row :gutter="20">
				<el-col :span="7">
					<img :src="image" style="border: 3px solid #a5a4a4" class="image" width="350px" />
					<div>轮播</div>
				</el-col>
				<el-col :span="14" class="content">
					<div class="title">{{ cargo.name }}</div>
					<div class="description">{{ cargo.description }}</div>
					<div style="margin-top: 50px; font-size: 18px">详细信息：</div>
					<div class="id">商品id: {{ cargo.cargoId }}</div>
					<el-button type="primary" class="type" round>类型： {{ cargo.type }}</el-button>

					<div class="seller">卖家： {{ cargo.seller }}</div>

					<el-button type="danger" class="status" round>状态： {{ cargo.status }}</el-button>

					<div class="time">
						<div>更新时间： {{ cargo.updateAt }}</div>
						<div>创建时间： {{ cargo.createAt }}</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'CargoInfo',
	data() {
		return {
			image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
			cargo: {
				cargoId: 4,
				name: 'test-拍卖品一号',
				description: 'test.123456测试啊啊啊啊啊啊 ',
				resource: {
					image: [
						'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
					],
				},
				type: '0',
				seller: 123456,
				createAt: 1707116459,
				updateAt: 1707120658,
				status: 4,
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.body {
	.content {
		margin-left: 55px;
		.title {
			font-size: 20px;
			font-weight: bold;
		}
		.description {
			margin-top: 10px;
			color: #999;
			font-size: 16px;
		}
		.id {
			margin-top: 10px;
		}
		.time {
			margin: 40px 80px 0 130px;
		}
		.type {
			margin-top: 5px;
			margin-bottom: 5px;
		}
        .seller{
            margin-top: 5px;
            margin-bottom: 5px;
        }
		.status {
			margin-top: 5px;
			// background-color: red;
		}
	}
}
</style>
