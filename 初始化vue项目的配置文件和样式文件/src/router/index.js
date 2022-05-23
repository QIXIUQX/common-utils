import Vue from "vue";
import VueRouter from "vue-router";
import {edit} from "./edit";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/index"
	},
	...edit,
];

const router = new VueRouter({
	// mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	let matched = to.matched;
	matched.forEach((item) => {
		if (item.path === to.fullPath) {
			document.title = item.meta.title;
		}
	});
	next();
});

export default router;
