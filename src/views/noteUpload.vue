<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import * as jurados from "../modules/api/tg.js";
import { planilla_evaluacion_final_TEG } from "../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";
//import { platform } from "os";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let crearEmpresa = new FormularioEmpresa();

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
  j1: "",
  j2: "",
  j1_suplente: "",
  j2_suplente: "",
  nota1: "0",
  nota2: "0",
  nota_tutor: "0",
  showNotas: false,
  mencion: '',
  comentario_mencion: ''
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
  planilla.value.j2 = juradosTG[1];
  planilla.value.j2_suplente = juradosTG[3];

  console.log(planilla.value);
  console.log("Jurados");

  planilla.value.showNotas = true;
};

const descargarPlanillas = async () => {
  console.log("Descargando planillas");
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
        <form action="" class="committe__container__preview__form">
          <h2>Visualización del documento de solicitud</h2>
          <div class="request__container__preview__form up-de">
            <div class="request__container__preview__form__inputs">
              <textarea
                disabled
                maxlength="200"
                v-model=planilla.titulo
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
              ></textarea>
              <p>Nota Final {{ planilla.j1 }}</p>
              <input type="range" min="0" max="20" :disabled="planilla.id_tg == ''" v-model="planilla.nota1" />
              <p>Fecha de entrega del Informe Final</p>
              <input type="date" name="fechaEntrega" :disabled="planilla.id_tg == ''">
              <p>Fecha de defensa</p>
              <input type="date" name="fechaDefenza" :disabled="planilla.id_tg == ''">
              <p>Mencion</p>
              <select name="mencion" id="" v-model="planilla.mencion" :disabled="planilla.id_tg == ''">
                <option value="">Sin Mencion</option>
                <option value="h">Honorifica</option>
                <option value="p">Publicacion</option>
              </select>
              <textarea
                v-if="!planilla.mencion == ''"
                maxlength="200"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Razon de la mencion"
                v-model="planilla.comentario_mencion"
                :disabled="planilla.id_tg == ''"
              ></textarea>
            </div>
            <div class="actions">
              <button
                class="login__form__btn succes"
                @click="descargarPlanillas()"
                :disabled="planilla.id_tg == ''"
              >
                Designar nota
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>