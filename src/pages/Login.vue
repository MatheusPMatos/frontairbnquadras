<template>
  <q-layout class="vertical-center">
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-ajax-bar position="top" color="primary" size="5px" />
        <q-card bordered class="card q-pa-md shadow-10"
          style="border-top: 5px solid #3E72AF; background-color: rgba(255,255,255,0.75); border-radius: 20px">
          <q-card-section class="text-primary text-center">
            <q-img src="src/assets/quasar-logo-vertical.svg" spinner-color="white"
              style="height: 120px; max-width: 300px" class="q-mb-lg q-px-md" />
            <q-separator spaced />
          </q-card-section>
          <q-card-section class="text-primary">
            <div class="text-h6">Bem vindo!</div>
            <div class="text-caption text-grey">Faça login...</div>
          </q-card-section>

          <q-card-section>
            <q-input class="q-mb-md" clearable rounded v-model="form.email" placeholder="meu@email.com"
              @blur="v$.email.$touch()" :error="v$.email.$error" error-message="Deve ser um e-mail válido." outlined
              @keypress.enter="fazerLogin">
              <template v-slot:prepend>
                <q-icon name="mdi-email-outline" class="cursor-pointer" color='primary' />
              </template>
            </q-input>
            <q-input outlined rounded v-model="form.password" :type="isPwd ? 'password' : 'text'"
              @keypress.enter="fazerLogin">
              <template v-slot:prepend>
                <q-icon name="mdi-shield-key-outline" class="cursor-pointer" color='primary' />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-space />
            <q-btn class="q-mr-sm q-my-lg" style="width: 150px" color="primary" rounded :loading="loading"
              @click="fazerLogin">
              Login
              <template v-slot:loading>
                <span>
                  <q-spinner-puff class="on-left" />Logando...
                </span>
              </template>
            </q-btn>
          </q-card-actions>
          <q-btn flat color="info" no-caps dense class="q-px-sm" label="Não tem Cadastro? Registre- se"
            @click="goToRegister" />

          <q-inner-loading :showing="loading" />
        </q-card>
      </q-page>

    </q-page-container>
  </q-layout>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'login-page',
  data() {
    return {
      isPwd: true,
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'register' });
    }
  },
  setup() {



    const form = reactive({
      email: null,
      password: null
    })

    const rules = {
      email: { required, email },
      password: { required }
    }

    const v$ = useVuelidate(rules, form)
    const $store = useStore()
    const loading = ref(false)



    const fazerLogin = () => {
      console.log("bateu aqui")
      v$.value.$touch()
      if (v$.value.$error) {
        $q.notify('Informe usuário e senha corretamente.')
        return
      }
      loading.value = true
      $store.dispatch('UserLogin', form)
        .then(() => {
          loading.value = false
        })
        .catch((err) => {
          console.error('Erro de login:', err)
          loading.value = false
        })
    }
    return {
      form, v$, fazerLogin
    }

  },
}
</script>
<style scoped>
#login-app {
  background: none;
}

.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.index h1 {
  height: 150px;
}

.index h1 img {
  height: 100%;
}

.index h2 {
  color: #666;
  margin-bottom: 200px;
}

.index h2 p {
  margin: 0 0 50px;
}

.index .ivu-row-flex {
  height: 100%;
}

#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  width: 100%;
  max-width: 430px;
}

.q-img__image {
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
