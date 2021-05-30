import colors from 'vuetify/es5/util/colors'

// const baseDir = process.env.BASE_DIR || '/' //ベースディレクトリをgenerate時に変更できるようにする

export default {
	router: {
		// base: '/nuxt/'
		// base: baseDir,//ベースディレクトリをgenerate時に変更できるようにする
	},
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - reviews_nuxt',
		title: 'reviews_nuxt',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		],
		script: [
			// lodash
			{ src: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js" }
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"animate.css/animate.compat.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// baseURL: 'http://127.0.0.1:8000/api/',
		// baseURL: 'https://restaurant-reviews21.herokuapp.com/api/',
		// baseURL: 'http://34.145.97.214/api/',
		baseURL: 'https://yk-restaurant-reviews-api.cyou/api/',
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			// dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				},
				light: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				},
			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			plugins: [
				[
					"@babel/plugin-proposal-private-methods",
					{
						"loose": true
					}
				]
			]
		},
		transpile: ['gsap', 'gsap/Draggable'],
	},
	vue: {
		devtools: true,
	},
	srcDir: 'src/',  //srcディレクトリにまとめて整理
	// pageTransition: {
	// 	name: 'page',
	// 	mode: 'out-in',
	// 	appear: true,
	// 	beforeEnter(el) {
	// 		console.log('Before enter...');
	// 	}
	// },

}
