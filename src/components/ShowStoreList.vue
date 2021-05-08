<template>
    <div>
        <v-card
            v-for="media_data in media_data_list_by_store"
            :key="media_data.id"
            class="item"
            elevation="3"
            outlines
            v-cloak
        >
            <div class="card_head">
                <v-card-title
                    class="store_name text-h5"
                >
                    <span
                        v-if="media_data['uber_only']"
                        class="uber_limited"
                    ></span>
                    <Tooltips :store_name="media_data[0].store.store_name" />
                </v-card-title>
                <span class="rate_num_total">{{
                    media_data.total_rate == "0.0"
                        ? " -"
                        : media_data.total_rate
                }}</span>
                <RateStar :value="media_data.total_rate" />
            </div>

            <v-card-subtitle
                class="rate_by_media"
                v-for="media_d in media_data"
                :key="media_d.id"
            >
                <p class="media_link">
                    <a :href="media_d['url']" target="_blank">{{
                        media_d["media_type"]["official_name"]
                    }}</a>
                </p>
                <p>
                    <span
                        v-if="
                            media_d['media_type']['official_name'] ==
                                'Google' ||
                            media_d['media_type']['official_name'] ==
                                '食べログ' ||
                            media_d['media_type']['official_name'] == 'UberEats'
                        "
                        >{{ media_d["rate"] }}
                        <RateStar class="star" :value="media_d['rate']"
                    /></span>

                    <span class="review_count">{{
                        media_d["review_count"] | if_zero
                    }}</span>
                </p>
            </v-card-subtitle>

            <!-- <p>新規順</p> -->
            <div v-for="content in content_list" :key="content.id">
                <v-divider></v-divider>
                <v-card-text
                    v-if="content['store_id'] === media_data[0]['store']['id']"
                    class="rev_item"
                >
                    <div class="rev_head">
                        <span class="review_date">{{
                            content["review_date"]
                        }}</span>
                        <span
                            class="star"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ'
                            "
                            >{{ content["review_point"] | rate_for_star }}
                        </span>
                        <span
                            class="star"
                            v-if="
                                content['media_type'] == 'Google' ||
                                content['media_type'] == '食べログ'
                            "
                        >
                            <RateStar :value="content['review_point']" />
                        </span>
                    </div>

                    <!-- 本文 -->
                    <div class="rev_content">
                        <div
                            class="rev_content_text"
                            @click="show_detail(content)"
                            v-if="!content['seen']"
                            :class="{
                                continue: content['content'].length > 120,
                            }"
                        >
                            {{ content["content"] | content_view }}
                        </div>

                        <v-expand-transition>
                            <div
                                v-show="content['seen']"
                                @click="show_detail(content)"
                            >
                                <div
                                    class="rev_content_text rev_content_text_detail"
                                >
                                    {{ content["content"] | trim }}
                                </div>
                            </div>
                        </v-expand-transition>
                    </div>

                    <span class="media_type">{{ content["media_type"] }}</span>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>

<script>
import Tooltips from "~/components/Tooltips.vue";
export default {
    components: {
        Tooltips,
    },
    props: {
        // store_list: Array,
        media_data_list_by_store: Array,
        content_list: Array,
    },

    methods: {
        show_detail(content) {
            content["seen"] = !content["seen"];
        },
    },

    computed: {
        review_obj_list: function () {
            console.log("child compu");
            // return this.$store.getters["review_obj_list"];
            return this.$store.getters["store_list"];
        },
    },
    mounted: function () {
        console.log("child mount");
        console.log(this.content_list);
        // console.log(this.media_data_list_by_store);
    },

    filters: {
        // store_name_view(text) {
        //     return text.length > 28 ? text.slice(0, 28) + "..." : text;
        // },
        content_view(text) {
            return text.length > 120 ? text.slice(0, 120) + "..." : text;
        },
        rate_for_star(text) {
            return Number(text).toFixed(1);
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
.store_name {
    display: inline-block;
}
.media_link {
    text-align: center;
    margin-bottom: 0px;
}
.rate_by_media {
    display: inline-block;
}
.item {
    margin-bottom: 20px;
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

.rate_num_total:before {
    content: "総合";
    font-size: 13px;
}

.rev_item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.rev_head {
    flex-shrink: 0;
    flex-basis: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
}
.rev_head span {
    /* display: block; */
}
.rev_content_text {
    flex-grow: 1;
    margin: 0 20px;
}
.rev_content_text_detail {
    white-space: pre-line;
}
.media_type {
    /* justify-self: flex-end; */
    flex-basis: auto;
    align-self: flex-end;
    flex-shrink: 0;
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
    padding: 1px 5px 1px;
    margin-left: 5px;
    line-height: 13px;
    border-radius: 3px;
}
</style>