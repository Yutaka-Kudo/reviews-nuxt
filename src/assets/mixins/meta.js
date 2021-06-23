export default {
    head() {
        return {
            title: this.meta.title,
            meta: [
                // SEO関連
                { hid: 'description', name: 'description', content: this.meta.siteDesc },
                // { hid: 'keywords', name: 'keywords', content: siteKeywords },

                // OGP関連
                // { hid: 'og:type', property: 'og:type', content: 'website' },
                // { hid: 'og:url', property: 'og:url', content: baseUrl },
                // { hid: 'og:title', property: 'og:title', content: siteName },
                { hid: 'og:description', property: 'og:description', content: this.meta.siteDesc },
                { hid: 'og:image', property: 'og:image', content: `${ogpImages}home.jpg` },
                { name: 'twitter:card', content: 'summary_large_image' },
                // { name: 'twitter:site', content: '@Twitter' },
                // { property: 'article:publisher', content: 'FacebookURL' },
                // { property: 'fb:app_id', content: 'FacebookAppID' },

            ],
        }
    }
}