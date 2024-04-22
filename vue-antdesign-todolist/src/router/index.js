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
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
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

	{
		path: '/marketing',
		name: 'marketing',
		layout: "dashboard",
		component: () => import('../views/marketing/Marketing'),
	},
	{
		path: '/sales',
		name: 'sales',
		layout: "dashboard",
		component: () => import('../views/sales/Sales'),
	},
	{
		path: '/depot',
		name: 'depot',
		layout: "dashboard",
		component: () => import('../views/depot/Depot'),
	},
	{
		path: '/references',
		name: 'references',
		layout: "dashboard",
		component: () => import('../views/references/References'),
	},

	{
		path: '/references/company',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/CompanyList'),
	},
	{
		path: '/references/create-company',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/CreateCompany'),
	},
	{
		path: '/references/update-company/:id',
		name: 'company',
		layout: "dashboard",
		component: () => import('../views/references/company/UpdateCompany'),
	},

	{
		path: '/references/person',
		name: 'person',
		layout: "dashboard",
		component: () => import('../views/references/person/PersonList'),
	},
	{
		path: '/references/create-person',
		name: 'person',
		layout: "dashboard",
		component: () => import('../views/references/person/CreatePerson'),
	},
	{
		path: '/references/update-person/:id',
		name: 'person',
		layout: "dashboard",
		component: () => import('../views/references/person/UpdatePerson'),
	},

	{
		path: '/references/product-group',
		name: 'product-group',
		layout: "dashboard",
		component: () => import('../views/references/product-group/ProductGroupList'),
	},
	{
		path: '/references/update-product-group/:id',
		name: 'update product-group',
		layout: "dashboard",
		component: () => import('../views/references/product-group/UpdateProductGroup'),
	},
	{
		path: '/references/create-product-group',
		name: 'create product-group',
		layout: "dashboard",
		component: () => import('../views/references/product-group/CreateProductGroup'),
	},

	{
		path: '/references/price-template',
		name: 'price-template',
		layout: "dashboard",
		component: () => import('../views/references/price-template/PriceTemplateList'),
	},
	{
		path: '/references/create-price-template',
		name: 'price-template',
		layout: "dashboard",
		component: () => import('../views/references/price-template/CreatePriceTemplate'),
	},
	{
		path: '/references/update-price-template/:id',
		name: 'price-template',
		layout: "dashboard",
		component: () => import('../views/references/price-template/UpdatePriceTemplate'),
	},

	{
		path: '/references/product',
		name: 'product',
		layout: "dashboard",
		component: () => import('../views/references/product/ProductList'),
	},
	{
		path: '/references/create-product',
		name: 'product',
		layout: "dashboard",
		component: () => import('../views/references/product/CreateProduct'),
	},
	{
		path: '/references/update-product/:id',
		name: 'product',
		layout: "dashboard",
		component: () => import('../views/references/product/UpdateProduct'),
	},

	{
		path: '/references/supplier',
		name: 'supplier',
		layout: "dashboard",
		component: () => import('../views/references/supplier/SupplierList'),
	},
	{
		path: '/references/create-supplier',
		name: 'supplier',
		layout: "dashboard",
		component: () => import('../views/references/supplier/CreateSupplier'),
	},
	{
		path: '/references/update-supplier/:id',
		name: 'supplier',
		layout: "dashboard",
		component: () => import('../views/references/supplier/UpdateSupplier'),
	},

	{
		path: '/references/salesman',
		name: 'salesman',
		layout: "dashboard",
		component: () => import('../views/references/salesman/SalesmanList'),
	},
	{
		path: '/references/create-salesman',
		name: 'salesman',
		layout: "dashboard",
		component: () => import('../views/references/salesman/CreateSalesman'),
	},
	{
		path: '/references/update-salesman/:id',
		name: 'salesman',
		layout: "dashboard",
		component: () => import('../views/references/salesman/UpdateSalesman'),
	},

	{
		path: '/references/depot',
		name: 'depot',
		layout: "dashboard",
		component: () => import('../views/references/depot/DepotList'),
	},
	{
		path: '/references/create-depot',
		name: 'depot',
		layout: "dashboard",
		component: () => import('../views/references/depot/CreateDepot'),
	},
	{
		path: '/references/update-depot/:id',
		name: 'depot',
		layout: "dashboard",
		component: () => import('../views/references/depot/UpdateDepot'),
	},

	{
		path: '/references/shop',
		name: 'shop',
		layout: "dashboard",
		component: () => import('../views/references/shop/ShopList'),
	},
	{
		path: '/references/create-shop',
		name: 'shop',
		layout: "dashboard",
		component: () => import('../views/references/shop/CreateShop'),
	},
	{
		path: '/references/update-shop/:id',
		name: 'shop',
		layout: "dashboard",
		component: () => import('../views/references/shop/UpdateShop'),
	},

	{
		path: '/references/pos',
		name: 'pos',
		layout: "dashboard",
		component: () => import('../views/references/pos/PosList'),
	},
	{
		path: '/references/create-pos',
		name: 'pos',
		layout: "dashboard",
		component: () => import('../views/references/pos/CreatePos'),
	},
	{
		path: '/references/update-pos/:id',
		name: 'pos',
		layout: "dashboard",
		component: () => import('../views/references/pos/UpdatePos'),
	},

	{
		path: '/references/cash-register',
		name: 'cash-register',
		layout: "dashboard",
		component: () => import('../views/references/cash-register/CashRegisterList'),
	},
	{
		path: '/references/create-cash-register',
		name: 'cash-register',
		layout: "dashboard",
		component: () => import('../views/references/cash-register/CreateCashRegister'),
	},
	{
		path: '/references/update-cash-register/:id',
		name: 'cash-register',
		layout: "dashboard",
		component: () => import('../views/references/cash-register/UpdateCashRegister'),
	},

	{
		path: '/sales/pos',
		name: 'POS',
		layout: "dashboard",
		component: () => import('../views/sales/POS'),
	},

	{
		path: '/depot/receipts',
		name: 'receipt',
		layout: "dashboard",
		component: () => import('../views/depot/receipt/ReceiptList'),
	},
	{
		path: '/depot/create-receipt',
		name: 'receipt',
		layout: "dashboard",
		component: () => import('../views/depot/receipt/CreateReceipt'),
	},
	{
		path: '/depot/update-receipt/:id',
		name: 'receipt',
		layout: "dashboard",
		component: () => import('../views/depot/receipt/UpdateReceipt'),
	},

	{
		path: '/depot/write-offs',
		name: 'write-off',
		layout: "dashboard",
		component: () => import('../views/depot/write-off/WriteOffList'),
	},
	{
		path: '/depot/create-write-off',
		name: 'write-off',
		layout: "dashboard",
		component: () => import('../views/depot/write-off/CreateWriteOff'),
	},
	{
		path: '/depot/update-write-off/:id',
		name: 'write-off',
		layout: "dashboard",
		component: () => import('../views/depot/write-off/UpdateWriteOff'),
	},

	{
		path: '/depot/recounts',
		name: 'recounts',
		layout: "dashboard",
		component: () => import('../views/depot/recount/RecountList'),
	},
	{
		path: '/depot/create-recount',
		name: 'recount',
		layout: "dashboard",
		component: () => import('../views/depot/recount/CreateRecount'),
	},
	{
		path: '/depot/update-recount/:id',
		name: 'recount',
		layout: "dashboard",
		component: () => import('../views/depot/recount/UpdateRecount'),
	},

	{
		path: '/marketing/price-list',
		name: 'prices',
		layout: "dashboard",
		component: () => import('../views/marketing/price/PriceList'),
	},
	{
		path: '/marketing/create-price',
		name: 'create-price',
		layout: "dashboard",
		component: () => import('../views/marketing/price/CreatePrice'),
	},
	{
		path: '/marketing/update-price/:id',
		name: 'update-price',
		layout: "dashboard",
		component: () => import('../views/marketing/price/UpdatePrice'),
	},


	{
		path: '/tools',
		name: 'product',
		layout: "dashboard",
		component: () => import('../views/tools/Tools'),
	},
	{
		path: '/tools/upload-product-list',
		name: 'product',
		layout: "dashboard",
		component: () => import('../views/tools/UploadProductsCsv'),
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
