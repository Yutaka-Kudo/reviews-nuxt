<template>
    <v-row>
        <v-col class="text-center">
            <img src="/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote class="blockquote">
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                    <small>
                        <em>&mdash;John Johnson</em>
                    </small>
                </footer>
            </blockquote>
        </v-col>
    </v-row>
</template>

<script>
export default {
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

.scroll-enter-active {
    /* animation: scroll-in 0.8s; */
    transform-origin: left;
    transition: all 1s 1s;
}
.scroll-enter{
    transform: translateX(100%);
}
.scroll-enter-to{
    transform: translateX(0px);
}
.scroll-leave-active {
    /* animation: scroll-in 0.8s; */
    transform-origin: left;
    transition: all 1s;
    position: absolute;
}
.scroll-leave{
    /* transform: translateX(1); */
}
.scroll-leave-to{
    transform: translateX(-100%);
}

</style>