<script setup>
import { PropuestaTg } from "../modules/classes/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { FormularioCartaDesigancion } from '../modules/classes/formularioCartaDesignacion.js'
import * as docx from 'docx';
import file_saver from 'file-saver'
import buffer from 'buffer'
const { saveAs } = file_saver
const { Buffer } = buffer
// Load the full build.
const { HeadingLevel,Packer } = docx;

let data = reactive([]);
let dataConsejo = reactive([]);
let dataProfesores = reactive([]);

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
  data.value = await api.obtenerPropuestas('A');
};

const aceptarTG = async (id) =>{
  let tutor_empresarial = null;
  await api.aprobarPropuestaCDE(id)
  //await api.asignarTutorAcademico(id,tutor.value.cedula)
  alert("aceptado");
  const estudiante = await api.obtenerEstudianteDeTG(id);
  const tutor_academico = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico)
  if(formularioPropuesta.value.modalidad === 'I'){
    tutor_empresarial = await api.obtenerExternosById(formularioPropuesta.value.id_tutor_empresarial)
  }
  
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



  data.value = await api.obtenerPropuestas('A');
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

const asignarTutorAcademico = async () =>{
  let tutor_empresarial = null;
  const res = await api.asignarTutorAcademico(formularioPropuesta.value.id_tg ,formularioPropuesta.value.id_tutor_academico);
  const estudiante = await api.obtenerEstudianteDeTG(formularioPropuesta.value.id_tg);
  const tutor_academico = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico)
  if(formularioPropuesta.value.modalidad === 'I'){
    tutor_empresarial = await api.obtenerExternosById(formularioPropuesta.value.id_tutor_empresarial)
  }
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
  //const respuesta = await api.descargarPlanilla(formularioPropuesta.value.id_tg,"Carta Designacion Tutor Academico");
  cartaDesignacion.imprimirPlanilla(formularioPropuesta.value.id_tg)
  //console.log("respuesta")
  //console.log(respuesta.documento)
  //const buff = Buffer.from(respuesta.documento.data);
  //const blob = new Blob([buff]); 
  //console.log("blob")
  //console.log(blob)
 // await saveAs(blob, "Descarga desde asignar"+".docx");
  /*
  Packer.toBlob(respuesta.documento.data).then(async blob => {
        await saveAs(blob, "Descarga desde asignar"+".docx");
  });
  */
  console.log('resultado de asignacion');
  console.log(res);
}

onMounted(async () => {
  data.value = await api.obtenerPropuestas('A');
  dataConsejo.value = await api.obtenerCDE();
  dataProfesores.value = await api.obtenerProfesores();
});

</script>
<template>
  <div class="request">
    <h1>Asignacion de Tutor Academico</h1>
    <div class="committe__container">
      <div class="committe__container__display">
        <div class="committe__container__display__controllers">
          <button>
            <img src="../assets/imgs/search-circle-outline.svg" />Buscar
            sdsdsdsd
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
        <h2>Visualización del documento de solicitud</h2>
            <h2>Visualización del documento de solicitud</h2>
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
                <select name="CDE" id="" v-model="formularioPropuesta.id_tutor_academico">
                  <option 
                    v-for="p in dataProfesores.value"
                    :key="p.cedula"
                    :value="p.cedula"
                  >{{ `${p.nombres} ${p.apellidos}` }}</option>
                </select>
              </div>
              <div class="actions">
                <button class="login__form__btn succes"
                @click="asignarTutorAcademico()"
                >
                  Asignar Tutor Academico
                </button>
              </div>
            </div>
            <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
          </div>
        </div>
      </div>
</template>
<style>
/*Esta etiqueta esta vacia*/
</style>