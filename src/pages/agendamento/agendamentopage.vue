<template>
  <div>
    <h3>Agendamento para {{ produto.name }}</h3>
    <p>{{ produto.description }}</p>

    <cDatePick v-model="dataSelecionada" />
    <button @click="buscarHorarios">Buscar Horários Livres</button>

    <ul v-if="horariosFiltrados.length" class="horario-list">
      <li v-for="horario in horariosFiltrados" :key="horario.ID" :class="{ 'horario-reservado': horario.reserved }">
        {{ formatarHorario(horario) }}
        <button
          :class="['btn-reservar', { 'reservar-disponivel': !horario.reserved && horario.enable, 'reservar-indisponivel': horario.reserved || !horario.enable }]"
          :disabled="horario.reserved || !horario.enable" @click="confirmarReserva(horario)">
          {{ horario.reserved ? 'Reservado' : 'Reservar' }}
        </button>
      </li>
    </ul>

    <p v-else>Nenhum horário disponível para essa data.</p>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmar Reserva</div>
          <div>
            Deseja confirmar a reserva para o horário:
            <strong>{{ horarioSelecionado ? formatarHorario(horarioSelecionado) : '' }}</strong>?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" @click="dialogVisible = false" />
          <q-btn flat label="Confirmar" color="positive" @click="realizarReserva" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import CDatePick from "src/components/cDatePick.vue";
import { ListarHorarios } from "src/service/agenda";
import { formatISO } from 'date-fns';
import { ReservarHorario } from "src/service/reserva";

export default {
  name: "AgendamentoPage",
  components: { CDatePick },
  data() {
    return {
      produto: {
        ID: null,
        name: null,
        description: null,
        price: null,
      },
      dataSelecionada: new Date(),
      horarios: [],
      dialogVisible: false,
      horarioSelecionado: null,
    };
  },
  computed: {
    horariosFiltrados() {
      return this.horarios.filter((horario) => horario.enable);
    },
  },

  created() {
    const produtoQuery = this.$route.query.produto;
    this.produto = produtoQuery ? JSON.parse(produtoQuery) : {};
  },
  methods: {

    formatarData(data) {
      return formatISO(data, { representation: 'complete' }); // Inclui data, hora e offset
    },

    async buscarHorarios() {
      if (!this.dataSelecionada) {
        alert("Selecione uma data!");
        return;
      }


      const dataFormatada = this.formatarData(this.dataSelecionada);
      try {
        console.log(dataFormatada)
        const response = await ListarHorarios({ date: dataFormatada }, this.produto.ID)
        this.horarios = response.data;
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      }
    },
    formatarHorario(horario) {
      const inicial = new Date(horario.initial_time).toLocaleTimeString();
      const final = new Date(horario.final_time).toLocaleTimeString();
      return `${inicial} - ${final} (${horario.reserved ? 'Reservado' : 'Disponível'})`;
    },

    confirmarReserva(horario) {
      this.horarioSelecionado = horario;
      this.dialogVisible = true;
    },
    async realizarReserva() {
      if (!this.horarioSelecionado) return;

      const dataFormatada = this.formatarData(this.dataSelecionada);
      const payload = {
        schedule_id: this.horarioSelecionado.ID,
        date: dataFormatada,
        is_paid: false
      }
      try {
        const response = await ReservarHorario(payload);
        console.log('Reserva realizada com sucesso:', response.data);

        this.horarioSelecionado.reserved = true; // Atualizar a interface
        this.dialogVisible = false;
      } catch (error) {
        console.error('Erro ao reservar o horário:', error);
        alert('Erro ao tentar realizar a reserva.');
      }
    }
  },
};
</script>

<style scoped>
.horario-list {
  list-style-type: none;
  padding: 0;
}

.horario-list li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.horario-reservado {
  color: red;
}

.horario-list {
  list-style-type: none;
  padding: 0;
}

.btn-reservar {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reservar-disponivel {
  background-color: green;
  color: white;
}

.reservar-indisponivel {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}
</style>
