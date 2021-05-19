<template>
    <v-app dark>
        <v-main>
            <!-- <v-container> -->
                <nuxt />
            <!-- </v-container> -->
        </v-main>
        
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            fixed: false,
        };
    },
};
</script>

<style scoped>
.v-application{
	/* background-color: rgba(118, 118, 255, 0.2); */
}
</style>