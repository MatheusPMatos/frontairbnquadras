<template>
  <div class="user-registration">
    <h2>Cadastro de Usuário</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Nome:</label>
        <input v-model="user.name" type="text" id="name" required />
      </div>

      <div>
        <label for="cpf">CPF:</label>
        <input v-model="user.cpf" type="text" id="cpf" required maxlength="15" />
      </div>

      <div>
        <label for="email">E-mail:</label>
        <input v-model="user.email" type="email" id="email" required />
      </div>

      <div>
        <label for="password">Senha:</label>
        <input v-model="user.password" type="password" id="password" required minlength="6" />
      </div>

      <div>
        <label for="usrType">Tipo de Usuário:</label>
        <select v-model="user.usr_type" id="usrType" required>
          <option value="" disabled>Selecione um tipo</option>
          <option :value="1">Vendedor</option>
          <option :value="2">Comprador</option>
        </select>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { CreateUser } from 'src/service/user';

export default {
  name: 'UserRegistration',
  data() {
    return {
      user: {
        name: '',
        cpf: '',
        email: '',
        password: '',
        usr_type: '',
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        await CreateUser(this.user);
        alert('Usuário cadastrado com sucesso!');
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    },
  },
};
</script>

<style scoped>
.user-registration {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
select,
button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
}
</style>
