<script setup>
import { EmailAuthCredential } from "firebase/auth";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = ref([]);

let consejo = ref({
  id_cde: '',
  id_cde_formateado: '',
  fecha_conformacion: ''
});

onMounted(async () => {
  data.value = await api.obtenerCDE();;
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Consejos de Escuela</h1>
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
            :key="e.id_cde"
          >
            <p>ID: {{ e.id_cde }}</p>
            <p>ID Formateado: {{ e.id_cde_formateado}}</p>
            <p>Fecha Conformacion: {{ e.fecha_conformacion }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <div class="request__container__preview__form up-de">
            <p>ID Consejo de Escuela</p>
            <input type="text" v-model="consejo.id_cde">
            <p>ID Formateado</p>
            <input type="text" v-model="consejo.id_formateado" disabled>
            <p>Fecha de Conformacion</p>
            <input type="date" v-model="consejo.fecha_conformacion">
            <div class="actions">
              <button 
                class="login__form__btn succes" 
              >
                Añadir Consejo
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>