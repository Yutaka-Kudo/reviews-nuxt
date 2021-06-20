<template>
    <v-app dark>
        <!-- <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->

        <SearchBar :searcher_seen="searcher_seen" :store_list="basis_store_list" />

        <v-main>
            <!-- <v-container class="pa-0"> -->
            <nuxt />
            <!-- </v-container> -->
        </v-main>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
        >
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light> mdi-repeat </v-icon>
                    </v-list-item-action>
                    <v-list-item-title
                        >Switch drawer (click me)</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-footer :absolute="!fixed" app class="justify-space-between">
            <span>&copy; {{ new Date().getFullYear() }}</span>
            <a href="mailto:restaurary@gmail.com">contact</a>
        </v-footer>

    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: "mdi-apps",
                    title: "Welcome",
                    to: "/",
                },
                {
                    icon: "mdi-chart-bubble",
                    title: "Inspire",
                    to: "/inspire",
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "RESTAURary",
            searcher_seen: true,
            basis_store_list:[],

            m_adress: "restaurary@gmail.com"
        };
    },

    created() {
        this.set_listener();
    },

    mounted() {
        console.log(this.$store.getters["store_list"])
    },

    methods: {
        set_listener() {
            this.$nuxt.$on("update_header", this.extend_header);
        },
        extend_header(flg) {
            if (flg == "index") {
                this.searcher_seen = false;
            } else if (flg == "store_list") {
                this.basis_store_list = this.$store.getters["basis_store_list"]
                this.searcher_seen = true;
            }
        },
    },
};
</script>

<style scoped>
.v-application {
    background-image: url("@/assets/img/acquapazza.jpg");
    background-attachment: fixed;
    background-position: top;

    background-size: cover;
    /* height: 100%; */
    /* height: 100vh; */
    /* opacity: 0.5; */
    /* 必須 */
    position: relative;
    z-index: 0;
}
.v-application:before {
    /* background: inherit; */
    content: "";
    /* filter: blur(5px); */
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: -1;
}
</style>