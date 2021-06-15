<template>
    <v-app-bar
        :clipped-left="clipped"
        fixed
        dark
        app
        hide-on-scroll
        scroll-threshold="60"
        :height="searcher_seen ? '80' : '40'"
        class="head-bar"
    >
        <div class="header-wrap d-flex flex-column">
            <!-- <div class="flex-grow-1 d-flex flex-wrap"> -->
            <div class="header-top d-flex">
                <nuxt-link to="/">
                    <v-icon>mdi-home</v-icon>
                </nuxt-link>

                <!-- <v-spacer /> -->

                <v-toolbar-title v-html="title" class="title" />

                <!-- <v-spacer /> -->
                <div class="spacer_as_icon_width"></div>
            </div>

            <!-- v-ifだとエラー。不明 -->
            <!-- v-show="searcher_seen" が d-flexが入ってると効かない。:classでクラス自体を操作-->
            <transition name="appear">
                <div v-show="searcher_seen">
                    <v-form
                        @submit.prevent="store_submit"
                        class="search_box flex-grow-1 d-flex align-center"
                        v-cloak
                    >
                        <span class="re-search mr-1">再<br />検索</span>
                        <v-text-field
                            v-model.trim="search_word"
                            label="店名"
                            append-outer-icon="mdi-send"
                            @click:append-outer="store_submit"
                            clear-icon="mdi-close-circle"
                            clearable
                            dark
                            background-color="rgba(255, 255, 255, 0.2)"
                            hide-details
                            v-cloak
                        />
                        <span class="list_length ml-1" @click="store_submit">
                            <span v-if="filtered_store.length">
                                <b>{{ filtered_store.length }}</b> hit !!
                            </span>
                        </span>
                    </v-form>
                </div>
            </transition>
        </div>
    </v-app-bar>
    <!-- <v-spacer /> -->
    <!-- </div> -->
</template>

<script>
export default {
    props: {
        searcher_seen: Boolean,
        store_list: Array,
    },
    data() {
        return {
            clipped: false,
            // items: [
            //     {
            //         icon: "mdi-apps",
            //         title: "Welcome",
            //         to: "/",
            //     },
            //     {
            //         icon: "mdi-chart-bubble",
            //         title: "Inspire",
            //         to: "/inspire",
            //     },
            // ],
            title: "RESTAURary",

            search_word: "",
        };
    },

    created: function () {
        // console.log('99999999999');
    },
    mounted: function () {},

    methods: {
        store_submit(event) {
            if (this.search_word.length) {
                console.log(this.store_list);
                this.$store.commit("set_store_search_word", this.search_word);
                this.$store.commit("set_store_list", this.filtered_store);

                //ページ数、決定
                let page_length = Math.ceil(
                    this.filtered_store.length /
                        this.$store.getters["page_size"]
                );
                this.$store.commit("set_page_length", page_length);

                location.reload();
                // this.$router.push({ path: "store_list/" });
                // if (this.search_word.length == 0) {
                //     this.$store.commit("set_store_list", this.store_list);
                // } else {
                //     this.$store.commit("set_store_list", this.f_store_list_pure);
                // }
            }
        },
    },

    computed: {
        filtered_store: function () {
            // this.f_store_list_pure = [];
            let temp_list = [];
            if (!this.search_word) {
                return temp_list;
            } else {
                // カタカナ → ひらがな関数
                function kanaToHira(str) {
                    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
                        var chr = match.charCodeAt(0) - 0x60;
                        return String.fromCharCode(chr);
                    });
                }

                const search_word_hira = kanaToHira(
                    this.search_word.replaceAll(" ", "")
                );

                for (var i in this.store_list) {
                    // let origin_store_data = this.store_list[i];
                    let store_data = Object.assign({}, this.store_list[i]); // 複製
                    let name = store_data.store_name;
                    let hira_trans_name = kanaToHira(name);
                    let yomigana = store_data.yomigana || "";
                    let yomi_roma = store_data.yomi_roma || "";
                    if (
                        hira_trans_name
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(search_word_hira.toLowerCase()) != -1
                    ) {
                        // this.f_store_list_pure.push(origin_store_data);
                        temp_list.push(store_data);
                    } else if (
                        kanaToHira(yomigana)
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        // this.f_store_list_pure.push(origin_store_data);
                        temp_list.push(store_data);
                    } else if (
                        yomi_roma
                            .replaceAll(" ", "")
                            .toLowerCase()
                            .indexOf(this.search_word.toLowerCase()) != -1
                    ) {
                        // this.f_store_list_pure.push(origin_store_data);
                        temp_list.push(store_data);
                    }
                }
                return temp_list;
            }
        },
    },
    transition: {
        name: "appear",
        mode: "",
    },
};
</script>

<style scoped>
.head-bar {
    transition: height 0.6s, transform 0.2s;
}
.header-top {
    width: 93vw;
    justify-content: space-between;
}
.spacer_as_icon_width {
    width: 24px;
}
.title {
    /* position: absolute;
    left: 50%;
    transform: translateX(-50%); */
}

.appear-enter-active {
    transition: all 1s;
}
.appear-enter {
    transform: scaleY(0);
    /* transform: translateX(100px); */
}
/* .search_box {
    transition: all 1s;
    transform: scaleY();
} */
.re-search {
    display: inline-block;
    white-space: pre;
    font-size: 13px;
    background: #ffa080d7;
    color: #fff;
    padding: 1px 5px 1px;
    line-height: 16px;
    border-radius: 3px;
}

.list_length {
    width: 65px;
}
.list_length:hover {
    cursor: pointer;
}
</style>