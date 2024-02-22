import { ApiPath } from '../index';
import axiosInstance from '@/utils/request.js';


const auction = {
	add(auction) {
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
    listPublished(pageInfo) {
		return new Promise(resolve => {
			axiosInstance({
				url: ApiPath.AUCTION_LIST_PUBLISHED,
				method: 'GET',
				params: pageInfo,
			}).then(res => {
				resolve(res);
			});
		});
	},

};

export default auction;