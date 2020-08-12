<template>
    <div class="my-4 text-center">
        <h1 class="title-tenant">A carregar dados</h1>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex'

    export  default {
        props:[
            'token_company',
            'token_table',
        ],

        computed:{
          ...mapState({
                company: state => state.companies.companySelected
            }),
        },

        created() {
            this.getCompanyByToken(this.token_company)
            .then(response => {

                const parms = {
                    table: this.token_table,
                    token_company: this.token_company,
                }

                this.getTableFromCompany(params)
                    .then(response => this.$vToastify.success('Mesas carregadas com sucesso', ' =)'))
                    .catch(error => this.$vToastify.error('Erro ao carregar a emopresa', ' ERRO'))
                    .finally(() => this.$router.push({name: 'products', params:{companyFlag: this.company.flag}}))


            }).catch(error => {
                this.$vToastify.error('Erro ao carregar a emopresa', ' ERRO')
                this.$router.push({name: 'home'})
            })
        },

        methods:{
            ...mapActions([
                'getTableFromCompany',
                'getCompanyByToken'
            ]),
        }
    }
</script>