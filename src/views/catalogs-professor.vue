<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);

let profesor = ref({
  cedula: '',
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  oficina: '',
  habitacion: '',
  experiencia: '',
  fecha_graduado: '',
  cargo: ''
});
const clickenComponente = async (id) => {
 const profesorRequest =  await api.obtenerProfesorByCedula(id);
 profesor.value.cedula  = profesorRequest.cedula
 profesor.value.nombres = profesorRequest.nombres
 profesor.value.apellidos = profesorRequest.apellidos
 profesor.value.email = profesorRequest.email
 profesor.value.telefono = profesorRequest.telefono
 profesor.value.oficina = profesorRequest.oficina
 profesor.value.habitacion = profesorRequest.habitacion
 profesor.value.experiencia = profesorRequest.experiencia
 profesor.value.fecha_graduado = profesorRequest.fecha_graduado
 profesor.value.cargo = profesorRequest.cargo

 console.log(profesorRequest)
};

const añadirProfesor = async () => {
  await api.añadirProfesor(profesor.value)
  data.value = await api.obtenerProfesores();
}

const actualizarProfesor = async () => {
  await api.actualizarProfesor(profesor.value)
  data.value = await api.obtenerProfesores();
}

const eliminarProfesor = async () => {
  await api.eliminarProfesor(profesor.value.cedula)
  data.value = await api.obtenerProfesores();
}
onMounted(async () => {
  data.value = await api.obtenerProfesores();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Profesores</h1>
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
            :key="e.cedula"
            @click="clickenComponente(e.cedula)"
          >
            <p>Cedula: {{ e.cedula }}</p>
            <p>Apellidos: {{ e.apellidos }}</p>
            <p>Nombres: {{ e.nombres }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <div class="committe__container__preview__form">
       <!-- <form action="" class="committe__container__preview__form">  -->
          <div class="request__container__preview__form up-de">
            <p>Cedula</p>
            <input type="text" v-model="profesor.cedula">
            <p>Apellidos</p>
            <input type="text" v-model="profesor.apellidos">
            <p>Nombres</p>
            <input type="text" v-model="profesor.nombres">
            <p>Email</p>
            <input type="email" v-model="profesor.email">
            <p>Telefono</p>
            <input type="number" v-model="profesor.telefono">
            <p>Oficina</p>
            <input type="text" v-model="profesor.oficina">
            <p>Habitacion</p>
            <input type="text" v-model="profesor.habitacion">
            <p>Experiencia</p>
            <input type="number" v-model="profesor.experiencia">
            <p>Fecha de Graduado</p>
            <input type="date" v-model="profesor.fecha_graduado">
            <p>Cargo</p>
            <input type="text" v-model="profesor.cargo">
            <div class="actions">
              <button 
                class="login__form__btn succes"
                @click="añadirProfesor()"
              >
                Añadir Profesor
              </button>
              <button 
                class="login__form__btn succes"
                @click="actualizarProfesor()"
              >
                Actualizar Profesor
              </button>
              <button 
                class="login__form__btn succes"
                @click="eliminarProfesor()"
              >
                Eliminar Profesor
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
       <!-- </form> -->
      </div>
      </div>
    </div>
  </div>
</template>