<script setup>
import { EmailAuthCredential } from "firebase/auth";
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = ref([]);

let externo = ref({
  id_externo: '',
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
 const externoRequest =  await api.obtenerExternoByCedula(id);
 externo.value.id_externo = externoRequest.id_externo;
 externo.value.cedula = externoRequest.cedula;
 externo.value.nombres = externoRequest.nombres;
 externo.value.apellidos = externoRequest.apellidos;
 externo.value.email = externoRequest.email;
 externo.value.oficina = externoRequest.oficina;
 externo.value.habitacion = externoRequest.habitacion;
 externo.value.experiencia = externoRequest.experiencia;
 externo.value.fecha_graduado = externoRequest.fecha_graduado;
 externo.value.cargo = externoRequest.cargo;
 externo.value.telefono = externoRequest.telefono;
 console.log(externoRequest)
};

const añadirExterno = async () => {
    await api.añadirExterno(externo.value);
    data.value = await api.obtenerExternos();
}
const actualizarExterno = async () => {
  await api.actualizarExterno(externo.value)
  data.value = await api.obtenerExternos();

}
const eliminarExterno = async () => {
  await api.eliminarExterno(externo.value.id_externo)
  data.value = await api.obtenerExternos();

}
onMounted(async () => {
  data.value = await api.obtenerExternos();
  console.log(data.value);
});

</script>
<template>
  <div class="request">
    <h1>Catalogo de Externos</h1>
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
            :key="e.id_externo"
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
       <!-- <form action="" class="committe__container__preview__form"> -->
          <div class="request__container__preview__form up-de">
            <p>Cedula</p>
            <input type="text" v-model="externo.cedula">
            <p>Apellidos</p>
            <input type="text" v-model="externo.apellidos">
            <p>Nombres</p>
            <input type="text" v-model="externo.nombres">
            <p>Email</p>
            <input type="email" v-model="externo.email">
            <p>Telefono</p>
            <input type="text" v-model="externo.telefono">
            <p>Oficina</p>
            <input type="text" v-model="externo.oficina">
            <p>Habitacion</p>
            <input type="text" v-model="externo.habitacion">
            <p>Experiencia</p>
            <input type="number" v-model="externo.experiencia">
            <p>Fecha de Graduado</p>
            <input type="date" v-model="externo.fecha_graduado">
            <p>Cargo</p>
            <input type="text" v-model="externo.cargo">
            <div class="actions">
              <button 
                class="login__form__btn succes"
                @click="añadirExterno()"
              >
                Añadir Externo
              </button>
              <button 
                class="login__form__btn succes" 
                @click="actualizarExterno()"
              >
                Actualizar Externo
              </button>
              <button 
                class="login__form__btn succes" 
                @click="eliminarExterno()"
              >

                Eliminar Externo
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