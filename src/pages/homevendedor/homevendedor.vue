<template>
  <q-toolbar class="bg-primary text-white">
    <q-toolbar-title>Seus Produtos</q-toolbar-title>
  </q-toolbar>

  <q-list>
    <q-item v-for="produto in produtos" :key="produto.id" class="q-mb-md">
      <q-item-section>
        <q-item-label>{{ produto.name }}</q-item-label>
        <q-item-label caption>{{ produto.description }}</q-item-label>
        <q-item-label>{{ formatarPreco(produto.price) }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn label="Editar" color="primary" @click="editar(produto)" />
      </q-item-section>
      <q-item-section side>
        <q-btn label="Excluir" color="primary" @click="deleterdialog(produto)" />
      </q-item-section>
    </q-item>
  </q-list>

  <q-dialog v-model="dialogoVisivel" persistent>
    <q-card class="q-pa-md" style="max-width: 600px; min-width: 400px;">
      <q-card-section>
        <div class="text-h6">Editar Produto</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="produtoEditado.name" label="Nome" required maxlength="240" filled />
        <q-input v-model="produtoEditado.description" label="Descrição" type="textarea" maxlength="240" filled />
        <q-select v-model="produtoEditado.prod_type" :options="tipoProdutos" label="Tipo de Produto" filled required />
        <q-input v-model.number="produtoEditado.price" label="Preço" type="number" filled min="0" required />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="dialogoVisivel = false" />
        <q-btn flat label="Salvar" color="primary" @click="salvarProduto" />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-dialog v-model="dialogoDeleteVisivel">
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirmar Exclusão</div>
      </q-card-section>
      <q-card-section>
        <p>Tem certeza que deseja excluir o produto: <strong>{{ produtoSelecionado?.name }}</strong>?</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="dialogoDeleteVisivel = false" />
        <q-btn flat label="Excluir" color="negative" @click="deletar" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { EditarProduto, ListarProdutos, DeletarProduto } from "src/service/produtos";
import { Notify, Dark } from "quasar";

export default {
  name: "VendedorPage",
  data() {
    return {
      produtos: [],
      dialogoVisivel: false,
      dialogoDeleteVisivel: false,
      produtoSelecionado: null, // Produto a ser exibido
      produtoEditado: {
        name: "",
        description: "",
        prod_type: 1,
        user_id: null, // Pega o ID do usuário logado se necessário
        price: 0.0,
      },
      tipoProdutos: [
        { label: "Quadra", value: 1 },
        { label: "Equipamento", value: 2 },
      ],
    };
  },
  methods: {
    async listarProdutos() {
      try {
        const resposta = await ListarProdutos();
        this.produtos = resposta.data;
      } catch (erro) {
        console.error("Erro ao listar produtos:", erro);
      }
    },

    async deleterdialog(produto) {
      this.produtoSelecionado = produto
      this.dialogoDeleteVisivel = true
    },
    async deletar() {
      try {
        await DeletarProduto(this.produtoSelecionado?.ID);
        await this.listarProdutos()
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Erro deletar produto!",
          position: "top",
          progress: true,
        });
      }
    },
    editar(produto) {
      this.produtoEditado = { ...produto };
      this.dialogoVisivel = true;
    },
    async salvarProduto() {

      if (!this.produtoEditado.name || this.produtoEditado.price <= 0) {
        alert("Preencha os campos obrigatórios.");
        return;
      }
      this.produtoEditado.prod_type = this.produtoEditado.prod_type.valueOf()
      EditarProduto(this.produtoEditado)
        .then(async () => {
          alert("Produto atualizado com sucesso!");
          await this.listarProdutos();
          this.dialogoVisivel = false;
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao atualizar o produto.");
        });
    },

    formatarPreco(preco) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco);
    },
  },
  mounted() {
    this.listarProdutos(); // Agora funciona com "this"
  },
};
</script>

<style scoped>
.q-mb-md {
  margin-bottom: 16px;
}
</style>
