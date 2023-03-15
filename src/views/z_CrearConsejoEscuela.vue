<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from '../modules/formularioEmpresa.js';

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);

let crearEmpresa = new FormularioEmpresa();

const añadirConsejo = async () => {
  console.log('Se creo el consejo, yeiii ^^');
};

onMounted(async () => {
  data.value = await api.obtenerPropuestas('A');
  dataConsejo.value = await api.obtenerCDE();
  dataEmpresas.value = await api.obtenerEmpresas();
});

</script>
<template>
  <div class="request">
    <h1>Crear Consejo de Escuela</h1>
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
            v-for="e in dataConsejo.value"
            :key="e.id_empresa"
          >
            <p>{{ e.id_cde}}</p>
            <p>{{ e.fecha_conformacion}}</p>
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
                <p>Nombre Empresa</p>
                <input type="text" placeholder="Nombre Empresa" v-model="crearEmpresa.nombre">
                <p>Direccion</p>
                <input type="text" placeholder="Direccion" v-model="crearEmpresa.direccion">
                <p>Telefono</p>
                <input type="number" placeholder="Telefono" v-model="crearEmpresa.telefono">
              </div>
              <div class="actions">
                <button class="login__form__btn succes"
                @click="añadirEmpresa()"
                >
                  Añadir Empresa 
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