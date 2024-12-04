<template>
  <q-item clickable @click="navigate">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import routes from 'src/router/routes';

defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  path: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})

// Método de navegação
const navigate = () => {
  // Verifica se o link é relativo e utiliza o Vue Router para navegação
  if (props.path.startsWith('/')) {
    // Substitui a navegação, sem adicionar à pilha de histórico
    routes.pop({
      path: props.path,

    })
  } else {
    // Ou usa push caso queira adicionar à pilha de histórico
    routes.push({
      path: props.path
    })
  }
}
</script>
