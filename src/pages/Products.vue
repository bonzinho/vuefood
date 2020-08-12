<template>
    <div>
        <!-- About Tenant and Categories -->
    <h1 class="my-4 title-tenant text-center">{{company.name}}</h1>
    <div class="row">
        
        
        <div class="list-categories">
            <a :class="['list-categories__item', categoryInFilter('')]">
                <div class="icon"><i class="fas fa-all"></i> </div> <span> Todas </span>
            </a>
          <a v-for="(category, index) in categories.data"
             :class="['list-categories__item active', categoryInFilter(category.identify)]"
             @click.prevent="filterByCategory(category)"
             :key="index">
            <div class="icon"><i class="fas fa-pizza-slice"></i> </div> <span> {{category.name}} </span>
          </a>
        </div>

    </div>
    <!-- Cards Produtos -->
    <div class="row my-4">

        <div v-if="company.products.data.length === 0">
            Sem produtos
        </div>

      <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in company.products.data" :key="index">
        <div :class="['card--flat h-100', {'disabled': productInCart(product)} ]">
          <a href="#">
            <div class="card-image">
              <img class="card-img-top" :src="product.image" alt="">
            </div>
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{product.name}}</a>
            </h4>
            <h5>{{product.price}} €</h5>
            <p class="card-text">
              {{product.description}}
            </p>
          </div>
          <div class="card-footer card-footer-custom">
              <a href="" @click.prevent="addProductCart(product)">Adicionar no Carrinho <i class="fas fa-cart-plus"></i></a>
          </div>
        </div>
      </div>

    </div>
    <!-- /.row -->
    </div>
</template>

<script>

import {mapState, mapActions, mapMutations} from 'vuex'

export default {

  props:['companyFlag'],

  created(){
    if(this.company.name == ''){
      this.$router.push({name: 'home'})
    }

    this.getCategoriesByCompany(this.company.uuid)
        .catch(response => {
            this.$vToastify.error("Falha a carregar as categorias", 'Opps');
        });

    this.loadProducts()

  },

      computed:{
        ...mapState({
          company: state => state.companies.companySelected,
          categories: state => state.companies.categoriesCompanySelected,
            productsInCart: state => state.cart.products,

        }),
      },

    data(){
      return {
          filters: {
              category: ''
          }
      }
    },

  methods:{
    ...mapActions([
            'getCategoriesByCompany',
            'getProductsByCompany',
    ]),

      ...mapMutations({
          addProductCart: 'ADD_PRODUCT_CART'
      }),

    loadProducts(){

        const params = {
            token_company: this.company.uuid,
        }

        if(this.filters.category){
            params.categories = [
                this.filters.category
            ]
        }



        this.getProductsByCompany(params)
            .catch(response => {
                this.$vToastify.error("Falha a carregar os produtos", 'Opps');
        });
    },

      filterByCategory(category){
        this.filters.category = category.identify;
        this.loadProducts();
      },

      categoryInFilter(identify){
          return identify === this.filters.category ? 'active' : '';
      },

      productInCart(product){
        let inCart = false;

        this.productsInCart.map((prodCart, index) => {
            if (prodCart.identify === product.identify)
                inCart = true
          });
        return inCart;
      },
  }


}
</script>