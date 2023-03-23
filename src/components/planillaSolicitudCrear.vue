<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { PlanillaCrearSolicitud } from "../modules/classes/planillaCrearSolicitud.js";
import { PlanillaPropuestaTEG } from "../modules/classes/planillaPropuestaTEG.js";
import { PlanillaPropuestaTIG } from "../modules/classes/planillaPropuestaTIG.js";
import { FormularioEmpresa } from '../modules/classes/formularioEmpresa.js';

const props = defineProps({
  showPlanillaCreate: Boolean,
});

//const emit = defineEmits(["actualizarData"]);
const crearSolicitudForm = ref(new PlanillaCrearSolicitud());
let crearEmpresa = new FormularioEmpresa();

let dataEmpresas = reactive([]);
//let dataProfesionalesExternos = reactive([]);
let idEmpresaSeleccionada = ref(null);

const añadirEmpresa = async () => {
  await api.crearEmpresa(crearEmpresa);
  console.log(crearEmpresa);
  dataEmpresas.value = await api.obtenerEmpresas();
  crearSolicitudForm.value.ocultarAddEmpresa();
};

async function buscarEstudiante() {
  const resEstudiante = await api.obtenerEstudianteByCedula(
    crearSolicitudForm.value.alumnos[0].cedula
  );
  crearSolicitudForm.value.alumnos[0].apellidos = resEstudiante.apellidos;
  crearSolicitudForm.value.alumnos[0].nombres = resEstudiante.nombres;
  crearSolicitudForm.value.alumnos[0].cedula = resEstudiante.cedula;
  crearSolicitudForm.value.alumnos[0].email = resEstudiante.email;
  crearSolicitudForm.value.alumnos[0].telefono = resEstudiante.telefono;
}

async function buscarTutor() {
  const resTutor = await api.obtenerProfesorByCedula(
    crearSolicitudForm.value.tutor.cedula
  );
  crearSolicitudForm.value.tutor.apellidos = resTutor.apellidos;
  crearSolicitudForm.value.tutor.nombres = resTutor.nombres;
  crearSolicitudForm.value.tutor.cedula = resTutor.cedula;
  crearSolicitudForm.value.tutor.email = resTutor.email;
  crearSolicitudForm.value.tutor.telefono = resTutor.telefono;
}

async function buscarTutorEmpresarial() {
  const resTutorEmpresarial = await api.obtenerExternoByCedula(
    crearSolicitudForm.value.tutorEmpresarial.cedula
  );
  crearSolicitudForm.value.tutorEmpresarial.nombres =
    resTutorEmpresarial.nombres;
  crearSolicitudForm.value.tutorEmpresarial.apellidos =
    resTutorEmpresarial.apellidos;
  crearSolicitudForm.value.cedula =
    resTutorEmpresarial.cedula;
}

crearSolicitudForm.value.empresa.id_empresa = computed(() => {

  if (idEmpresaSeleccionada.value != null) {
    console.log(idEmpresaSeleccionada.value)
    let arregloEmpresa = dataEmpresas.filter(
      (t) => t.id_empresa == idEmpresaSeleccionada.value
    );

    crearSolicitudForm.value.empresa.nombre = arregloEmpresa[0].nombre;
    crearSolicitudForm.value.empresa.direccion = arregloEmpresa[0].direccion;
    crearSolicitudForm.value.empresa.telefono = arregloEmpresa[0].telefono;

    return arregloEmpresa[0].id_empresa;
  }
  return "";
});

async function insertarPlanilla(){
  console.log("crearSolicitudForm.value")
  console.log(crearSolicitudForm.value)
  let planillaGenerada;
  
  if (crearSolicitudForm.value.trabajoDeGrado.modalidad == "E") {
    await api.crearTrabajoGradoExperimental(crearSolicitudForm.value.trabajoDeGrado, crearSolicitudForm.value.alumnos[0].cedula,crearSolicitudForm.value.tutor.cedula,crearSolicitudForm.value.empresa.id_empresa);
    planillaGenerada = new PlanillaPropuestaTEG(
      crearSolicitudForm.value.trabajoDeGrado.titulo,
      crearSolicitudForm.value.empresa.nombre,
      crearSolicitudForm.value.empresa,
      crearSolicitudForm.value.tutor
    );
  } else {
    const cedulatutorempresarial = await api.obtenerExternoByCedula(crearSolicitudForm.value.tutorEmpresarial.cedula);
    console.log("cedulatutorempresarial")
    console.log(cedulatutorempresarial)
    await api.crearTrabajoGradoInstrumental(crearSolicitudForm.value.trabajoDeGrado, crearSolicitudForm.value.alumnos[0].cedula,cedulatutorempresarial.id_externo);
    planillaGenerada = new PlanillaPropuestaTIG(
      crearSolicitudForm.value.trabajoDeGrado.titulo,
      crearSolicitudForm.value.empresa.nombre,
      crearSolicitudForm.value.empresa,
      crearSolicitudForm.value.tutorEmpresarial
    );
  }
  planillaGenerada.añadirAlumno(crearSolicitudForm.value.alumnos[0]);
  planillaGenerada.imprimir();
  //crearSolicitudForm.value.progressbarState += crearSolicitudForm.value.progressValue;
  //location.reload()
}

let textarea = ref( '' );

textarea.value = computed(()=>{
  if (textarea == undefined){
    console.log(textarea.value);
  return '';
  }
});

const mostrarTextArea = ()=>{
  console.log(textarea.value);
}

onMounted( async ()=>{
  dataEmpresas = await api.obtenerEmpresas();
  crearSolicitudForm.value.crearSolicitud();
})
//------------------------------------------------------>
</script>
<template>
  <div class="create-state" v-show="showPlanillaCreate">
    <div class="progressbar">
      <div
        class="progressbar--content"
        :style="{ width: crearSolicitudForm.progressbarState + '%' }"
      ></div>
    </div>
    <div class="create-carousel">
      <div class="students" v-show="crearSolicitudForm.showTituloAlumno">
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <div class="request__container__preview__form__inputs">
            <!-- Trabajo de grado -->
            <p @click="mostrarTextArea()" for="">Titulo del Trabajo</p>
            <textarea
            maxlength="200"
              v-model="crearSolicitudForm.trabajoDeGrado.titulo"
              class="request__container__preview__form__inputs--titulo-tg"
              placeholder="Tutilo de Propuesta TG"
            ></textarea>
            <p for="">Modalidad</p>
            <select
              name="modalidad"
              id=""
              v-model="crearSolicitudForm.trabajoDeGrado.modalidad"
            >
              <option value="E">Experimental</option>
              <option value="I">Instrumental</option>
            </select>
            <!-- Estudiante -->
            <p for="">Cedula Alumno</p>
            <input
              type="number"
              placeholder="V27301846"
              v-model="crearSolicitudForm.alumnos[0].cedula"
            />
            <!--<p for="">Nombres</p>-->
            <input
              disabled
              type="text"
              placeholder="Nombres"
              v-model="crearSolicitudForm.alumnos[0].nombres"
            />
            <!--<p for="">Apellidos</p>-->
            <input
              disabled
              type="text"
              placeholder="Apellidos"
              v-model="crearSolicitudForm.alumnos[0].apellidos"
            />
          </div>
          <div class="actions">
            <button
              style="display: none"
              type="submit "
              @click="buscarEstudiante()"
            ></button>
            <!--/*
            <button
              :disabled="
                crearSolicitudForm.alumnos[0].nombres == '' ||
                crearSolicitudForm.trabajoDeGrado.modalidad == '' ||
                crearSolicitudForm.trabajoDeGrado.tituloTG == ''
                  ? true
                  : false
              "
              @click="crearSolicitudForm.tituloAlumnoCompletado()"
            >
              Siguiente
            </button>
            */-->
            <button
            :disabled=" crearSolicitudForm.trabajoDeGrado.modalidad == ''? true : false " 
              @click="crearSolicitudForm.tituloAlumnoCompletado()"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div class="tutor" v-show="crearSolicitudForm.showTutor && crearSolicitudForm.trabajoDeGrado.modalidad == 'E'">
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATituloAlumno"
          />
          <!-- Tutor Academico -->
          <div class="request__container__preview__form__inputs">
            <p for="">Cédula del Posible Tutor Académico</p>
            <input
              type="number"
              placeholder="V27301846"
              v-model="crearSolicitudForm.tutor.cedula"
            />
            <!--<p for="">Nombres</p>-->
            <input
              disabled
              type="text"
              placeholder="Nombres"
              v-model="crearSolicitudForm.tutor.nombres"
            />
            <!--<p for="">Apellidos</p>-->
            <input
              disabled
              type="text"
              placeholder="Apellidos"
              v-model="crearSolicitudForm.tutor.apellidos"
            />
            <!--<p for="">Años de Experienci a</p>-->
            <input disabled type="number" placeholder="4 años" />
          </div>
          <div class="actions">
            <button
              style="display: none"
              type="submit "
              @click="buscarTutor()"
            ></button>
            <!--<button
              :disabled="crearSolicitudForm.tutor.nombres == '' ? true : false"
              @click="crearSolicitudForm.tutorCompletado()"
            >
              Siguiente
            </button>-->
            <button
              @click="crearSolicitudForm.tutorCompletado()"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div class="external-profesional"
        v-show="crearSolicitudForm.showTutor && crearSolicitudForm.trabajoDeGrado.modalidad == 'I'"
      >
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATituloAlumno"
          />
          <!-- Tutor Empresarial -->
          <div class="request__container__preview__form__inputs">
            <p>Id de Tutor Empresarial</p>
            <input
              type="number"
              placeholder="59885-VNL"
              v-model="crearSolicitudForm.tutorEmpresarial.cedula"
            />
            <!--<p for="">Nombres</p>-->
            <input
              disabled
              type="text"
              placeholder="Nombres"
              v-model="crearSolicitudForm.tutorEmpresarial.nombres"
            />
            <!--<p for="">Apellidos</p>-->
            <input
              disabled
              type="text"
              placeholder="Apellidos"
              v-model="crearSolicitudForm.tutorEmpresarial.apellidos"
            />
            <!--<p for="">Años de Experienci a</p>-->
            <input disabled type="number" placeholder="4 años" />
          </div>
          <div class="actions">
            <button
              style="display: none"
              type="submit "
              @click="buscarTutorEmpresarial()"
            ></button>
            <button
              @click="crearSolicitudForm.tutorCompletado()"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
      <div class="company" v-show="crearSolicitudForm.showEmpresa">
        <form
          class="request__container__preview__form"
          @submit.prevent="submit"
        >
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.volverATutor()"
          />
          <div class="request__container__preview__form__inputs">
            <!-- Empresa-->
            <p>Seleccione la empresa:</p>
            <div
            style="display: flex; align-items: center; justify-content: center;"
            >
              <select name="Empresa" id="" v-model="idEmpresaSeleccionada">
                <option
                  v-for="t in dataEmpresas"
                  :key="t.id_empresa"
                  :value="t.id_empresa"
                >
                  {{ t.nombre }}
                </option>
              </select>
              <button @click="crearSolicitudForm.mostrarAddEmpresa()">+</button>
            </div>
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.nombre"
              placeholder="nombre"
            />
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.direccion"
              placeholder="direccion"
            />
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.telefono"
              placeholder="telefono"
            />
          </div>
          <div class="actions">
            <button class="succes"
              :disabled="
                crearSolicitudForm.empresa.id_empresa == -1 ? true : false
              "
              @click="insertarPlanilla()"
            >
              Completado!
            </button>
          </div>
        </form>
      </div>
      <div class="company plus" v-show="crearSolicitudForm.showAddEmpresa">
        <div action="" class="request__container__preview__form">
          <img
            src="../assets/imgs/arrow-back-circle-outline.svg"
            alt=""
            @click="crearSolicitudForm.ocultarAddEmpresa"
          />
          <div class="request__container__preview__form__inputs">
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
          </div>
          <button
            class="login__form__btn succes"
            @click="añadirEmpresa()"
          >
            Añadir Empresa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>