<template>
	<div class="container">
		<div>
			<el-form ref="form" :model="form" label-width="80px">
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
				<div style="text-align: center; margin: 30px 20% 20px 20%">
					<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px">上传图片</div>
					<el-upload
						v-model:file-list="fileList"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:http-request="uploadImg"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="onSubmit">提交</el-button>
				</span>
				<el-dialog v-model="dialogVisible" append-to-body style="width: 40%; margin: auto">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
				<el-dialog v-model="auctionEdit" append-to-body style="width: 40%; margin: auto">
					<auction-edit></auction-edit>
				</el-dialog>
			</el-form>
		</div>
	</div>
</template>

<script>
import { Cargo, File } from '@/api/request';
export default {
	name: 'CargoEdit',
	data() {
		return {
			dialogImageUrl: '',
			dialogVisible: false,
			auctionEdit: false,
			isAudit: false,
			audit: false,
			fileList: [],
			form: {
				name: '',
				description: '',

				resource: {
					images: [],
					videos: [],
				},
			},
		};
	},
	props: ['cargo', 'operation'],
	mounted() {
		if (this.operation != 'add') {
			this.dataInit(this.cargo);
			this.imagesToFileList();
			console.log(this.form);
			console.log(this.fileList);
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
				console.info(data);
			}
		},
		uploadImg(params) {
			console.clear();
			const file = params.file,
				fileType = file.type,
				isImage = fileType.indexOf('image') != -1,
				isLt2M = file.size / 1024 / 1024 < 2;
			// 这里常规检验，看项目需求而定
			if (!isImage) {
				this.$message.error('只能上传图片格式png、jpg、gif!');
				return;
			}
			if (!isLt2M) {
				this.$message.error('只能上传图片大小小于2M');
				return;
			}
			// 根据后台需求数据格式
			const form = new FormData();
			// 文件对象
			form.append('file', file);
			File.upload_cargo_image(form).then(res => {
				if (res.success) {
					this.$message({
						message: '上传成功',
						type: 'success',
					});
					var data = res.data;
					const parts = data.split('/');
					const id = parts[parts.length - 1];

					this.fileList.forEach((item, index) => {
						if (item.status === 'ready') {
							this.fileList.splice(index, 1);
						}
					});
					this.fileList.push({
						name: id,
						url: data,
					});
				} else {
					this.$message({
						message: '上传失败',
						type: 'error',
					});
				}
			});
		},
		handleRemove(uploadFile, uploadFiles) {
			uploadFiles.filter(obj => obj.name !== uploadFile.name);
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
				default:
			}
			this.close();
		},

		fileListToImages() {
			this.form.resource.images = [];
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
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.dialog-footer {
		margin-top: 20px;
		float: right;
	}
}
</style>
