import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
require('dotenv').config()

// meta
const lang = 'ja'
const siteName = '飲食店口コミ総合まとめ RESTAURary ~レストラリー~'
const siteDesc = '飲食店総合口コミまとめサイト レストラン・居酒屋・飲食店・デリバリーの口コミ・レビューを最新順でCheck！お近くのレストランはもちろん、デリバリー専門店も検索可能。気になってるお店の使える情報をさくっとGET！Special Thanks各グルメサイト'
const siteKeywords = 'レストラン,飲食店,居酒屋,グルメ,口コミ,レビュー'

// OGP関連
// path
const baseHost = process.env.BASE_HOST || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/' //ベースディレクトリをgenerate時に変更できるようにする
const baseUrl = baseHost + baseDir
const ogpImages = baseUrl + 'img/ogp/'

// pwa
const shortName = 'RESTAURary'

export default {
	router: {
		// base: '/nuxt/'
		base: baseDir,//ベースディレクトリをgenerate時に変更できるようにする

		// extendRoutes(routes, resolve) {
		// 	routes.push({
		// 		path: '*',
		// 		component: resolve(__dirname, 'reviews_nuxt/pages/index.vue')
		// 	})
		// }
	},

	// Target: https://go.nuxtjs.dev/config-target
	// ssr: true,
	target: 'static',
	// target: 'server',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		htmlAttrs: {
			lang: lang,
			prefix: 'og: http://ogp.me/ns#',
		},
		titleTemplate: `%s - ${siteName}`,
		// title: 'RESTAURARY',
		meta: [
			{ charset: 'utf-8' },
			// { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			// { name: 'format-detection', content: 'telephone=no, email=no, address=no' },

			// SEO関連
			{ hid: 'description', name: 'description', content: siteDesc },
			{ hid: 'keywords', name: 'keywords', content: siteKeywords },

			// OGP関連
			{ hid: 'og:site_name', property: 'og:site_name', content: siteName },
			{ hid: 'og:type', property: 'og:type', content: 'website' },
			{ hid: 'og:url', property: 'og:url', content: baseUrl },
			{ hid: 'og:title', property: 'og:title', content: siteName },
			{ hid: 'og:description', property: 'og:description', content: siteDesc },
			{ hid: 'og:image', property: 'og:image', content: `${ogpImages}home.jpg` },
			{ name: 'twitter:card', content: 'summary_large_image' },
			// { name: 'twitter:site', content: '@Twitter' },
			// { property: 'article:publisher', content: 'FacebookURL' },
			// { property: 'fb:app_id', content: 'FacebookAppID' },

		],
		link: [
			// favicon
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'apple-touch-icon', sizes: '180x180', href: 'apple-touch-icon.png' },

			// pwa splash screens
			// Doc: https://appsco.pe/developer/splash-screens
			{ href: 'iphone5_splash.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'iphone6_splash.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'iphoneplus_splash.png', media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)', rel: 'apple-touch-startup-image' },
			{ href: 'iphonex_splash.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)', rel: 'apple-touch-startup-image' },
			{ href: 'iphonexr_splash.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'iphonexsmax_splash.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)', rel: 'apple-touch-startup-image' },
			{ href: 'ipad_splash.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'ipadpro1_splash.png', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'ipadpro3_splash.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
			{ href: 'ipadpro2_splash.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' }
		],
		script: [
			// lodash
			{ src: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js" },

			// polyfills ※キャッシュ例のために記載
			{ src: '//polyfill.io/v2/polyfill.min.js?features=WebAnimations,IntersectionObserver' },
		],
	},



	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"animate.css/animate.compat.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		// サーバーサイドでは使用できないのでssrはfalseにすること
		{ src: '~/plugins/persistedstate.js', ssr: false }
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
		// '@nuxtjs/proxy',

		// ↓ 配列の最後でsitemapモジュールを宣言
		'@nuxtjs/sitemap',

		// Docs: https://github.com/nuxt-community/gtm-module
		'@nuxtjs/gtm',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// baseURL: 'http://127.0.0.1:8000',
		baseURL: 'https://yk-restaurant-reviews-api.cyou',
		// baseURL: 'https://restaurant-reviews21.herokuapp.com/api/',
		// proxy: true,
		// prefix: '/api',
		// headers: {
		// 	common: {
		// 	}
		// }
	},
	// proxy: {
	// 	'/api': {
	// 		target: 'https://yk-restaurant-reviews-api.cyou/',
	// 		// pathRewrite: { '^/api': '', },
	// 	},
	// },

	sitemap: {
		hostname: "https://restaurary.com/",

		exclude: [
			// '/admin/**',
		],
		// ↓ 動的なルーティングで生成したページは明示的に宣言
		async routes() {
			// '/kind/apple',
			// '/kind/banana',
			return await axios.get('https://yk-restaurant-reviews-api.cyou/api/area')
				.then(res => {
					return res.data.map(area => `/${area.id}/ranking/`)
				})
		}
	},

	gtm: {
		id: process.env.GTM_ID,
		pageTracking: true,
		enabled: true,
		// pageViewEventName: 'nuxtRoute', //変更する場合
	},
	//   // 動的変数を使う場合（本番と分ける時など）には追加
	//   publicRuntimeConfig: {
	// 	gtm: {
	// 	  id: process.env.GTM_ID,
	// 	  pageTracking: true
	// 	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			name: siteName,
			lang: lang,
			short_name: shortName,
			// title: 'demo',
			// 'og:title': 'demo',
			description: siteDesc,
			// 'og:description': 'demoサイトです',
			theme_color: '#ffffff',
			background_color: '#ffffff',
			display: 'standalone',
		},
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

	// // 使えるかわからないがpayload付き
	// generate: {
	// 	routes() {
	// 		return axios.get('https://yk-restaurant-reviews-api.cyou/api/area').then(res => {
	// 			return res.data.map(area => {
	// 				return {
	// 					route: `/${area.id}/ranking`,
	// 					payload: area
	// 				}
	// 			})
	// 		})
	// 	}
	// },

	// pageTransition: {
	// 	name: 'page',
	// 	mode: 'out-in',
	// 	appear: true,
	// 	beforeEnter(el) {
	// 		console.log('Before enter...');
	// 	}
	// },

	vue: {
		devtools: true,
	},
	srcDir: 'src/',  //srcディレクトリにまとめて整理
	loading: './components/Loading.vue',
}
