<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);

let estudiante = ref({
  cedula: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  oficina: '',
  habitacion: ''
});

onMounted(async () => {
  data.value = await api.obtenerEstudiantes();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Estudiantes</h1>
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
            <p>Nombres:{{ e.nombres }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <div class="request__container__preview__form up-de">
            <p>Cedula</p>
            <input type="text" v-model="estudiante.cedula">
            <p>Apellidos</p>
            <input type="text" v-model="estudiante.apellidos">
            <p>Nombres</p>
            <input type="text" v-model="estudiante.nombres">
            <p>Email</p>
            <input type="text" v-model="estudiante.email">
            <p>Telefono</p>
            <input type="text" v-model="estudiante.telefono">
            <p>Oficina</p>
            <input type="text" v-model="estudiante.oficina">
            <p>Habitacion</p>
            <input type="text" v-model="estudiante.habitacion">
            <div class="actions">
              <button 
                class="login__form__btn succes" 
              >
                Añadir Estudiante 
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>