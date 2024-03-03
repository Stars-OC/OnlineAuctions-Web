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
						<el-radio label="1">古物</el-radio>
						<el-radio label="2">限定物品</el-radio>
						<el-radio label="3">普通物品</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品描述">
					<el-input type="textarea" v-model="form.cargo.description"></el-input>
				</el-form-item>
				<el-form-item v-if="isAudit" label="审核状态">
					<el-switch
						style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
						@change="auditChange"
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
						:http-request="uploadImg"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</div>
				<el-dialog v-model="dialogVisible" append-to-body style="width: 40%; margin: auto">
					<img w-full :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>

				<div style="text-align: center; margin: 10px 20% 20px 20%; font-size: 18px">拍卖场修改</div>

				<el-form-item label="起拍价">
					<el-input style="width: 30%" v-model="form.auction.startingPrice" placeholder="请输入起拍价" />
				</el-form-item>
				<el-form-item label="加价幅度">
					<el-input style="width: 30%" v-model="form.auction.additionalPrice" placeholder="请输入加价幅度" />
				</el-form-item>
				<el-form-item label="拍卖时间">
					<el-col :span="8">
						<el-date-picker
							placeholder="开始时间"
							type="datetime"
							v-model="startTime"
							style="width: 100%"
							@change="handleStartTime"
						/>
					</el-col>
					<el-col :span="1" style="margin-left: 30px"> -</el-col>
					<el-col :span="8">
						<el-date-picker
							placeholder="结束时间"
							type="datetime"
							v-model="endTime"
							style="width: 100%"
							@change="handleEndTime"
						/>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="close">取消</el-button>
			</span>
		</div>
	</div>
</template>

<script>
import { Cargo, Auction } from '@/api/request';

export default {
	name: 'AuctionEdit',
	data() {
		return {
			startTime: 0,
			endTime: 0,
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
				
			],
		};
	},
	props: ['auction', 'operation'],
	mounted() {
		this.dataInit(this.auction);
	},
	methods: {
		dataInit(data) {
			console.log(data);
			if (data.auctionId) {
				Cargo.info(data.cargoId).then(res => {
					if (!res.resource) {
						res.resource = {
							images: [],
						};
					}

					this.form.auction = data;
					this.startTime = data.startTime ;
					this.endTime = data.endTime;
					this.form.auction.startTime = this.startTime/1000;
					this.form.auction.endTime = this.endTime/1000;
					this.form.cargo = res.data;
					this.imagesToFileList();
				});

				
			} else if (this.operation == 'audit') {
				if (!data.resource) {
					data.resource = {
						images: [],
					};
				}
				this.isAudit = true;
				this.form.cargo = data;
				this.form.auction = {};
				this.imagesToFileList();
			}
			
			console.info(this.form);
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
						if (item.status === "ready") {
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
				case 'update':
					Auction.update(this.form).then(res => {
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
					Cargo.audit(this.form.cargo.cargoId, this.form.cargo.status);
					Auction.audit(this.form).then(res => {
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
			this.form.cargo.resource.images = [];
			if (this.fileList.length == 0) {
				this.form.cargo.resource.images = [];
				return;
			}
			for (var i = 0; i < this.fileList.length; i++) {
				this.form.cargo.resource.images[i] = this.fileList[i].url;
			}
		},
		imagesToFileList() {
			this.fileList = [];
			for (var i = 0; i < this.form.cargo.resource.images.length; i++) {
				this.fileList[i] = {
					name: i + '.jpeg',
					url: this.form.cargo.resource.images[i],
				};
			}
		},
		auditChange() {
			this.form.cargo.status = this.audit? 1: -1;
		},
		handleStartTime(date){
			if(!date) return;
			this.form.auction.startTime = date.getTime()/1000;
		},
		handleEndTime(date){
			if(!date) return;
			this.form.auction.endTime = date.getTime()/1000;
		},
		close(){
			this.$emit('close');
		}
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
