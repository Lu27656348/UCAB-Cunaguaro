<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import * as jurados from "../modules/api/tg.js"
import { planilla_evaluacion_final_TEG } from '../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js'

import { FormularioEmpresa } from '../modules/classes/formularioEmpresa.js';
//import { platform } from "os";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let crearEmpresa = new FormularioEmpresa();

let planilla = ref({
  id_tg: '',
  titulo: '',
  modalidad: '',
  id_tutor_academico: '',
  id_tutor_empresarial: '',
  j1: '',
  j2: '',
  j1_suplente: '',
  j2_suplente: '',
  nota1: '0',
  nota2: '0',
  nota_tutor: '0',
  showNotas: false
});

const clickenComponente = async (id) => {
  const respuesta = await api.obtenerTGById(id);
  const juradosTG = await jurados.obtenerJuradosDeTG(id);
  console.log("clickenComponente()");
  console.log("planilla");
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  planilla.value.j1 = juradosTG[0];
  planilla.value.j1_suplente = juradosTG[2];
  planilla.value.j2 = juradosTG [1];
  planilla.value.j2_suplente = juradosTG[3];
  
  console.log(planilla.value);
  console.log("Jurados");
  console.log(juradosTG);

  planilla.value.showNotas = true;
};

const descargarPlanillas = async () => {
  console.log('Descargando planillas');
  //notificacion_designacion_j();
  //notificacion_jurado();
  //planilla_evaluacion_final_TEG();
};

const asignarNota = () => {
  console.log('Nota designada');
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
            @click="clickenComponente(e.id_tg)"
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
        <div class="create-state" v-show="planilla.showNotas">
          <div class="progressbar">
            <div class="progressbar--content"></div>
          </div>
          <div class="create-carousel">
            <h2>Visualización del documento de solicitud</h2>
            <div
              class="request__container__preview__form up-de"
            >
              <div class="request__container__preview__form__inputs">
                <p>Nota del trabajo de grado</p>
                <input type="range" min="0" max="20" v-model="planilla.nota1">
                <p>{{ planilla.nota1 }}</p>
                <!--
                <p>Nota Jurado 2 {{ planilla.j2 }}</p>
                <input type="range" min="0" max="20" v-model="planilla.nota2">
                <p>{{ planilla.nota2 }}</p>
                <p>Nota Tutor academico {{ planilla.id_tutor_academico }}</p>
                <input type="range" min="0" max="20" v-model="planilla.nota_tutor">
                <p>{{ planilla.nota_tutor }}</p>
                  -->
              </div>
              <div class="actions">
                <button class="login__form__btn succes"
                @click="asignarNota()"
                >
                  Designar nota
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