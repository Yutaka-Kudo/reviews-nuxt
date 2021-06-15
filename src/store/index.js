export const state = () => ({
    area_search_word: [],
    store_search_word: [],

    area_list: [],
    basis_store_list: [],
    store_list: [],
    // review_obj_list: [],
    
    page_length:[],
    page_size:[],
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
    basis_store_list: state => {
        return state.basis_store_list
    },
    store_list: state => {
        return state.store_list
    },
    // review_obj_list: state => {
        // return state.review_obj_list
    // },
    page_length: state => {
        return state.page_length
    },
    page_size: state => {
        return state.page_size
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
    set_basis_store_list(state, value) {
        state.basis_store_list = value;
    },
    set_store_list(state, value) {
        state.store_list = value;
    },
    // set_review_obj_list(state, value) {
        // state.review_obj_list = value;
    // },
    set_page_length(state, value) {
        state.page_length = value;
    },
    set_page_size(state, value) {
        state.page_size = value;
    },
}