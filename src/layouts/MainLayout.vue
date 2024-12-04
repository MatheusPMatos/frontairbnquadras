<template>
  <q-layout view="hHh Lpr lFf">

    <q-header class="bg-white text-grey-8 q-py-xs " height-hint="58" bordered>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu">
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

        <q-btn flat no-caps no-wrap dense class="q-ml-sm" v-if="$q.screen.gt.xs">
          <q-img src="/izing-logo_5_transparent.png" spinner-color="primary" style="height: 50px; width: 140px" />
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <!-- <q-badge color="red" text-color="white" floating
              v-if="(parseInt(notifications.count) + parseInt(notifications_p.count)) > 0">
              {{ parseInt(notifications.count) + parseInt(notifications_p.count) }}
            </q-badge> -->
            <q-menu>
              <q-list style="min-width: 300px">

                <q-item v-if="1 == 0">
                  <q-item-section style="cursor: pointer;">
                    Nada de novo por aqui!
                  </q-item-section>
                </q-item>
                <q-item v-if="0 > 0">
                  <q-item-section avatar @click="() => $router.push({ name: 'atendimento' })" style="cursor: pointer;">
                    <q-avatar style="width: 60px; height: 60px" color="blue" text-color="white">
                      {{ 0 }}
                    </q-avatar>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>
          <q-avatar :color="true === 'offline' ? 'negative' : 'positive'" text-color="white" size="25px"
            :icon="true === 'offline' ? 'mdi-account-off' : 'mdi-account-check'" rounded class="q-ml-lg">
            <q-tooltip>
              {{ true === 'offline' ? 'Usuário Offiline' : 'Usuário Online' }}
            </q-tooltip>
          </q-avatar>
          <q-btn round flat class="bg-padrao text-bold q-mx-sm q-ml-lg">
            <q-avatar size="30px">
              {{ username.charAt(0).toUpperCase() }}
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item-label header> Olá! <b> {{ username }} </b> </q-item-label>
                <q-item clickable v-close-popup @click="abrirModalUsuario">
                  <q-item-section>Perfil</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="efetuarLogout">
                  <q-item-section>Sair</q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section>
                    <cSystemVersion />
                  </q-item-section>
                </q-item>

              </q-list>
            </q-menu>

            <q-tooltip>Usuário</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :mini="miniState" @mouseover="miniState = false"
      @mouseout="miniState = true" mini-to-overlay content-class="bg-white text-grey-9">
      <q-scroll-area class="fit">
        <q-list padding :key="userProfile">
          <EssentialLink v-for="item in menuData" :key="item.title" v-bind="item" />

        </q-list>
      </q-scroll-area>
      <!-- <div class="absolute-bottom text-center row justify-start" :class="{ 'bg-grey-3': $q.dark.isActive }"
        style="height: 40px">
        <q-toggle size="xl" keep-color dense class="text-bold q-ml-xs"
          :icon-color="$q.dark.isActive ? 'black' : 'white'" :value="$q.dark.isActive"
          :color="$q.dark.isActive ? 'grey-3' : 'black'" checked-icon="mdi-white-balance-sunny"
          unchecked-icon="mdi-weather-sunny" @input="$setConfigsUsuario({ isDark: !$q.dark.isActive })">
          <q-tooltip content-class="text-body1 hide-scrollbar">
            {{ $q.dark.isActive ? 'Desativar' : 'Ativar' }} Modo Escuro (Dark Mode)
          </q-tooltip>
        </q-toggle>
      </div> -->
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xs">
        <router-view />
      </q-page>
    </q-page-container>
    <audio ref="audioNotification">
      <source :src="alertSound" type="audio/mp3">
    </audio>
    <!-- <ModalUsuario :isProfile="true" :v-model="modalUsuario" :="usuario" /> -->
  </q-layout>
</template>

<script>
import cSystemVersion from '../components/cSystemVersion.vue'
import EssentialLink from 'components/EssentialLink.vue'
import alertSound from 'src/assets/sound.mp3'
import { format } from 'date-fns'
const username = localStorage.getItem('username')

import { mapGetters } from 'vuex'


const objMenuVendedor = [
  {
    title: 'Produtos',
    caption: 'Administrar produtos e itens para locação',
    icon: 'mdi-home',
    path: 'homev'
  },

  {
    title: 'Agendamentos',
    caption: 'Administrar agendamentos e locações',
    icon: 'mdi-forum-outline',
    path: 'agendamentos'
  },
  {
    title: 'Relatórios',
    caption: 'Informções e demonstrativos de resultados',
    icon: 'mdi-card-account-mail',
    path: 'relatorios'
  }
]

const objMenuComprador = [
  {
    title: 'Buscar Produtos',
    caption: 'Canais de Comunicação',
    icon: 'mdi-cellphone-wireless',
    path: 'home'
  },
  {
    title: 'Agendamentos',
    caption: 'Visão geral dos agendamentos',
    icon: 'mdi-view-dashboard-variant',
    path: 'agendamentos'
  },
  {
    title: 'Relatórios',
    caption: 'Relatórios gerais',
    icon: 'mdi-file-chart',
    path: 'relatorios'
  },
  {
    title: 'Conta',
    caption: 'Gerenciar Minha Conta',
    icon: 'mdi-account-group',
    path: 'contas'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, cSystemVersion },
  data() {
    return {
      username,
      miniState: true,
      userProfile: 'comprador',
      alertSound,
      leftDrawerOpen: false,
      menuData: objMenuComprador,
    }
  },
  computed: {
    ...mapGetters(['notifications',]),
    cUsersApp() {
      return this.$store.state.usersApp
    },
    cObjMenu() {
      if (this.cProblemaConexao) {
        return objMenu.map(menu => {
          if (menu.routeName === 'sessoes') {
            menu.color = 'negative'
          }
          return menu
        })
      }

      return objMenu
    }
  },
  methods: {
    handlerNotifications(data) {
      const { message, contact, ticket } = data

      const options = {
        body: `${message.body} - ${format(new Date(), 'HH:mm')}`,
        icon: contact.profilePicUrl,
        tag: ticket.id,
        renotify: true
      }

      const notification = new Notification(
        `Mensagem de ${contact.name}`,
        options
      )

      notification.onclick = e => {
        e.preventDefault()
        window.focus()

        this.$router.push({ name: 'atendimento' })
      }
      this.$nextTick(() => {
        // utilizar refs do layout
        this.$refs.audioNotification.play()
      })
    },
    async abrirModalUsuario() {
      this.modalUsuario = true
    },
    async efetuarLogout() {
      try {

        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('profile')
        this.$router.go({ name: 'login', replace: true })
      } catch (error) {
        this.$notificarErro('Não foi possível realizar logout', error)
      }
    },
    setMenu() {
      this.userProfile = localStorage.getItem('profile')
      this.menuData = this.userProfile === 'vendedor' ? objMenuVendedor : objMenuComprador
    }

  },
  async mounted() {
    if (!('Notification' in window)) {
    } else {
      Notification.requestPermission()
    }
    this.setMenu()

  },
}
</script>
<style scoped>
.q-img__image {
  background-size: contain;
}
</style>
