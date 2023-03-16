<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { notificacion_designacion_j } from '../modules/generadorDOCX/notificacion_designacion_j.js'
import { notificacion_jurado } from '../modules/generadorDOCX/notificacion_jurado.js';
import { planilla_evaluacion_final_TEG } from '../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js'

import { FormularioEmpresa } from '../modules/formularioEmpresa.js';

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let crearEmpresa = new FormularioEmpresa();

const descargarPlanillas = async () => {
  console.log('Descargando planillas');
  //notificacion_designacion_j();
  //notificacion_jurado();
  planilla_evaluacion_final_TEG();

};

onMounted(async () => {
  data.value = await api.obtenerTGconJurado();
  dataConsejo.value = await api.obtenerCDE();
  dataEmpresas.value = await api.obtenerEmpresas();
});

</script>
<template>
  <div class="request">
    <h1>Cargado de Notas</h1>
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
            :key="e.id_tg"
          >
            <p>{{ e.id_tg }}</p>
            <p>{{ e.titulo }}</p>
            <p>{{ e.modalidad }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form"></form>
        <div class="create-state">
          <div class="progressbar">
            <div class="progressbar--content"></div>
          </div>
          <div class="create-carousel">
            <h2>Visualización del documento de solicitud</h2>
            <div
              class="request__container__preview__form up-de"
            >
              <div class="request__container__preview__form__inputs">
                <p>Nombre Empresa</p>
                <input type="text" placeholder="Nombre Empresa" v-model="crearEmpresa.nombre">
                <p>Direccion</p>
                <input type="text" placeholder="Direccion" v-model="crearEmpresa.direccion">
                <p>Telefono</p>
                <input type="number" placeholder="Telefono" v-model="crearEmpresa.telefono">
              </div>
              <div class="actions">
                <button class="login__form__btn succes"
                @click="descargarPlanillas()"
                >
                  descargarPlanillas
                </button>
              </div>
            </div>
            <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>