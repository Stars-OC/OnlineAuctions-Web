import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';

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
    
};
export default user;
