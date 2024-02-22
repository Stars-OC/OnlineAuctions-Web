<template>
	<div class="container">
		<div>
			<el-form ref="form" :model="form" label-width="80px">
				<div style="text-align: center; margin: 0px 20% 10px 20%; font-size: 18px">
					商品 {{ form.auction.cargoId }} 修改
				</div>
				<el-form-item label="商品名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>

				<el-form-item label="商品类型">
					<el-radio-group v-model="form.type">
						<el-radio label="1">古物</el-radio>
						<el-radio label="2">限定物品</el-radio>
						<el-radio label="3">普通物品</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品描述">
					<el-input type="textarea" v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item v-if="isAudit" label="审核状态">
					<el-switch
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
						change="auditChange"
						v-model="audit"
					/>
				</el-form-item>
				<div style="text-align: center; margin: 30px 20% 20px 20%">
					<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px">上传图片</div>
					<el-upload
						v-model:file-list="fileList"
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
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="windowVisible = false">取消</el-button>
			</span>
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
						images: [],
						videos: [],
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
			dialogImageUrl: '',
			dialogVisible: false,
			auctionEdit: false,
			isAudit: false,
			audit: false,
			fileList: [
				{
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				},
			],
		};
	},
	props: ['auction', 'operation'],
	mounted() {
		console.log(this.auction);
		console.log(this.operation);
		if (this.operation == 'update') {
			this.dataInit(this.auction);
			this.imagesToFileList();
		}else{
			this.dataInit(this.auction);
			this.imagesToFileList();
		}
	},
	methods: {
		dataInit(data) {
			if (data) {
				if (!data.resource) {
					data.resource = {
						images: [],
					};
				}
				this.form = data;
				if (this.operation == 'audit') this.isAudit = true;
				console.info(data);
			}
		},
		handleRemove(uploadFile, uploadFiles) {
			// 默认会删
			// console.log(uploadFile);
			// console.log(uploadFiles);
			// console.log(this.form.resource.images);
		},
		handlePictureCardPreview(uploadFile) {
			this.dialogImageUrl = uploadFile.url;
			this.dialogVisible = true;
		},
		onSubmit() {
			this.fileListToImages();
			switch (this.operation) {
				case 'add':
					Cargo.add(this.form).then(res => {
						if (res.success) {
							this.$message({
								message: '添加成功',
								type: 'success',
							});
							this.$emit('add', this.form);
						} else {
							this.$message({
								message: '添加失败',
								type: 'error',
							});
						}
					});
					break;
				case 'update':
					Cargo.update(this.form).then(res => {
						if (res.success) {
							this.$message({
								message: '修改成功',
								type: 'success',
							});
						} else {
							this.$message({
								message: '修改失败',
								type: 'error',
							});
						}
					});
					break;
				case 'audit':
					Cargo.audit(this.form.cargoId, this.audit);

					Cargo.update(this.form).then(res => {
						if (res.success) {
							this.$message({
								message: '修改成功',
								type: 'success',
							});
						} else {
							this.$message({
								message: '修改失败',
								type: 'error',
							});
						}
					});
					break;
				default:
			}
		},

		fileListToImages() {
			if (this.fileList.length == 0) {
				this.form.resource.images = [];
				return;
			}
			for (var i = 0; i < this.fileList.length; i++) {
				this.form.resource.images[i] = this.fileList[i].url;
			}
		},
		imagesToFileList() {
			this.fileList = [];
			for (var i = 0; i < this.form.resource.images.length; i++) {
				this.fileList[i] = {
					name: i + '.jpeg',
					url: this.form.resource.images[i],
				};
			}
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
