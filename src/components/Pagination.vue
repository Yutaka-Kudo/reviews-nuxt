<template>
    <div class="text-center">
        <v-pagination
            v-model="page"
            :length="page_length"
            @input="page_change"
            total-visible=8
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

<style >
.v-pagination > li {
    align-items: center;
    display: flex;
    align-self: flex-end;
}
.v-pagination__more {
    margin: 0.3rem;
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    height: 13px;
    width: 32px;
    background: white;
        border-radius: 4px;
}
</style>