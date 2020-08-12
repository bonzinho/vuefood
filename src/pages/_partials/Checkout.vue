<template>
    <div>
        <a href="" class="cart-finalizar" @click.prevent="openModalCheckout">Finalizar</a>

        <modal name="checkout">
            <div class="px-md-5 my-4" v-if="loading">
                <p>A gerar o pedido (Aguarde...)</p>
            </div>
            <div class="px-md-5 my-4" v-else>
                <div class="col-12" v-if="me.name">
                    <p><strong>Total de produtos:</strong> {{products.length}}</p>
                    <p><strong>Preço total:</strong> {{totalCart}}</p>
                    <div class="form-group">
                        <textarea v-model="comment" name="comment" class="form-control" placeholder="Comentário do pedido" id="" cols="30" rows="2"></textarea>
                    </div>
                    <button class="btn btn-success btn-full" @click.prevent="createOrder">Finalizar pedido</button>
                </div>
                <div v-else class="row">
                    <div class="col-6">
                        <p><strong>Total de produtos:</strong> {{products.length}}</p>
                        <p><strong>Preço total:</strong> {{totalCart}}</p>
                        <div class="form-group">
                            <textarea v-model="comment" name="comment" class="form-control" placeholder="Comentário do pedido" id="" cols="30" rows="2"></textarea>
                        </div>
                        <button class="btn btn-success" @click.prevent="createOrder">Finalizar pedido anonimo</button>
                    </div>
                    <div class="col-6">
                        <router-link class="btn btn-light btn-full" :to="{name: 'login'}">Autenticar</router-link>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    export default {
        computed: {
            ...mapState({
                products: state => state.cart.products,
                me: state => state.auth.me,
                company: state => state.companies.companySelected,
            }),

            totalCart() {

                let total = 0

                this.products.map((itemCart, index) => {
                    total += itemCart.qty * itemCart.product.price
                });

                return total
            }
        },

        data(){
            return {
                comment: '',
                loading: false,
            }
        },

        methods:{
            ...mapActions([
                'createOrderAuthenticated',
                'createOrder'
            ]),

            createOrder(){
                this.loading = true;
                const action = this.me.name === '' ? 'createOrder' : 'createOrderAuthenticated'

                console.log(action);

                let params = {
                    token_company: this.company.uuid,
                    comment: this.comment,
                    products: [...this.products]
                }


                this.$store.dispatch(action, params)
                .then(response => {
                    this.$vToastify.success("Pedido efetuado com sucesso", 'Pedido finalizado');
                    this.$router.push({
                        name: 'order.detail',
                        params: {
                            identify: response.identify
                        }
                    })
                    //console.log(response);
                }).catch(error => {
                    this.$vToastify.success("Erro ao finalizar o pedido", 'Erro');
                }).finally(() => this.loading = false);

            },

            openModalCheckout(){
                this.$modal.show('checkout');
            },
            closeModalCheckout(){
                this.$modal.hide('checkout');

            }

        }
    }
</script>