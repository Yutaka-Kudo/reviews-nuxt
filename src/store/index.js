export const state = () => ({
    area_search_word: [],
    store_search_word: [],

    area_list: [],
    store_list: [],
    // review_obj_list:[],
    media_data_list_by_store:[],
    content_list:[],
})

export const getters = {
    area_search_word: state => {
        return state.area_search_word
    },
    store_search_word: state => {
        return state.store_search_word
    },
    area_list: state => {
        return state.area_list
    },
    store_list: state => {
        return state.store_list
    },
    // review_obj_list: state => {
    media_data_list_by_store: state => {
        // return state.review_obj_list
        return state.media_data_list_by_store
    },
    content_list: state => {
        return state.content_list
    },
}

export const actions = {
    // countAction({ commit }) {
    //     commit('countUp')
    // }
}

export const mutations = {
    set_area_search_word(state, value) {
        state.area_search_word = value;
    },
    set_store_search_word(state, value) {
        state.store_search_word = value;
    },
    set_area_list(state, value) {
        state.area_list = value;
    },
    set_store_list(state, value) {
        state.store_list = value;
    },
    // set_review_obj_list(state, value) {
    set_media_data_list_by_store(state, value) {
        // state.review_obj_list = value;
        state.media_data_list_by_store = value;
    },
    set_content_list(state, value) {
        state.content_list = value;
    },
}