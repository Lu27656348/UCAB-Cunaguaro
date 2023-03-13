<script setup>
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/planillaPropuesta.js";

let dataPropuestas = reactive([]);
let dataPorRevisores = reactive([]);
let dataProfesores = reactive([]);
let datosProfesor = null;
//Lista de comites en bdd
let comites;

let formularioPropuesta = ref( new PropuestaTg() );
console.log(formularioPropuesta);

const clickenComponente = async (id) => {
  console.log(id)
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log("formularioPropuesta.value");
  console.log(formularioPropuesta.value);
  if(formularioPropuesta.value.modalidad === 'E'){
    const resdatosProfesor = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico);
    datosProfesor = resdatosProfesor;
  }else{
    const resdatosProfesor = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_empresarial);
    datosProfesor = resdatosProfesor
  }
  
};

const rechazarPropuestaComite = async() =>{
  api.rechazarPropuestaComite(formularioPropuesta.value.id_tg);
  alert('Rechazado con tristeza');
  dataPropuestas.value = await api.obtenerPropuestas('PC');
};

const aprobarPropuestaComite = async () =>{
  api.aprobarPropuestaComite(formularioPropuesta.value.id_tg);
  alert('Aprobado por comite');
  dataPropuestas.value = await api.obtenerPropuestas('PC');
};

onMounted(async () => {
  dataPropuestas.value = await api.obtenerPropuestas('PC');
  comites = await api.obtenerComites();
  console.log(comites);
});
</script>
<template>
  <div class="request">
    <h1>Comite de escuela</h1>
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
            v-for="t in dataPropuestas.value"
            :key="t.id_tg"
            @click="clickenComponente(t.id_tg)"
          >
            <p>{{ t.id_tg }}</p>
            <p>{{ t.fecha_solicitud }}</p>
            <p>{{ t.estatus }}</p>
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
                <p>Titulo del Trabajo</p>
                <input disabled type="text" v-model="formularioPropuesta.titulo" />
                <p>Modalidad</p>
                <input disabled type="text" v-model="formularioPropuesta.modalidad">
                <p>Fecha de solicitud</p>
                <input disabled type="date"  v-model="formularioPropuesta.fecha_solicitud"/>
                <p>Estatus</p>
                <input disabled type="text" v-model="formularioPropuesta.estatus"/>
                <p>tutor</p>
                <input disabled type="text" v-model="formularioPropuesta.estatus" />
                <input disabled type="text" v-model="formularioPropuesta.estatus"/>
              </div>
              <div class="actions">
                <button class="cancel"
                @click="rechazarPropuestaComite()"
                >Rechazar</button>
                <button class="login__form__btn succes"
                @click="aprobarPropuestaComite()"
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