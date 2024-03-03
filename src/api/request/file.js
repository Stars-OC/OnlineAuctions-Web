import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';

const file = {
	upload_cargo_image(file) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.FILE_UPLOAD + '/image/cargo',
				method: 'POST',
				data: file,
				headers: { 'content-type': 'multipart/form-data' },
			}).then(res => {
				resolve(res);
			});
		});
	},
	upload_avatar(file) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.FILE_UPLOAD_AVATAR,
				method: 'POST',
				data: file,
				headers: { 'content-type': 'multipart/form-data' },
			}).then(res => {
				resolve(res);
			});
		});
	},
};

export default file;