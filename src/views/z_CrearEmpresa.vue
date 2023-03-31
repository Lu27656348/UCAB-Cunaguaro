<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = ref([]);

onMounted(async () => {
  data.value = await api.obtenerPropuestas("A");
  dataConsejo.value = await api.obtenerCDE();
  dataEmpresas.value = await api.obtenerEmpresas();
});

let crearEmpresa = ref(new FormularioEmpresa());

const añadirEmpresa = async () => {
  await api.crearEmpresa(crearEmpresa.value);
  dataEmpresas.value = await api.obtenerEmpresas();
  crearEmpresa.value.nombre = '';
  crearEmpresa.value.direccion = '';
  crearEmpresa.value.telefono = '';
};
</script>
<template>
  <div class="request">
    <h1>Crear una empresa</h1>
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
            v-for="e in dataEmpresas"
            :key="e.id_empresa"
          >
            <p>{{ e.id_empresa }}</p>
            <p>{{ e.nombre }}</p>
            <p>{{ e.direccion }}</p>
            <p>{{ e.telefono }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form action="" class="committe__container__preview__form">
          <div class="request__container__preview__form up-de">
            <p>Nombre Empresa</p>
            <input
              type="text"
              placeholder="Nombre Empresa"
              v-model="crearEmpresa.nombre"
            />
            <p>Direccion</p>
            <input
              type="text"
              placeholder="Direccion"
              v-model="crearEmpresa.direccion"
            />
            <p>Telefono</p>
            <input
              type="number"
              placeholder="Telefono"
              v-model="crearEmpresa.telefono"
            />
            <div class="actions">
              <button 
                class="login__form__btn succes" 
                @click="añadirEmpresa()"
                :disabled="
                  crearEmpresa.nombre == '' ||
                  crearEmpresa.direccion == '' ||
                  crearEmpresa.telefono == ''
                "
              >
                Añadir Empresa
              </button>
            </div>
          </div>
          <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
        </form>
      </div>
    </div>
  </div>
</template>
<style>
/*Esta etiqueta esta vacia*/
</style>