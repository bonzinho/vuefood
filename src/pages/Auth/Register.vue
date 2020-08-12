<template>
    <div>
        <!-- login -->
    <div class="d-flex justify-content-center h-100 my-5">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo">
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form @submit.prevent="registerClient">
            <div class="text-danger" v-if="errors.name != ''">
              {{ errors.name[0] || '' }}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" v-model="formData.name" name=""
                     :class="['form-control', 'input_user', {'is-invalid': errors.name != ''}]" value="" placeholder="Nome">
            </div>

            <div class="text-danger" v-if="errors.email != ''">
              {{ errors.email[0] || '' }}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              </div>
              <input type="text" name="" v-model="formData.email"
                     :class="['form-control', 'input_user', {'is-invalid': errors.email != ''}]"
                     value="" placeholder="E-mail">
            </div>

            <div class="text-danger" v-if="errors.password != ''">
              {{ errors.password[0] || '' }}
            </div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" v-model="formData.password" name=""
                     :class="['form-control', 'input_pass', {'is-invalid': errors.password != ''}]"
                     value="" placeholder="Senha">
            </div>
              <div class="d-flex justify-content-center login_container">
          <button type="submit" name="button" class="btn login_btn"
                  :disabled="loading">
            <span v-if="loading">Aguarde...</span>
            <span v-else>Registar</span>
          </button>
           </div>
          </form>
        </div>
    
        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Já tem conta? <router-link :to="{name: 'login'}" class="ml-2">Login</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- login-->
    </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {

    data(){
      return {
        loading: false,

        formData:{
          name: '',
          email: '',
          password: ''
        },

        errors:{
          name: '',
          email: '',
          password: '',
        }
      }
    },

    methods:{
      ...mapActions([
              'register'
      ]),

      registerClient(){
        this.reset()
        this.loading = true;

        this.register(this.formData)
          .then((response) => {
            this.$vToastify.success("Registo realizado com sucesso", '=)');
            this.$router.push({name: 'login'})
          })
          .catch(error => {
            //console.log(error.response);
            const errorResponse = error.response
            if(errorResponse.status === 422){
              this.errors = Object.assign(this.errors, errorResponse.data.errors)
              this.$vToastify.error("Verifique todos os campos", 'Opps');
              setTimeout(()=> this.reset(), 4000)
              return;
            }

            this.$vToastify.error("Erro ao registar", 'Opps');


          })
          .finally(() => {this.loading = false;});
      },

      reset(){
        this.errors ={
                name: '',
                email: '',
                password: '',
            }
      }

    }
  }

</script>