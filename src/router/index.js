import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/home.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/register.vue'),
		},
		{
			path: '/user',
			name: 'user',
			component: () => import('../views/user/my.vue'),
			children: [
				{
					path: 'my',
					name: 'my',
					component: () => import('../views/user/user_my.vue'),
				},
				{
					path: 'order',
					name: 'order',
					component: () => import('../views/user/user_order.vue'),
				},
				{
					path: 'auction',
					name: 'auction',
					component: () => import('../views/user/user_auction.vue'),
				},
				{
					path: 'cargo',
					name: 'cargo',
					component: () => import('../views/user/user_cargo.vue'),
				},
				{
					path: 'coin',
					name: 'coin',
					component: () => import('../views/user/user_coin.vue'),
				},
				{
					path: 'setting',
					name: 'setting',
					component: () => import('../views/user/user_setting.vue'),
				},
			],
		},

		{
			path: '/admin/manager',
			name: 'UserManager',
			component: () => import('../views/admin/user_manager.vue'),
		},
		{
			path: '/admin/manager/cargo',
			name: 'CargoManager',
			component: () => import('../views/admin/cargo_manager.vue'),
		},
		{
			path: '/admin/manager/auction',
			name: 'AuctionManager',
			component: () => import('../views/admin/auction_manager.vue'),
		},
		{
			path: '/admin/manager/setting',
			name: 'ManagerSetting',
			component: () => import('../views/admin/manager_setting.vue'),
		},
	],
});

export default router;
