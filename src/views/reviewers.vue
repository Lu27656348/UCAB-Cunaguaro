<script setup>
import { ref, reactive, onMounted } from "vue";
import * as api from "../modules/apiTools.js";
import { PropuestaTg } from "../modules/planillaPropuesta.js";
import { PlanillaDesignacionRevisor } from '../modules/planillaDesignacionRevisor.js';

let dataPropuestasPorRevisor = reactive([]);

//control de formulario de designacion
let showDesignarTutor = ref(false);

//Lista de comites en bdd
let profesoresADesignar = ref([]);
let formularioPropuesta = ref(new PropuestaTg());

const clickenComponente = async (id) => {
  formularioPropuesta.value = await api.obtenerTGById(id);
  console.log( formularioPropuesta.value)
};

const designarTutor = async () => {
  console.log("formularioPropuesta");
  console.log(formularioPropuesta.value.id_profesor_revisor);
  console.log(formularioPropuesta.value.id_tg);
  
  await api.designarRevisor( 
    formularioPropuesta.value.id_tg, 
    formularioPropuesta.value.id_profesor_revisor 
  );

  let alumnos = await api.obtenerEstudianteDeTG(formularioPropuesta.value.id_tg);
  let revisor =  await api.obtenerProfesorByCedula(formularioPropuesta.value.id_profesor_revisor );
  if(formularioPropuesta.value.modalidad === 'E'){
    let tutor_academico =  await api.obtenerProfesorByCedula(formularioPropuesta.value.id_tutor_academico );
    let planillaDesignacionDeRevisor = new PlanillaDesignacionRevisor(
    formularioPropuesta.value.titulo,
    tutor_academico,
    new Date(),
    { nombre: 'Luz Medina', correo_administrador: 'lamedina@wlaluchocorp.com' },
    formularioPropuesta.value.modalidad,
    `${revisor.nombres} ${revisor.apellidos}`,
    "Agregar organizacion"
    );
    planillaDesignacionDeRevisor.añadirAlumno(alumnos[0])
    console.log("planillaDesignacionDeRevisor")
    console.log(planillaDesignacionDeRevisor)
    planillaDesignacionDeRevisor.imprimir();
  }else{
    let tutor_empresarial =  await api.obtenerExternosById(formularioPropuesta.value.id_tutor_empresarial );
    let planillaDesignacionDeRevisor = new PlanillaDesignacionRevisor(
    formularioPropuesta.value.titulo,
    tutor_empresarial,
    new Date(),
    { nombre: 'Luz Medina', correo_administrador: 'lamedina@wlaluchocorp.com' },
    formularioPropuesta.value.modalidad,
    `${revisor.nombres} ${revisor.apellidos}`,
    "Agregar organizacion"
    );
    planillaDesignacionDeRevisor.añadirAlumno(alumnos[0])
    planillaDesignacionDeRevisor.imprimir();
  }
  
};

const rechazarPropuesta = async () => {
  await api.rechazarPropuesta(formularioPropuesta.value.id_propuesta)
  alert("Rechazada por Revisor");
};

const aprobarPropuesta = async () => {
  await api.aprobarPropuestaRevisor( formularioPropuesta.value.comite_evaluador.id, formularioPropuesta.value.id_propuesta );
  dataPropuestasPorRevisor.value = await api.obtenerPropuestaSinRevisor();
  alert("Aprobada por Revisor");
};
onMounted(async () => {
  dataPropuestasPorRevisor.value = await api.obtenerPropuestaSinRevisor();
  profesoresADesignar.value = await api.obtenerProfesores();
});
</script>
<template>
  <div class="request">
    <h1>Designacion de Revisor</h1>
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
            v-for="t in dataPropuestasPorRevisor.value"
            :key="t.id_tg"
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
        <form action="" class="committe__container__preview__form"></form>
        <div class="create-state">
          <div class="progressbar">
            <div class="progressbar--content"></div>
          </div>
          <div class="create-carousel">
            <h2>Visualización del documento de solicitud</h2>
            <div class="request__container__preview__form up-de">
              <div class="request__container__preview__form__inputs">
                <p>Titulo del Trabajo</p>
                <input
                  disabled
                  type="text"
                  v-model="formularioPropuesta.titulo"
                />
                <p>Modalidad</p>
                <input
                  disabled
                  type="text"
                  v-model="formularioPropuesta.modalidad"
                />
                <select
                  name="profesoresADesignar"
                  id=""
                  v-model="formularioPropuesta.id_profesor_revisor"
                >
                  <option
                    v-for="p in profesoresADesignar"
                    :key="p.nombres"
                    :value="p.cedula"
                  >
                    {{ p.nombres + ' ' + p.apellidos }}
                  </option>
                </select>
              </div>

              <div class="actions">
                <button
                  class="login__form__btn succes"
                  @click="designarTutor()"
                >
                  Designar Tutor ☻
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