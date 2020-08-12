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
          <form @submit.prevent="auth()">
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
              <input type="password" name="" v-model="formData.password"
                     :class="['form-control', 'input_pass', {'is-invalid': errors.password != ''}]"
                     value="" placeholder="Senha">
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" class="btn login_btn" :disabled="loading">
                <span v-if="loading">A autenticar...</span>
                <span v-else>Entrar</span>
              </button>
            </div>
          </form>
        </div>
    
        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Não tem uma conta? <router-link :to="{name: 'register'}" class="ml-2">Registe-se</router-link>            
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

    computed:{
      deviceName(){
        return navigator.appCodeName + navigator.appName + navigator.platform + this.formData.email
      }
    },

    data(){
      return {
        loading: false,

        formData:{
          email: '',
          password: ''
        },

        errors:{
          email: '',
          password: '',
        }
      }
    },

    methods:{

      ...mapActions([
        'login'
      ]),

      auth(){
        this.reset()
        this.loading = true;

        const params = {
          device_name: this.deviceName,
          ...this.formData
        }

        this.login(params)
                .then((response) => {
                  this.$vToastify.success("Bemvindo", '=)');
                  this.$router.push({name: 'my.orders'})
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

                  this.$vToastify.error("Erro ao autenticar", 'Opps');


                })
                .finally(() => {this.loading = false;});
      },

      reset(){
        this.errors ={
          email: '',
          password: '',
        }
      }

    }
  }

</script>