<script setup>
import { EmailAuthCredential } from "firebase/auth";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = ref([]);

let externo = ref({
  cedula: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  oficina: '',
  habitacion: '',
  experiencia: '',
  fecha_gradiado: '',
  cargo: ''
});

onMounted(async () => {
  data.value = await api.obtenerExternos();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Externos</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
        </div>
        <div class="committe__container__display__list">
          <!-- Aqui va el registro para las propuestas de trabajo de grado -->
          <div
            class="request__container__display__list__record"
            v-for="e in data.value" 
            :key="e.cedula"
          >
            <p>Cedula: {{ e.cedula }}</p>
            <p>Apellidos: {{ e.apellidos }}</p>
            <p>Nombres: {{ e.nombres }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <div class="request__container__preview__form up-de">
            <p>Cedula</p>
            <input type="text" v-model="externo.cedula">
            <p>Apellidos</p>
            <input type="text" v-model="externo.apellidos">
            <p>Nombres</p>
            <input type="text" v-model="externo.nombres">
            <p>Email</p>
            <input type="text" v-model="externo.email">
            <p>Telefono</p>
            <input type="text" v-model="externo.telefono">
            <p>Oficina</p>
            <input type="text" v-model="externo.oficina">
            <p>Habitacion</p>
            <input type="text" v-model="externo.habitacion">
            <p>Experiencia</p>
            <input type="text" v-model="externo.experiencia">
            <p>Fecha de Graduado</p>
            <input type="date" v-model="externo.fecha_graduado">
            <p>Cargo</p>
            <input type="text" v-model="externo.cargo">
            <div class="actions">
              <button 
                class="login__form__btn succes" 
              >
                Añadir Externo
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>