import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/nomal-play',
			name: 'Nomal Play',
			component: () => import('../views/NomalPlay.vue')
		},
		{
			path: '/rule',
			name: 'Rule',
			component: () => import('../views/rule.vue')
		},
	]
})

export default router
