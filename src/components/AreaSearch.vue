<template>
    <div>
        <!-- enter押してもブラウザロードしないように -->
        <v-form @submit.prevent="area_submit" class="area_wrap">
            <v-text-field
                v-model.trim="search_word"
                label="エリア"
                prepend-icon="mdi-earth-box-plus"
                append-outer-icon="mdi-send"
                @click:append-outer="area_submit"
                clear-icon="mdi-close-circle"
                clearable
                filled
            />

            <!-- インクリメンタルサーチ -->
            <ul v-for="(area_data, index) in filterd_area" :key="area_data.id">
                <li
                    class="kouho"
                    :class="index % 2 == 1 ? `isEven` : `noEven`"
                    @click="area_submit_by_incremental(area_data)"
                >
                    {{ area_data["area_name"] }}
                </li>
            </ul>
        </v-form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search_word: "",
        };
    },
    props: {
        area_list: { type: Array },
    },
    methods: {
        area_submit(event) {
            this.$emit("get_area_obj", this.filterd_area[0]);
            this.$store.commit(
                "set_area_search_word",
                this.filterd_area[0]["area_name"]
            );
            // 日本語入力中のkeycodeは229。そこで発火しないように
            // if (event.keyCode !== 229) {
            // }
            // なぜかこれ付けなくてもいける！！！！！
        },
        area_submit_by_incremental(area_obj) {
            this.$emit("get_area_obj", area_obj);
            this.$store.commit(
                "set_area_search_word",
                this.filterd_area[0]["area_name"]
            );
        },
    },
    computed: {
        filterd_area: function () {
            var f_area_list = [];
            if (!this.search_word) {
                return f_area_list;
            } else {
                for (var i in this.area_list) {
                    var area_data = this.area_list[i];
                    if (area_data.area_name.indexOf(this.search_word) != -1) {
                        f_area_list.push(area_data);
                    }
                }
                return f_area_list;
            }
        },
    },

    created: function () {
        this.search_word = this.$store.getters["area_search_word"].length
            ? this.$store.getters["area_search_word"]
            : "";
        console.log(this.search_word);
    },
};
</script>

<style scoped>
.area_wrap{
    margin-bottom: 40px;
}
.isEven {
    color: white;
    /* background: #ddd; */
    background: #757575;
    border-radius: 3px;
    width: max-content;
}
.isEven:hover {
    background: #fb8c00;
}
.noEven {
    width: max-content;
}
.noEven:hover {
    background: #ffcc80;
}
</style>