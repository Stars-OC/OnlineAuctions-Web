<template>
	<div class="container">
		<div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="商品名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>

				<el-form-item label="商品类型">
					<el-radio-group v-model="form.type">
						<el-radio label="古物"></el-radio>
						<el-radio label="限定物品"></el-radio>
						<el-radio label="普通物品"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品描述">
					<el-input type="textarea" v-model="form.description"></el-input>
				</el-form-item>
				<div style="text-align: center; margin: 30px 20% 20px 20%">
					<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px">上传图片</div>
					<el-upload
						v-model:file-list="form.resource.images"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</div>
				<span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="windowVisible = false">取消</el-button>
                </span>
				<el-dialog v-model="dialogVisible" append-to-body style="width: 40%; margin: auto">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CargoEdit',
	data() {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			form: {
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
		};
	},
	methods: {
		dataInit(data) {
			if (data) {
				this.form = data;
				console.info(data);
			}
		},
		handleRemove(uploadFile, uploadFiles) {
            // 默认会删
			console.log(uploadFiles);
            console.log(this.form.resource.images);
		},
		handlePictureCardPreview(uploadFile) {
			this.dialogImageUrl = uploadFile.url;
			this.dialogVisible = true;
		},
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
