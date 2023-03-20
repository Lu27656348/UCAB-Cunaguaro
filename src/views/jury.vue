<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from '../modules/classes/formularioEmpresa.js';
import { NotificacionDesignacionJurado} from '../modules/classes/NotificacionDesignacionJurado.js'
import { planilla_evaluacion_final_TEG } from '../modules/generadorDOCX/Planilla_evaluacion_final_TEG.js'
import { notificacion_designacion_j } from '../modules/generadorDOCX/notificacion_designacion_j.js'
import { notificacion_designacion } from "../modules/generadorDOCX/notificacion_jurado.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);
let dataProfesores = reactive([]);
let dataCDE = reactive([]);

let profesoresDesignados = reactive(['','','','']);
let cde_escogido = ref("");

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
  cde: ""
});

let notificacion = ref(new NotificacionDesignacionJurado());
let crearEmpresa = new FormularioEmpresa();

const designarJurado = async (profesores, id_tg) => {
  //console.log(dataProfesores.value);
  console.log(cde_escogido.value);
  console.log(profesoresDesignados)
  notificacion.value.cde = await api.obtenerCDEById(cde_escogido.value);
  notificacion.value.jurado1 = await api.obtenerProfesorByCedula(profesoresDesignados[0]);
  notificacion.value.jurado2 = await api.obtenerProfesorByCedula(profesoresDesignados[1]);
  //console.log(notificacion.value)
  planilla_evaluacion_final_TEG(notificacion.value);
  //notificacion_designacion_j(notificacion.value);
  //notificacion_designacion(notificacion.value)
  /*
  await api.crearJurados(profesoresDesignados,id_tg);
  */
}

const clickenComponente = async (id) => {
  const respuesta = await api.obtenerTGById(id)
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.estatus = respuesta.estatus;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  planilla.value.cde = respuesta.id_cde_jurado;

  notificacion.value.tg = await api.obtenerTGById(planilla.value.id_tg)
  notificacion.value.alumnos = await api.obtenerEstudianteDeTG(planilla.value.id_tg);
  notificacion.value.tutor_academico = await api.obtenerProfesorByCedula(planilla.value.id_tutor_academico)
  //
  //notificacion.value.tutor_empresarial = await api.obtenerExternosById(planilla.value.id_tutor_empresarial)
};

onMounted(async () => {
  data.value = await api.obtenerTGsinJurado();
  dataProfesores.value = await api.obtenerProfesores();
  dataCDE.value = await api.obtenerCDE();
});

</script>
<template>
  <div class="request">
    <h1>Designar Jurado</h1>
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
            @click="clickenComponente( e.id_tg )"
          >
            <p>{{ e.titulo }}</p>
            <p>{{ e.estatus }}</p>
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
              <p>{{ planilla.id_tg }}</p>
              <p>{{ planilla.titulo }}</p>
              <div class="request__container__preview__form__inputs">
                <p>J1</p>
                <select name="profesor" id="" v-model="profesoresDesignados[0]">
                  <option 
                  v-for="p in dataProfesores.value"
                  :key="p.cedula"
                  :value="p.cedula"
                  >{{ p.nombres + '' + p.apellidos }}</option>
                </select>
                <p>J2</p>
                <select name="profesor" id="" v-model="profesoresDesignados[1]">
                  <option 
                  v-for="p in dataProfesores.value"
                  :key="p.cedula"
                  :value="p.cedula"
                  >{{ p.nombres + '' + p.apellidos }}</option>
                </select>
                <p>J1-suplente</p>
                <select name="profesor" id="" v-model="profesoresDesignados[2]">
                  <option 
                  v-for="p in dataProfesores.value"
                  :key="p.cedula"
                  :value="p.cedula"
                  >{{ p.nombres + '' + p.apellidos }}</option>
                </select>
                <p>J2-suplente</p>
                <select name="profesor" id="" v-model="profesoresDesignados[3]">
                  <option 
                  v-for="p in dataProfesores.value"
                  :key="p.cedula"
                  :value="p.cedula"
                  >{{ p.nombres + '' + p.apellidos }}</option>
                </select>
                <p>Consejo de escuela</p>
                <select name="cde" id="" v-model="cde_escogido">
                  <option 
                  v-for="p in dataCDE.value"
                  :key="p.id_cde"
                  :value="p.id_cde"
                  >{{ p.id_cde_formateado }}</option>
                </select>
              </div>
              <div class="actions">
                <button class="login__form__btn succes"
                @click="designarJurado(profesoresDesignados, planilla.id_tg)"
                >
                  Designar Jurado
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