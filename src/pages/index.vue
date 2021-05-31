<template>
    <div class="bg">
        <div
            class="pt-16 pr-5 pl-5 d-flex flex-column align-center flex-md-row align-md-start search_list_wrap"
        >
            <AreaSearch :area_list="area_list" @get_area_obj="get_area_obj" />
            <StoreSearch :store_list="store_list" @get_ref="get_ref" />
            <!-- <template> </template> -->
        </div>
    </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import AreaSearch from "~/components/AreaSearch.vue";
import StoreSearch from "~/components/StoreSearch.vue";
import { gsap } from "gsap";

export default {
    components: {
        Logo,
        VuetifyLogo,
        AreaSearch,
        StoreSearch,
    },
    // layout: "index",
    data() {
        return {
            area_list: [],
            store_list: [],
            review_obj_list: [],
            ref: "",
            // bg_img: require("@/assets/img/salad.jpg"),
        };
    },

    async fetch({ store, $axios }) {
        const res = await $axios.get("area/").catch(function (e) {
            console.log(e);
        });
        store.commit("set_area_list", res.data);
    },

    async asyncData({ $axios, $store }) {
        console.log(
            `I am rendered on the ${process.client ? "client" : "server"}`
        );

        // console.log(res.data);
        // return { area_list: res.data };
    },

    created: async function () {
        if (process.server) {
            // console.log('serrrrrrrrrr');
        }
        if (process.client) {
            // console.log('cliennnnnnn');
            this.area_list = this.$store.getters["area_list"];
        }

        // const res = await this.$axios.get("area/").catch(function (e) {
        //     console.log(e);
        // });
        // this.$store.commit("set_area_list", res.data);
        // this.area_list = res.data
        // console.log(this.area_list);
    },

    mounted() {
        // gsap.to(".hello", { rotation: 27, x: 100, duration: 1 });
        // gsap.to(".hello", { x: 100, duration: 3 });
    },

    // ページ帰還時にリストを保持 いらないかも
    // mounted: function () {
    //     this.store_list = this.$store.getters["basis_store_list"].length
    //         ? this.$store.getters["basis_store_list"]
    //         : [];
    // },

    methods: {
        // area_idからstoreのリストを取る
        get_area_obj: function (obj) {
            let that = this;
            console.log(obj.id, obj.area_name);

            // create_store_list
            this.$axios
                .get(`stores?area=${obj.id}`)
                .then(function (res) {
                    that.store_list = res.data;
                })
                .catch(function (e) {
                    console.log(e);
                });

            this.ref.focus(); // 店名入力フォームにフォーカス

            // this.$store.commit(`set_basis_store_list`, that.store_list);
        },

        get_ref: function (obj) {
            this.ref = obj;
        },
    },
    transition: {
        // name:"bounce"
        // name: "blind",
        name: "scroll",
        // mode: "in-out",
        // mode: "out-in",
        mode: "",
    },
};
</script>

<style scoped>
.bg {
    /* height: 100%; */
    height: calc(100vh - 40px);
}
.search_list_wrap {
    height: calc(100vh - 40px);
    /* height: 100vh; */
    /* overflow: scroll; */
}
.search_list_wrap::-webkit-scrollbar {
    display: none;
}


.scroll-enter-active {
    /* animation: scroll-in 0.8s; */
    /* transform-origin: left; */
    transition: all 1s;
}

.scroll-leave-active {
    /* animation: scroll-in 0.8s; */
    /* transform-origin: left; */
    transition: all 1s;
    position: absolute;
}
.scroll-enter,
.scroll-leave-to {
    /* transform: translateX(-120%); */
}

.scroll-leave {
    /* transform: translateX(0px); */
}
</style>