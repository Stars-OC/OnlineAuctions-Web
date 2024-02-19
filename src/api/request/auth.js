import axiosInstance from '@/utils/request.js';
import Base64Utils from '@/utils/base64.js';

import { ApiPath } from '../index';

/**
 * 授权验证接口
 */
const auth = {
	/**
	 * 登录
	 *
	 * @param user 用户名密码对象
	 */
	login(user) {
		return new Promise(resolve => {
			user.password = Base64Utils.encode(user.password);
			axiosInstance({
				url: ApiPath.LOGIN,
				method: 'POST',
				data: user,
			}).then(res => {
				resolve(res.data);
			});
		});
	},

	/**
	 * 注册
	 *
	 * @param user 用户名密码对象
	 */
	register(user) {
		return new Promise(resolve => {
			user.password = Base64Utils.encode(user.password);
			axiosInstance({
				url: ApiPath.REGISTER,
				method: 'POST',
				data: user,
			}).then(res => {
				resolve(res.data);
			});
		});
	},

	/**
	 * 登出
	 */
	logoff() {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.LOGOFF,
				method: 'DELETE',
			}).then(res => {
				resolve(res);
			});
		});
	},

	/**
	 * 验证 Token
	 */
	verify() {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.VERIFY,
				method: 'GET',
			}).then(res => {
				resolve(res);
			});
		});
	},
};

export default auth;
