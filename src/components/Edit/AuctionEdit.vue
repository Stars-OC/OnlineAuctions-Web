<template>
	<div class="container">
		<div>
			<el-form ref="form" :model="form" label-width="80px">
				<div style="text-align: center; margin: 0px 20% 10px 20%; font-size: 18px">
					商品 {{ form.auction.cargoId }} 修改
				</div>
				<el-form-item label="商品名称">
					<el-input v-model="form.cargo.name"></el-input>
				</el-form-item>

				<el-form-item label="商品类型">
					<el-radio-group v-model="form.cargo.type">
						<el-radio label="古物"></el-radio>
						<el-radio label="限定物品"></el-radio>
						<el-radio label="普通物品"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品描述">
					<el-input type="textarea" v-model="form.cargo.description"></el-input>
				</el-form-item>
				<div style="text-align: center; margin: 30px 20% 20px 20%">
					<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px">上传图片</div>
					<el-upload
						v-model:file-list="form.cargo.resource.images"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</div>
				<el-dialog v-model="dialogVisible" append-to-body style="width: 40%; margin: auto">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>

				<div style="text-align: center; margin: 10px 20% 20px 20%; font-size: 18px">拍卖场修改</div>

				<el-form-item label="起拍价">
					<el-input style="width: 30%" v-model="form.auction.startingPrice" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="加价幅度">
					<el-input style="width: 30%" v-model="form.auction.additionalPrice" placeholder="Please input" />
				</el-form-item>
				<el-form-item label="拍卖时间">
					<el-col :span="8">
						<el-date-picker
							placeholder="开始时间"
							type="datetime"
							v-model="form.auction.startTime"
							style="width: 100%"
						/>
					</el-col>
					<el-col :span="1" style="margin-left: 30px"> -</el-col>
					<el-col :span="8">
						<el-date-picker
							placeholder="结束时间"
							type="datetime"
							v-model="form.auction.endTime"
							style="width: 100%"
						/>
					</el-col>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AuctionEdit',
	data() {
		return {
			form: {
				cargo: {
					name: '',
					description: '',
					resource: {
						images: [
							{
								name: 'food.jpeg',
								url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
							},
							{
								name: 'food2.jpeg',
								url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
							},
							{
								name: 'food2.jpeg',
								url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
							},
							{
								name: 'food2.jpeg',
								url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
							},
						],
					},
				},
				auction: {
					cargoId: 0,
					startingPrice: 0.0,
					additionalPrice: 0.0,

					startTime: 0,
					endTime: 0,
				},
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
