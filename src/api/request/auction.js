import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';


const auction = {
	audit(auction) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_ADD,
				method: 'POST',
				data: auction,
			}).then(res => {
				resolve(res);
			});
		});
	},
    update(auction) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_UPDATE,
				method: 'POST',
				data: auction,
			}).then(res => {
				resolve(res);
			});
		});
	},
    info(auctionId) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_INFO + '/' + auctionId,
				method: 'GET',
			}).then(res => {
				resolve(res);
			});
		});
	},
	infoByCargoId(cargoId) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_INFO_BY_CARGOID + '/' + cargoId,
				method: 'GET',
			}).then(res => {
				resolve(res);
			});
		});
	},
    list(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_LIST,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},
    listPublished(pageInfo,type) {
		if(type){
			type = {
				type: type
			}
		}
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_LIST_PUBLISHED,
				method: 'GET',
				params: pageInfo,
				params: type,
			}).then(res => {
				resolve(res);
			});
		});
	},
	userList(pageInfo) {
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

export default auction;