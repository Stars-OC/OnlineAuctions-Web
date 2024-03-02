import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';


const cargo = {
	/**
	 * @description 添加拍卖物品
	 */
	add(cargo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_ADD,
				method: 'POST',
				data: cargo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	/**
	 * @description 更新拍卖物品
	 */
	update(cargo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_UPDATE,
				method: 'POST',
				data: cargo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	info(cargoId) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_INFO + '/' + cargoId,
				method: 'GET',
			}).then(res => {
				resolve(res.data);
			});
		});
	},
	/**
	 * @description 获取所有拍卖物品列表
	 */
	list(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_LIST,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	/**
	 * @description 获取 已发布 拍卖物品列表
	 */
	listPublished(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_LIST_PUBLISHED,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	/**
	 * @description 获取 拍卖物品审核列表
	 */
	listAudit(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_LIST_AUDIT,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
	/**
	 * @description 对拍卖物品进行审核
	 */
	audit(cargoId, isAudit) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_AUDIT + '/' + cargoId + '?audit=' + isAudit,
				method: 'GET',
			}).then(res => {
				resolve(res);
			});
		});
	},
	userList(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.CARGO_USER_LIST,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
};

export default cargo;
