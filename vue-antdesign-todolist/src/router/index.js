import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/products',
		name: 'Products',
		layout: "dashboard",
		component: () => import('../views/product/ProductList.vue'),
	},
	{
		path: '/edit-product/:id',
		name: 'UpdateProduct',
		layout: "dashboard",
		component: () => import('../views/product/UpdateProduct.vue'),
	},
	{
		path: '/product-report/:id',
		name: 'ProductReport',
		layout: "dashboard",
		component: () => import('../views/product/ProductReport.vue'),
	},
	{
		path: '/create-product',
		name: 'CreateProduct',
		layout: "dashboard",
		component: () => import('../views/product/CreateProduct.vue'),
	},
	{
		path: '/receipts',
		name: 'Receipts',
		layout: "dashboard",
		component: () => import('../views/receipt/ReceiptList.vue'),
	},
	{
		path: '/create-receipt',
		name: 'CreateReceipt',
		layout: "dashboard",
		component: () => import('../views/receipt/CreateReceipt.vue'),
	},
	{
		path: '/edit-receipt/:id',
		name: 'EditReceipt',
		layout: "dashboard",
		component: () => import('../views/receipt/UpdateReceipt.vue'),
	},
	{
		path: '/postings',
		name: 'PostingTable',
		layout: "dashboard",
		component: () => import('../views/posting/PostingList.vue'),
	},
	{
		path: '/create-posting',
		name: 'CreatePosting',
		layout: "dashboard",
		component: () => import('../views/posting/CreatePosting.vue'),
	},
	{
		path: '/edit-posting/:id',
		name: 'EditPosting',
		layout: "dashboard",
		component: () => import('../views/posting/UpdatePosting.vue'),
	},
	{
		path: '/full-report',
		name: 'FullReport',
		layout: "dashboard",
		component: () => import('../views/report/FullReport.vue'),
	},
	{
		path: '/barcode-tool',
		name: 'BarcodeTool',
		layout: "dashboard",
		component: () => import('../views/barcode-tool/CreateBarcodes.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('../views/auth/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/auth/Sign-Up.vue'),
	},
	{
		path: '/verify-email',
		name: 'Verify-email',
		meta: {
			layoutClass: 'layout-verify-email',
		},
		component: () => import('../views/auth/Verify-Email.vue'),
	},
	{
		path: '/forgot-password',
		name: 'forgot-password',
		meta: {
			layoutClass: 'layout-forgot-password-',
		},
		component: () => import('../views/auth/Forgot-Password'),
	},
	{
		path: '/forgot-password-verify',
		name: 'forgot-password-verify',
		meta: {
			layoutClass: 'layout-forgot-password-verify',
		},
		component: () => import('../views/auth/Forgot-Password-Verify'),
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		meta: {
			layoutClass: 'layout-reset-password',
		},
		component: () => import('../views/auth/Reset-Password'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
});

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/sign-up', '/sign-in', '/verify-email', '/forgot-password', '/forgot-password-verify', '/reset-password'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/sign-in');
	}

	next();
});

export default router;
