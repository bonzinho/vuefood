<template>
    <div>
        <div class="row my-4 mx-0 details">
            <div class="col-12 mb-2">
                <h1 class="title-tenant h2">Detalhes do Pedido <strong>{{identify}}</strong></h1>
            </div>
            <div class="col-sm-6">
                <ul class="p-0">
                    <li><b>Número:</b> {{identify}}</li>
                    <li><b>Total:</b> {{order.total}} €</li>
                    <li><b>Data:</b> {{order.date}}</li>
                    <li><b>Status:</b> <span class="badge bg-success text-light p-2">{{order.status}}</span></li>
                </ul>
            </div>
            <div class="col-sm-6">
                <ul class="p-0">
                    <li v-if="order.table.identify">
                        <span>Mesa</span>
                        <ul class="p-0">
                            <li><b>Identificador:</b> {{order.table.identify}}</li>
                            <li><b>Descrição:</b> {{order.table.description}}</li>
                        </ul>
                    </li>
                    <li v-if="order.client.name">
                        <span>Cliente</span>
                        <ul class="p-0">
                            <li><b>Nome:</b> {{order.client.name}}</li>
                            <li><b>E-mail:</b> {{order.client.email}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div> <!-- details order -->

        <hr>

        <div class="row my-4">
            <div class="col-12">
                <h4>Produtos</h4>
            </div>

            <div class="col-12 col-md-6 col-lg-4 my-1" v-for="(product, index) in order.products" :key="index">
                <div class="details-card">
                    <a href="vitrine-tenant.html">
                        <img class="card-img-top" :src="product.image" :alt="product.name">
                    </a>
                    <div class="details-card-body">
                        <h5>{{product.name}}</h5>
                        <p><b>{{product.price}} €</b></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- EVALUATIONS  -->
        <hr>
        <button class="btn btn-success"
                v-if="me.name && me.name === order.client.name && order.evaluations.length === 0"
                @click.prevent="openModalEvaluation">
            Avaliar Pedido
        </button>

        <modal name="evaluation-order" :heigth="350">
            <div class="px-md-5 my-4">
                <h1>Avaliar o pedido {{identify}}</h1>

                <strong>Avaliação:</strong>
                <vue-stars
                        name="evaluation"
                        :active-color="'#ffdd00'"
                        :inactive-color="'#999999'"
                        :shadow-color="'#ffff00'"
                        :hover-color="'#dddd00'"
                        :max="5"
                        :value="3"
                        :readonly="false"
                        :char="'★'"
                        :inactive-char="''"
                        :class="''"
                        v-model="evaluation.stars"
                />

                <div class="form-group">
                    <textarea v-model="evaluation.comment" class="form-control" name="commet" id="" cols="30" rows="3" placeholder="Comentário (Opcional)"></textarea>
                </div>
                <button class="btn btn-info"
                        @click.prevent="sendEvaluation"
                        :disabled="loadSendEvaluation">
                    <span v-if="loadSendEvaluation">A enviar avaliação</span>
                    <span v-else>Avaliar</span>
                </button>
            </div>
        </modal>
        <div class="evaluations-order col-12" v-if="order.evaluations.length">
            <div v-for="(evaluation, index) in order.evaluations" :key="index">
                <p><strong>Nome:</strong> {{evaluation.client.name}}</p>
                <p><strong>Comentário:</strong> {{evaluation.client.comment}}</p>
                <p><strong>Nota:</strong>
                    <vue-stars
                            name="evaluation"
                            :active-color="'#ffdd00'"
                            :inactive-color="'#999999'"
                            :shadow-color="'#ffff00'"
                            :hover-color="'#dddd00'"
                            :max="5"
                            :readonly="true"
                            :char="'★'"
                            :inactive-char="''"
                            :class="''"
                            :value="evaluation.stars"
                    />
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'

    export default {
        props:['identify'],

        computed:{
          ...mapState({
             me: state => state.auth.me
          })
        },

        created() {
            this.getOrderByIndentify(this.identify)
            .then(response => {
                this.order = Object.assign(this.order, response.data.data)
            })
            .catch(error => {
                this.$vToastify.error(`Erro ao carregar o pedido ${this.identify}`, 'ERRO')

                this.routes.push({name: 'home'})
            })
        },

        data(){
            return {
                order:{
                    identify: '',
                    date: '',
                    status: '',
                    total: '',
                    table: {
                        identify: '',
                        description: '',
                    },
                    client:{
                        name: '',
                        email: '',
                    },
                    company: {
                        name: '',
                        contact: '',
                        image: '',
                    },
                    products: [],
                    evaluations: [],
                },
                evaluation:{
                  stars: 1,
                  comment: ''

                },
                loadSendEvaluation:false,
            }
        },

        methods:{
            ...mapActions([
                'getOrderByIndentify',
                'evaluationOrder'
            ]),

            openModalEvaluation(){
                this.$modal.show('evaluation-order')
            },

            closeModalEvaluation(){
                this.$modal.hide('evaluation-order')

            },

            sendEvaluation(){

                this.loadSendEvaluation = true;

                const params = {
                    identify: this.identify,
                    ...this.evaluation
                }

                this.evaluationOrder(params)
                    .then(response => {
                        this.$vToastify.success("Avaliação enviada com sucesso", 'Opps');
                        this.order.evaluations.push(response.data.data)
                        this.closeModalEvaluation()
                    })
                    .catch((error) => {
                        this.$vToastify.error("Falha a submeter a avaliação", 'Opps');
                    })
                .finally(() => this.loadSendEvaluation = false)
            }

        }

    }
</script>