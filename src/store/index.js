import { defineStore } from 'pinia';

const TOKEN = 'token';
const token = localStorage.getItem(TOKEN);

/**
 * 解析 JWT 中的用户信息
 * @param token Base64Url
 * @returns
 */
function resolveToken(token) {
	const claims = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
	const userInfo = JSON.parse(decodeURIComponent(escape(window.atob(claims))));
	userInfo.token = token;

	return userInfo;
}

export const useUserStore = defineStore('userInfo', {
	state() {
		const token = localStorage.getItem(TOKEN);
		return {
			userInfo: token == null ? null : resolveToken(token),
		};
	},
	getters: {
		isLoggedIn() {
			return this.userInfo != null;
		},
	},
	actions: {
		saveToken(token) {
			localStorage.setItem(TOKEN, token);
			this.userInfo = resolveToken(token);
		},
		clearToken() {
			localStorage.removeItem(TOKEN);
			this.userInfo = null;
		},
	},
});
