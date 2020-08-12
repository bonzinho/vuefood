import axios from 'axios'
import { TOKEN_NAME, API_VERSION } from '@/configs/api'

const state = {
    myOrders: {
        data: [],
    },
}

const mutations = {
    SET_ORDERS(state, orders){
        state.myOrders = orders
    },
    SET_ORDER(state, order){
        state.myOrders.data = order
    },
}


const actions = {

    getMyOrders({commit}){
        const token = localStorage.getItem(TOKEN_NAME)
        if(!token) Promise.reject() // garante que cai num metodo catch por não existir token

        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'A carregar todos os pedidos...')

        return axios.get(`auth/${API_VERSION}/my-orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                commit('SET_ORDERS', response.data)
            })
            .finally(() => commit('SET_PRELOADER', false))
    },

    getOrderByIndentify({commit}, identify){
        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'A carregar pedido...')

        return axios.get(`${API_VERSION}/orders/${identify}`)
            .finally(() => commit('SET_PRELOADER', false))
    },

    evaluationOrder({commit}, params){
        const token = localStorage.getItem(TOKEN_NAME)
        if(!token) Promise.reject() // garante que cai num metodo catch por não existir token


        return axios.post(`auth/${API_VERSION}/orders/${params.identify}/evaluations`, params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },

    createOrder({commit}, params){

        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/orders`, params)
                .then(response => {
                    commit('CLEAR_CART')

                    resolve(response.data.data)
                }).catch(response => reject(response.error))
        })


    },

    createOrderAuthenticated({commit}, params){

        return new Promise((resolve, reject) => {
            const token = localStorage.getItem(TOKEN_NAME)
            if(!token) reject() // garante que cai num metodo catch por não existir token

            axios.post(`auth/${API_VERSION}/orders`, params, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                commit('CLEAR_CART')

                resolve(response.data.data)
            }).catch(response => reject(response.error))


        })


    }

}

export default {
    state,
    mutations,
    actions,
}