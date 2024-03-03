<template>
	<div class="xtx-pay-page">
		<menu-title></menu-title>
		<div class="container">
			<!-- 付款信息 -->
			<div class="pay-info">
				<img class="icon" src="@/assets/images/success.svg" />
				<div class="tip">
					<p>订单提交成功！请尽快完成支付。</p>

					<p v-if="countdown > -1">
						支付还剩 <span>{{ countdown }} s</span>, 超时后将取消订单
					</p>

					<p v-else>订单已经超时</p>
				</div>

				<div class="amount">
					<span>应付总额：</span>
					<span>¥{{ money }}</span>
				</div>
			</div>
			<!-- 付款方式 -->
			<div class="pay-type">
				<p class="head">选择以下支付方式付款</p>
				<div class="item">
					<p>支付平台</p>
					<a class="btn wx" href="javascript:;"></a>
					<a class="btn alipay" href="javascript:;"></a>
				</div>

				<div class="item">
					<p>支付方式</p>
					<a class="btn" href="javascript:;" @click="method">余额支付</a>
					<a class="btn" href="javascript:;">工商银行</a>
					<a class="btn" href="javascript:;">建设银行</a>
					<a class="btn" href="javascript:;">农业银行</a>
					<a class="btn" href="javascript:;">交通银行</a>
				</div>
			</div>
			<div class="pay-password">
				<el-input
					v-if="select"
					type="password"
					placeholder="请输入支付密码"
					v-model="password"
					style="width: 13%"
				></el-input>
				<el-input
					v-else
					disabled
					type="password"
					placeholder="请输入支付密码"
					v-model="password"
					style="width: 13%"
				></el-input>
				<el-button type="primary" @click="pay" style="margin-left: 30px">立即支付</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import { User } from '@/api/request';
const order = User.order;
export default {
	data() {
		return {
			orderId: this.$route.params.id,
			select: false,
			countdown: 132,
			money: 130,
			password: '',
		};
	},
	mounted() {
		order.info(this.orderId).then(res => {
			if (res.success) {
				this.money = res.data.balance;
				this.countdown = res.data.createAt - Date.now() / 1000 - 30 * 60;
				this.timer = setInterval(() => {
					this.TimeChange();
				}, 1000); // 更新频率为每秒
			}
		});
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
		method() {
			this.select = true;
			this.$message.success('你选择了余额支付，请支付');
		},
		pay() {
			if (this.select) {
				var order = {
					orderId: this.orderId,
					password: this.password,
				};
				order.pay(order).then(res => {
					if (res.success) {
						this.$message.success('支付成功');
						this.$router.go(-1);
					} else {
						this.$message.error('支付失败');
					}
				});
			} else {
				this.$message.error('请选择支付方式');
			}
		},
		TimeChange() {
			--this.countdown;
			if (this.countdown > -1) {
				this.$message.error('支付失败，该订单不存在');
				this.$router.go(-1);
				return;
			}
		},
	},
};
</script>
<style scoped lang="scss">
.pay-info {
	background: #fff;
	display: flex;
	align-items: center;
	height: 240px;
	padding: 0 80px;
	.icon {
		background-image: '';
		font-size: 80px;
		color: #1dc779;
	}
	.tip {
		padding-left: 10px;
		flex: 1;
		p {
			&:first-child {
				font-size: 20px;
				margin-bottom: 5px;
			}
			&:last-child {
				color: #999;
				font-size: 16px;
			}
		}
	}
	.amount {
		span {
			&:first-child {
				font-size: 16px;
				color: #999;
			}
			&:last-child {
				color: red;
				font-size: 20px;
			}
		}
	}
}
.pay-type {
	margin-top: 20px;
	background-color: #fff;
	padding-bottom: 70px;
	p {
		line-height: 70px;
		height: 70px;
		padding-left: 30px;
		font-size: 16px;
		&.head {
			border-bottom: 1px solid #f5f5f5;
		}
	}
	.btn {
		width: 150px;
		height: 50px;
		border: 1px solid #e4e4e4;
		text-align: center;
		line-height: 48px;
		margin-left: 30px;
		color: #666666;
		display: inline-block;
		&.active,
		&:hover {
			border-color: red;
		}
		&.alipay {
			background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat
				center / contain;
		}
		&.wx {
			background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat
				center / contain;
		}
		&.ye {
		}
	}
}
.pay-password {
	text-align: center;
}
</style>
