<script setup>
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";

let dataPropuestasConRevisorAsignado = reactive([]);

//control de formulario de designacion
let showDesignarTutor = ref(false);
let revisor = ref("");

//Lista de comites en bdd
let profesoresADesignar = ref([]);
let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  console.log(id);
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log(formularioPropuesta.value);
  revisor.value = await api.obtenerProfesorByCedula(
    formularioPropuesta.value.id_profesor_revisor
  );
};

const rechazarPropuesta = async () => {
  await api.rechazarPropuestaRevisor(formularioPropuesta.value.id_tg, formularioPropuesta.value.observaciones_revisor);
  alert("Rechazada por Revisor");
  dataPropuestasConRevisorAsignado.value =
    await api.obtenerPropuestaConRevisorAsignado();
};

const aprobarPropuesta = async () => {
  await api.aprobarPropuestaRevisor(formularioPropuesta.value.id_tg, formularioPropuesta.value.observaciones_revisor);
  alert("Aprobada por Revisor");
  dataPropuestasConRevisorAsignado.value =
    await api.obtenerPropuestaConRevisorAsignado();
};

onMounted(async () => {
  dataPropuestasConRevisorAsignado.value =
    await api.obtenerPropuestaConRevisorAsignado();
});
</script>
<template>
  <div class="request">
    <h1>Evaluacion de Revisor</h1>
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
            v-for="t in dataPropuestasConRevisorAsignado.value"
            :key="t.id_ptg"
            @click="clickenComponente(t.id_tg)"
          >
            <p>{{ t.titulo }}</p>
            <p>{{ t.id_tg }}</p>
            <p>{{ t.fecha_ctg }}</p>
            <p>{{ t.estatus }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <h2>Visualización del documento de solicitud</h2>
          <div class="request__container__preview__form up-de">
            <div class="request__container__preview__form__inputs">
              <p>Titulo del Trabajo</p>
              <textarea
                disabled
                v-model="formularioPropuesta.titulo"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Tutilo de Propuesta TG"
              ></textarea>
              <p>Modalidad</p>
              <input
                disabled
                type="text"
                v-model="formularioPropuesta.modalidad"
              />
              <p>Revisor</p>
              <input disabled type="text" v-model="revisor.nombres" />
              <input disabled type="text" v-model="revisor.apellidos" />
              <input disabled type="text" v-model="revisor.cedula" />
              <strong>Observaciones</strong>
              <textarea
                style="height: 50px;"
                v-model="formularioPropuesta.observaciones_revisor"
                class="request__container__preview__form__inputs--titulo-tg"
                placeholder="Observaciones..."
              ></textarea>
            </div>

            <div class="actions">
              <button class="cancel" @click="rechazarPropuesta()">
                Rechazar
              </button>
              <button
                class="login__form__btn succes"
                @click="aprobarPropuesta()"
              >
                Aceptar
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>