<template>
    <div>
        <div class="my-4">
            <h1 class="title-tenant">Meus Pedidos</h1>
        </div>

        <div class="my-orders my-4">
            <div class="my-table-header mb-4">
                <div class="text-center"><b>Nª Pedido</b></div>
                <div class="text-center"><b>Data</b></div>
                <div class="text-center"><b>Valor Total</b></div>
                <div class="text-center"><b>Detalhes</b></div>
            </div>

            <div class="my-table " v-for="(order, index) in myOrders" :key="index">
                <div class="text-center">{{order.identify}}</div>
                <div class="text-center">{{order.date | dateformat}}</div>
                <div class="text-center">{{order.total}}</div>
                <div class="text-center">
                    <router-link :to="{name: 'order.detail', params: {identify: order.identify}}" class="btn btn-danger">Detalhes</router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {mapActions, mapState} from 'vuex'

    export default {

        computed:{
            ...mapState({
                myOrders: state => state.orders.myOrders.data,
                me: state => state.auth.me
            })
        },

        created() {
            if(this.me.name === ''){
                return this.$router.push({name: 'home'})
            }
            this.getMyOrders()
            .catch((error) => {
                this.$vToastify.error("Erro a carregar todos os pedidos", 'Opps');
            })
        },


        methods:{
            ...mapActions([
                "getMyOrders"
            ])
        }


    }
</script>