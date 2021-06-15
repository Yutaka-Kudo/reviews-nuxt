<template>
    <div v-show="seen_whole">
        <!-- <transition name="list_scroll"> -->

        <!-- エラー用 -->
        <div v-if="!media_data_list_by_store.length" class="get_failed">
            <b>
                データ取得中...<br /><br />
                画面が変わらない場合は<br />
                ホーム画面に戻りリロードしてください
            </b>
        </div>
        
        <v-card
            v-for="media_data in media_data_list_by_store"
            :key="media_data.id"
            class="item mb-15"
            elevation="3"
            outlines
            :loading="media_data['loading']"
            v-cloak
        >
            <div class="card_head d-flex flex-column align-center">
                <div
                    class="head_top d-flex flex-column align-center flex-sm-row justify-sm-center"
                >
                    <v-card-title
                        class="store_name text-h5 pb-1 pb-sm-0 d-flex flex-nowrap"
                    >
                        <span
                            :class="{ uber_limited: media_data['uber_only'] }"
                        ></span>
                        <Tooltips
                            :store_name="media_data[0].store.store_name"
                        />
                    </v-card-title>
                    <span
                        class="rate_num_total align-self-sm-end flex-sm-shrink-0 mr-sm-2"
                        >{{
                            media_data.total_rate == "0.0"
                                ? " -"
                                : media_data.total_rate
                        }}
                        <RateStar :value="media_data.total_rate" />
                    </span>
                </div>
                <span class="category">{{
                    media_data["category"] | category_view
                }}</span>
            </div>

            <div class="d-flex flex-wrap justify-sm-center">
                <v-card-subtitle
                    class="rate_by_media pb-1"
                    v-for="media_d in media_data"
                    :key="media_d.id"
                >
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-center">
                            <!-- mediaリンク -->
                            <!-- スマホからのgoogleリンクが変なので修正 -->
                            <div
                                v-if="
                                    media_d['media_type']['official_name'] ==
                                    'Google'
                                "
                            >
                                <p class="media_link d-sm-none">
                                    <a
                                        :href="`https://www.google.com/search?tbs=lf:1,lf_ui:9&tbm=lcl&q=千葉県船橋市+飲食店+${media_d['store']['store_name']}`"
                                        target="_blank"
                                    >
                                        {{
                                            media_d["media_type"][
                                                "official_name"
                                            ]
                                        }}
                                    </a>
                                </p>

                                <p class="media_link d-none d-sm-flex">
                                    <!-- リンクが無ければspanで -->
                                    <a
                                        v-if="media_d['url']"
                                        :href="media_d['url']"
                                        target="_blank"
                                    >
                                        {{
                                            media_d["media_type"][
                                                "official_name"
                                            ]
                                        }}
                                    </a>
                                    <span v-else>
                                        {{
                                            media_d["media_type"][
                                                "official_name"
                                            ]
                                        }}
                                    </span>
                                </p>
                            </div>
                            <div v-else>
                                <p class="media_link">
                                    <a :href="media_d['url']" target="_blank">{{
                                        media_d["media_type"]["official_name"]
                                    }}</a>
                                </p>
                            </div>
                            <!-- mediaリンク end -->

                            <!-- 件数 -->
                            <span class="review_count ml-2">{{
                                media_d["review_count"] | if_zero
                            }}</span>
                            <!-- 件数end -->
                        </div>

                        <!-- レート -->
                        <span
                            v-if="
                                media_d['review_count'] &&
                                (media_d['media_type']['official_name'] ==
                                    'Google' ||
                                    media_d['media_type']['official_name'] ==
                                        '食べログ' ||
                                    media_d['media_type']['official_name'] ==
                                        'UberEats' ||
                                    media_d['media_type']['official_name'] ==
                                        'ぐるなび')
                            "
                        >
                            {{ media_d["rate"] }}
                            <RateStar class="star" :value="media_d['rate']" />
                        </span>
                        <!-- レートend -->

                        <!-- 収集日 -->
                        <span
                            class="collected_date"
                            v-if="media_d['collected']"
                        >
                            収集日{{ media_d["collected"] }}
                        </span>
                        <!-- 収集日end -->
                    </div>
                </v-card-subtitle>
            </div>

            <!-- <p>新規順 content</p> -->
            <div v-for="content in content_list" :key="content.id">
                <v-divider
                    inset
                    v-if="content['store_id'] === media_data[0]['store']['id']"
                ></v-divider>
                <v-card-text
                    v-if="content['store_id'] === media_data[0]['store']['id']"
                    class="rev_item d-flex flex-column align-center flex-sm-row justify-sm-space-between"
                >
                    <span v-if="content['seen']" class="mini_name d-sm-none">
                        {{ media_data[0].store.store_name }}
                    </span>
                    <v-chip
                        class="rev_head d-sm-none mb-2 align-self-center"
                        :class="{
                            rev_head_opened: content['seen'] == true,
                        }"
                    >
                        <span class="review_date">{{
                            content["review_date"] | Ym
                        }}</span>
                        <span
                            class="rate ml-3"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ' ||
                                content['media_type'] == 'ぐるなび'
                            "
                            >{{ content["review_point"] | rate_for_star }}
                        </span>
                        <span
                            class="star"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ' ||
                                content['media_type'] == 'ぐるなび'
                            "
                        >
                            <RateStar :value="content['review_point']" />
                        </span>
                    </v-chip>
                    <v-card
                        class="rev_head d-none d-sm-flex flex-sm-column align-sm-center align-self-sm-start mr-3 flex-sm-shrink-0"
                        :class="{
                            'rev_head_opened mt-6': content['seen'] == true,
                        }"
                        height="auto"
                        width="110"
                        elevation="5"
                    >
                        <span class="review_date">{{
                            content["review_date"] | Ym
                        }}</span>
                        <span
                            class="rate ml-3"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ' ||
                                content['media_type'] == 'ぐるなび'
                            "
                            >{{ content["review_point"] | rate_for_star }}
                        </span>
                        <span
                            class="star"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ' ||
                                content['media_type'] == 'ぐるなび'
                            "
                        >
                            <RateStar :value="content['review_point']" />
                        </span>
                    </v-card>

                    <!-- 本文 -->
                    <div class="rev_content flex-sm-grow-1 flex-sm-shrink-1">
                        <div
                            class="rev_content_text"
                            @click="show_detail(content)"
                            v-if="!content['seen']"
                            :class="{
                                continue: content['content'].length > 100,
                            }"
                        >
                            {{ content["content"] | content_view }}
                        </div>

                        <v-expand-transition>
                            <div
                                v-show="content['seen']"
                                @click="close_detail(content)"
                            >
                                <div
                                    class="rev_content_text rev_content_text_detail"
                                >
                                    {{ content["content"] | trim }}
                                </div>
                            </div>
                        </v-expand-transition>
                    </div>

                    <b class="media_type align-self-end flex-sm-shrink-0">
                        {{
                            content["media_type"] == "ぐるなび"
                                ? "TripAdvisor"
                                : content["media_type"]
                        }}
                    </b>
                </v-card-text>
            </div>
        </v-card>
        <!-- </transition> -->
    </div>
</template>

<script>
import Tooltips from "~/components/Tooltips.vue";
export default {
    components: {
        Tooltips,
    },
    data() {
        return {
            scrollY: 0,
        };
    },
    props: {
        // store_list: Array,
        media_data_list_by_store: Array,
        content_list: Array,
        seen_whole: Boolean,
    },

    methods: {
        show_detail(content) {
            // console.log(content);
            content["seen"] = !content["seen"];

            // ヘッダーが降りてきたらstickyしてるやつも合わせて降ろす。
            let rev_head_opened_elems = document.getElementsByClassName(
                "rev_head_opened"
            );
            let mini_name_elems = document.getElementsByClassName("mini_name");
            const target = document.getElementsByClassName("v-app-bar")[0];

            let func = function () {
                let observer = new MutationObserver(function () {
                    if (
                        !document.getElementsByClassName(
                            "v-app-bar--hide-shadow"
                        )[0]
                    ) {
                        rev_head_opened_elems.forEach(function (elem) {
                            elem.classList.add("rev_head_opened_with_header");
                        });
                        mini_name_elems.forEach(function (elem) {
                            elem.classList.add("mini_name_with_header");
                        });
                    } else {
                        rev_head_opened_elems.forEach(function (elem) {
                            elem.classList.remove(
                                "rev_head_opened_with_header"
                            );
                        });
                        mini_name_elems.forEach(function (elem) {
                            elem.classList.remove("mini_name_with_header");
                        });
                    }
                });
                observer.observe(target, { attributes: true });
            };
            setTimeout(func, 5); // これないとgetElementsByClassNameの結果が取れない。多分クラスの変更に時間がかかる模様。
        },

        close_detail(content) {
            content["seen"] = !content["seen"];
        },
        // handle_scroll() {
        //     this.scrollY = window.scrollY;
        //     console.log(this.scrollY);
        // },
    },

    computed: {
        review_obj_list: function () {
            console.log("child compu");
            // return this.$store.getters["review_obj_list"];
            return this.$store.getters["store_list"];
        },
    },
    mounted: function () {
        // console.log(this.$vuetify.breakpoint);
        // window.addEventListener("scroll", this.handle_scroll);
    },

    filters: {
        // store_name_view(text) {
        //     return text.length > 28 ? text.slice(0, 28) + "..." : text;
        // },
        content_view(text) {
            return text.length > 100 ? text.slice(0, 100) + "..." : text;
        },
        rate_for_star(text) {
            return Number(text).toFixed(1);
        },
        category_view(text) {
            return text.join(" - ");
        },
        Ym(text) {
            return text.slice(0, -3);
        },
        if_zero(text) {
            return text == "0.0" || !text ? " -" : text;
        },
        trim(text) {
            return text.trim();
        },
    },
};
</script>

<style scoped>
.v-card__text {
    background-color: rgba(250, 250, 250, 0.8);
    /* color: white; */
}

.card_head {
    /* position: sticky;
    top: 10px;
    background-color: rgba(255, 255, 255, 0.7); */
}
.head_top {
    width: 100%;
}
.store_name {
    overflow: hidden;
}

.rate_num_total:before {
    content: "総合";
    font-size: 13px;
}
.category {
    font-size: 13px;
}
.media_link {
    text-align: center;
    margin-bottom: 0px;
}
.rate_by_media {
    display: inline-block;
}
.item {
    /* will-change: animation; */

    /* margin-bottom: 20px; */
    background-color: rgba(255, 255, 255, 0.85);
    animation: list-scroll 0.5s;
}
@keyframes list-scroll {
    0% {
        /* transform: translateX(100%); */
        opacity: 0;
    }
    100% {
        /* transform: translateX(0); */
        opacity: 1;
    }
}
.media_type:before {
    content: "by ";
    font-size: 13px;
}
.review_date:after {
    content: "月";
    font-size: 13px;
}
.review_count:after {
    content: "件";
    font-size: 13px;
}

.mini_name {
    background: #e0e0e0;
    border-radius: 8px;
    position: sticky;
    /* top: 100px; */
    top: 2px;
    transition: 0.2s 0.2s cubic-bezier(0.4, 0, 0.2, 1) top;
}
.mini_name_with_header {
    background: #e0e0e0;
    border-radius: 8px;
    position: sticky;
    /* top: 100px; */
    top: 82px;
}
.rev_head_opened {
    position: sticky;
    /* top: 100px; */
    top: 24px;
    transition: 0.2s 0.2s cubic-bezier(0.4, 0, 0.2, 1) top;
}
.rev_head_opened_with_header {
    position: sticky;
    /* top: 100px; */
    top: 99px;
}
.rev_content_text_detail {
    white-space: pre-line;
}
.media_type {
    flex-basis: auto;
}
.continue:after {
    display: inline-block;
    content: "続き";
    white-space: pre;
    font-size: 13px;
    background: #ff9f80;
    color: #fff;
    padding: 1px 5px 1px;
    margin-left: 5px;
    line-height: 13px;
    border-radius: 3px;
}

.uber_limited:before {
    display: inline-block;
    content: "Uber\A限定";
    white-space: pre;
    font-size: 13px;
    background: #ff9f80;
    color: #fff;
    padding: 1px 5px;
    margin: 0 5px;
    line-height: 13px;
    border-radius: 3px;
}

@media (max-width: 960px) {
}
@media screen and (max-width: 600px) {
    .rate_by_media {
        width: 50%;
    }
}

.list_scroll-enter-active {
    transition: all 3s;
}
.list_scroll-leave-active {
    transition: all 3s;
    /* position: absolute; */
}
.list_scroll-enter,
.list_scroll-leave-to {
    transform: translateX(120%);
    /* opacity: 0; */
}
</style>