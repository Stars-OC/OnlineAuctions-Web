import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';
import Base64Utils from '@/utils/base64.js';

const user = {
	update(user) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.USER_UPDATE,
				method: 'POST',
				data: user,
			}).then(res => {
				resolve(res);
			});
		});
	},
    list(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.USER_LIST,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	wallet_info() {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.USER_WALLET_INFO,
				method: 'GET',
			}).then(res => {
				resolve(res);
			});
		});
	},
	wallet_create(password) {
		var basePassword = Base64Utils.encode(password);
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.USER_WALLET_CREATE + '?password=' + basePassword,
				method: 'POST',
			}).then(res => {
				resolve(res);
			});
		});
	},
	wallet_recharge(info) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.USER_WALLET_RECHARGE,
				method: 'POST',
				params: info,
			}).then(res => {
				resolve(res);
			});
		});
	},
    
};
export default user;
