export const state = {
    preloader: false,
    textPreloader: 'Aguarde...',
}

export const mutations = {
    SET_PRELOADER(state, status){
        state.preloader = status
        state.textPreloader = 'Aguarde...'
    },

    SET_TEXT_PRELOADER(state, text){
        state.textPreloader = text
    }
}