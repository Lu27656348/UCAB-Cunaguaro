<script setup>

import Record from "../components/record.vue";
import crearSolicitud from "../components/planillaSolicitudCrear.vue";
import { PropuestaTg } from "../modules/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { generarCartaDesignacionTutorTEG } from '../modules/generadorDOCX/carta_designacion_tutor_teg.js';
import { generarCartaDesignacionTutorTIG } from '../modules/generadorDOCX/carta_designacion_tutor_tig.js';
import { FormularioCartaDesigancion } from '../modules/formularioCartaDesignacion.js'

let data = reactive([]);
let dataConsejo = reactive([]);

let tutor = reactive({
  apellidos: '',
  cargo: '',
  cedula: '',
  email: '',
  experiencia: '',
  graduado: '',
  habitacion: '',
  nombres: '',
  oficina: '',
  telefono: ''
});

let cde = reactive({
  id_cde: '',
  fecha_conformacion: ''
});

let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  console.log(id)
  formularioPropuesta.value = await api.obtenerTGById(id)
  console.log(formularioPropuesta)
};

const rechazarTG = async (id) =>{

  await api.rechazarPropuestaCDE(id)
  alert("rechazado")
  data.value = await api.obtenerPropuestas('PE');
};

const aceptarTG = async (id) =>{
  await api.aprobarPropuestaCDE(id)
  //await api.asignarTutorAcademico(id,tutor.value.cedula)
  alert("aceptado");
  const estudiante = await api.obtenerEstudianteDeTG(id);
  const tutor_academico = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico)
  const tutor_empresarial = await api.obtenerExternosById(formularioPropuesta.value.id_tutor_empresarial)
  
  const cartaDesignacion = new FormularioCartaDesigancion(
    formularioPropuesta.value.titulo,
    formularioPropuesta.value.modalidad,
    estudiante,
    tutor_academico,
    tutor_empresarial,
    '001-2022-2023',
    'Wladimir J. Sanvicente',
    'WlaLuchoCorp C.A'
  );
  cartaDesignacion.imprimirPlanilla(id);

  data.value = await api.obtenerPropuestas('PE');
};

const buscarTutorAcademico = async (id) =>{
  console.log(id)
  tutor.value = await api.obtenerProfesorByCedula(id)
  console.log(tutor.value)
};

const buscarTutorEmpresarial = async (id) =>{
  console.log(id)
  tutor.value = await api.obtenerExternoByCedula(id)
  console.log(tutor.value)
};

const buscarCDE = async (id) =>{
  console.log(id)
  cde.value = await api.obtenerCDEById(id)
  console.log(cde.value)
};

onMounted(async () => {
  data.value = await api.obtenerPropuestas('PE');
  dataConsejo.value = await api.obtenerCDE();
  //console.log("data.value")
  //console.log(data.value)
});

</script>
<template>
  <div class="request">
    <h1>Consejo de escuela</h1>
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
            v-for="p in data.value"
            :key="p.id_tg"
            @click="clickenComponente(p.id_tg)"
          >
            <p>{{ p.id_tg }}</p>
            <p>{{ p.titulo }}</p>
            <p>{{ p.modalidad }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualizaci??n del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form"></form>
        <div class="create-state">
          <div class="progressbar">
            <div class="progressbar--content"></div>
          </div>
          <div class="create-carousel">
            <h2>Visualizaci??n del documento de solicitud</h2>
            <div
              class="request__container__preview__form up-de"
            >
              <div class="request__container__preview__form__inputs">
                <p>Titulo del Trabajo</p>
                <input disabled type="text" v-model="formularioPropuesta.titulo"/>
                <p>Modalidad</p>
                <input disabled type="text" v-model="formularioPropuesta.modalidad"/>
                <p>Fecha de solicitud</p>
                <input disabled type="date" v-model="formularioPropuesta.fecha_solicitud"/>
                <p>Estatus</p>
                <input disabled type="text" v-model="formularioPropuesta.estatus"/>
                <select name="CDE" id="">
                  <option 
                    v-for="c in dataConsejo.value"
                    :key="c.id_cde"
                    :value="c.id_cde"
                  >{{ c.id_cde }}</option>
                </select>
              </div>
              <div class="actions">
                <button class="cancel"
                @click="rechazarTG(formularioPropuesta.id_tg)"
                >Rechazar</button>
                <button class="login__form__btn succes"
                @click="aceptarTG(formularioPropuesta.id_tg)"
                >
                  Aceptar
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
<style>
/*Esta etiqueta esta vacia*/
</style>