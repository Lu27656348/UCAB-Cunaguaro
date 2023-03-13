<script setup>
import Record from "../components/record.vue";
import crearSolicitud from "../components/planillaSolicitudCrear.vue";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);

// Objeto para guardar los datos de la planilla que se esta leyendo
let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
});

const showPlanillaUpDe = ref(false);
const showPlanillaCreate = ref(false);
const actualizarLista = ref(false);

function actionShowPlanillaCrear() {
  showPlanillaUpDe.value = false;
  showPlanillaCreate.value = true;
}
function actionShowPlanillaUpDe() {
  showPlanillaUpDe.value = true;
  showPlanillaCreate.value = false;
}

const clickenComponente = async (id) => {
  actionShowPlanillaUpDe();
  const respuesta = await api.obtenerTGById(id)
  console.log("clickenComponente()");
  console.log("planilla");
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.estatus = respuesta.estatus;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  console.log(planilla.value);
};

async function actualizarPlanilla(){
  await api.actualizarPlanilla(planilla.value);
  data.value = await api.obtenerPropuestas('PC');
}

async function eliminarPlanilla(){
  console.log(planilla.value)
  await api.eliminarPlanilla(planilla.value.id_tg);
  data.value = await api.obtenerPropuestas('PC');
}
/*
actualizarLista.value = computed( async () =>{
  let falso = actualizarLista.value
  console.log(actualizarLista.value);
  await actualizarPlanilla();
  return actualizarLista.value = false; 
});
*/
onMounted(async () => {
  data.value = await api.obtenerPropuestas('PC');
  console.log(data.value);
});

//------------------------------------------------------>
</script>

<template>
  <div class="request">
    <!-- Colocar un nuevo contenedor para colocar el agregado de solicitudes en el la parte de la lista -->
    <h1>Solicitudes de Propuestas de trabajo de grado</h1>
    <div class="container request__container">
      <!-- Colocar un nuevo contenedor para el filtrado -->

      <div class="request__container__display">
        <div class="request__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            Solicitud
          </button>
          <button @click="actionShowPlanillaCrear()">
            <img src="../assets/imgs/add-circle-outline.svg" alt="" />Crear
            Planilla
          </button>
        </div>

        <div class="request__container__display__list">
          <Record
            class="request__container__display__list__record"
            v-for="e in data.value"
            :key="e.id_tg"
            :titulo="e.titulo"
            :modalidad="e.modalidad"
            :estatus="e.estatus"
            @click="clickenComponente(e.id_tg)"
          />
        </div>
      </div>

      <div class="request__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form
          class="request__container__preview__form up-de"
          @submit.prevent="submit"
          v-show="showPlanillaUpDe"
        >
          <div class="request__container__preview__form__inputs">
            <p for="">Titulo del Trabajo</p>
            <input type="text" v-model="planilla.titulo" />
            <p for="">Modalidad</p>
            <select name="modalidad" id="">
              <option value="E">Experimental</option>
              <option value="I">Instrumental</option>
            </select>
          </div>
          <div class="actions">
            <button
              type="submit"
              @click=" actualizarPlanilla(planilla.id_tg)"
            >
              Actualizar planilla
            </button>
            <button
              @click="eliminarPlanilla(planilla.id_tg)"
            >
              Eliminar planilla
            </button>
          </div>
        </form>

        <crearSolicitud :showPlanillaCreate="showPlanillaCreate" @actualizarData="()=> actualizarLista = true" />
      </div>
    </div>
  </div>
</template>