<template>
  <q-toolbar class="bg-primary text-white">
    <q-toolbar-title>Lista de Produtos</q-toolbar-title>
  </q-toolbar>

  <q-list>
    <q-item v-for="produto in produtos" :key="produto.id" class="q-mb-md">
      <q-item-section>
        <q-item-label>{{ produto.name }}</q-item-label>
        <q-item-label caption>{{ produto.description }}</q-item-label>
        <q-item-label>{{ formatarPreco(produto.price) }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn label="Agendar" color="primary" @click="agendar(produto)" />
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script>
import { ref, onMounted } from 'vue';
import { ListarProdutos } from 'src/service/produtos';
import Router from 'src/router';

export default {
  name: 'CompradorPage',
  setup() {
    const produtos = ref([]);
    const dialogoVisivel = ref(false);
    const produtoSelecionado = ref(null);


    const listarProdutos = async () => {
      try {
        const resposta = await ListarProdutos();
        produtos.value = resposta.data;
      } catch (erro) {
        console.error('Erro ao listar produtos:', erro);
      }
    };

    const agendar = (produto) => {
      produtoSelecionado.value = produto;
      Router.push({
        path: "agendamento",
        query: { produto: JSON.stringify(produto) },
      })
    };

    const formatarPreco = (preco) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(preco);
    };

    onMounted(() => {
      listarProdutos();
    });

    return {
      produtos,
      ListarProdutos,
      agendar,
      dialogoVisivel,
      produtoSelecionado,
      formatarPreco,
    };
  },
};
</script>

<style scoped>
.q-mb-md {
  margin-bottom: 16px;
}
</style>
