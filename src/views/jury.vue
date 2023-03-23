<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";

import { FormularioEmpresa } from "../modules/classes/formularioEmpresa.js";

let data = reactive([]);
let dataConsejo = reactive([]);
let dataEmpresas = reactive([]);
let dataProfesores = reactive([]);

let profesoresDesignados = reactive(["", "", "", ""]);

let planilla = ref({
  id_tg: "",
  titulo: "",
  modalidad: "",
  estatus: "",
  id_tutor_academico: "",
  id_tutor_empresarial: "",
});

let crearEmpresa = new FormularioEmpresa();

const añadirConsejo = async () => {
  console.log("Se creo el consejo, yeiii ^^");
};

const designarJurado = async (profesores, id_tg) => {
  console.log(dataProfesores.value);
  await api.crearJurados(profesoresDesignados, id_tg);
};

const clickenComponente = async (id) => {
  const respuesta = await api.obtenerTGById(id);
  console.log("clickenComponente()");
  console.log("planilla");
  planilla.value.id_tg = respuesta.id_tg;
  planilla.value.id_tg_formateado = respuesta.id_tg_formateado;
  planilla.value.titulo = respuesta.titulo;
  planilla.value.modalidad = respuesta.modalidad;
  planilla.value.estatus = respuesta.estatus;
  planilla.value.id_tutor_academico = respuesta.id_tutor_academico;
  planilla.value.id_tutor_empresarial = respuesta.id_tutor_empresarial;
  console.log(planilla.value);
};

onMounted(async () => {
  data.value = await api.obtenerTGsinJurado();
  dataProfesores.value = await api.obtenerProfesores();
  console.log(data.value);
});
</script>
<template>
  <div class="request">
    <h1>Designar Jurado</h1>
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
            :key="e.id_tg"
            @click="clickenComponente(e.id_tg)"
          >
            <p>{{ e.titulo }}</p>
            <p>{{ e.estatus }}</p>
          </div>
        </div>
      </div>
      <div class="committe__container__preview">
        <h2>Visualización del documento de solicitud</h2>
        <form class="request__container__preview__form up-de">
          <input type="text" placeholder="Id TG" v-model="planilla.id_tg_formateado">
          <textarea
            disabled
            maxlength="200"
            v-model="planilla.titulo"
            class="request__container__preview__form__inputs--titulo-tg"
            placeholder="Tutilo de Propuesta TG"
          ></textarea>
          <div class="request__container__preview__form__inputs">
            <p>J1</p>
            <select name="profesor" id="" v-model="profesoresDesignados[0]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J2</p>
            <select name="profesor" id="" v-model="profesoresDesignados[1]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J1-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[2]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
            <p>J2-suplente</p>
            <select name="profesor" id="" v-model="profesoresDesignados[3]">
              <option
                v-for="p in dataProfesores.value"
                :key="p.cedula"
                :value="p.cedula"
              >
                {{ p.nombres + "" + p.apellidos }}
              </option>
            </select>
          </div>
          <div class="actions">
            <button
              class="login__form__btn succes"
              @click="designarJurado(profesoresDesignados, planilla.id_tg)"
            >
              Designar Jurado
            </button>
          </div>
        </form>
        <!-- aqui van los formularios necesarios para el proceso de crear una asignacion de revisor a la propuesta -->
      </div>
    </div>
  </div>
</template>