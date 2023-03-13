<script setup>

import Record from "../components/record.vue";
import crearSolicitud from "../components/planillaSolicitudCrear.vue";
import { PropuestaTg } from "../modules/planillaPropuesta.js";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { generarCartaDesignacionTutorTEG } from '../modules/generadorDOCX/carta_designacion_tutor_teg.js';
import { generarCartaDesignacionTutorTIG } from '../modules/generadorDOCX/carta_designacion_tutor_tig.js';

let revisor = ref('');
let data = reactive([]);
let tutor_academico = reactive('');
let planilla = reactive({
  cedula: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  oficina: '',
  habitacion: ''
});
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
let tutor_empresarial= reactive('');
let cde = reactive({
  id_cde: '',
  fecha_conformacion: ''
});
let formularioPropuesta = ref(new PropuestaTg());
const clickenComponente = async (id) => {
  console.log(id)
  formularioPropuesta.value = await api.obtenerTGById(id)
  console.log(formularioPropuesta.value)
};
const insertarEstudiante = () =>{
  api.insertarEstudiantes(estudiante);
};
const RechazarTG = async (id) =>{

  await api.rechazarPropuestaCDE(id)
  alert("rechazado")
  data.value = await api.obtenerPropuestas('PE');
};
const aceptarTG = async (id) =>{
  //await api.aprobarPropuestaCDE(id)
 //await api.asignarTutorAcademico(id,tutor.value.cedula)
  alert("aceptado");
  const estudiante = await api.obtenerEstudianteDeTG(id);
  console.log("estudiante")
  console.log(estudiante)
  /*
  const tutor = await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico)
  console.log("tutor")
  console.log(tutor)
  */
  const tutor_empresarial = await api.obtenerExternosById(formularioPropuesta.value.id_tutor_empresarial)
  console.log("tutor empresarial")
  console.log(tutor_empresarial)
  //Generar cartas de designacion de tutor aqui
  const Carta_designacion = {
    propuesta: {
        titulo: formularioPropuesta.value.titulo,
        modalidad: formularioPropuesta.value.modalidad,
        alumnno: estudiante,
        tutor: tutor.apellidos + ', ' + tutor.nombres
    },
    fecha_designacion: new Date(),
    CDE: cde.id_cde,
    administrador: "Luz E. Medina"
  }
  const Carta_designacion_tig = {
    propuesta: {
        titulo: formularioPropuesta.value.titulo,
        modalidad: formularioPropuesta.value.modalidad,
        alumnno: estudiante,
        tutor: tutor_empresarial.apellidos + ', ' + tutor_empresarial.nombres
    },
    fecha_designacion: new Date(),
    CDE: cde.id_cde,
    administrador: 'Luz E. Medina',
    empresa: 'CorpoElect'
  }   
  generarCartaDesignacionTutorTIG(Carta_designacion_tig)
  //generarCartaDesignacionTutorTEG(Carta_designacion)
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
  //console.log("data.value")
  //console.log(data.value)
});

</script>
<template>
  <div>
    <Record
            v-for="e in data.value"
            :key="e.id_tg"
            :titulo="e.titulo"
            :modalidad="e.modalidad"
            :estatus="e.estatus"
            @click="clickenComponente(e.id_tg)"
      />
      <p for="">Tutor academico</p>
  </div>
  <div>
          <input type="text" v-model="tutor_academico" />
          <button
              @click="buscarTutorAcademico(tutor_academico)"
            >
              Buscar Tutor
          </button>
          <input type="text" v-model="tutor_empresarial" />
          <button
              @click="buscarTutorEmpresarial(tutor_empresarial)"
            >
              Buscar Tutor Empresarial
          </button>
          <input type="text" v-model="cde.id_cde" />
          <button
              @click="buscarCDE(cde.id_cde)"
            >
              Buscar CDE
          </button>
          <button
              type="submit"
              @click=" aceptarTG(formularioPropuesta.id_tg)"
            >
              Aceptar planilla
            </button>
          <button
              @click="RechazarTG(formularioPropuesta.id_tg)"
            >
              Rechazar planilla
          </button>
  </div>
          
         
          

</template>