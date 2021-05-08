<template>
    <div class="text-center">
        <v-pagination
            v-model="page"
            :length="page_length"
            @input="page_change"
        ></v-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            lists: [],
            viewLists: [],
            pageSize: 10,
        };
    },
    props: {
        page_length: Number,
    },
    methods: {
        page_change: function (num) {
            return this.$emit("page_change", num);
        },
        // go_prev_page() {
        //     this.pages["now"] =
        //         this.pages["now"] - 1 >= 0
        //             ? this.pages["now"] - 1
        //             : this.pages["now"];
        // },
        // go_next_page() {
        //     this.pages["now"] =
        //         this.pages["now"] + 1 <= this.pages["last"]
        //             ? this.pages["now"] + 1
        //             : this.pages["now"];
        // },
    },
};
</script>