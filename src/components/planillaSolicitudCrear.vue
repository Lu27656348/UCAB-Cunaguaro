<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import * as api from "../modules/apiTools.js";
import { PlanillaCrearSolicitud } from "../modules/planillaCrearSolicitud.js";
import { PlanillaPropuestaTEG } from "../modules/planillaPropuestaTEG.js";
import { PlanillaPropuestaTIG } from "../modules/planillaPropuestaTIG.js";

const props = defineProps({
  showPlanillaCreate: Boolean,
});

const emit = defineEmits(["actualizarData"]);
const crearSolicitudForm = ref(new PlanillaCrearSolicitud());

let dataEmpresas = reactive([]);
//let dataProfesionalesExternos = reactive([]);
let idEmpresaSeleccionada = ref(null);

async function buscarEstudiante() {
  const resEstudiante = await api.obtenerEstudianteByCedula(
    crearSolicitudForm.value.alumnos[0].cedula
  );
  crearSolicitudForm.value.alumnos[0].apellidos = resEstudiante.apellidos;
  crearSolicitudForm.value.alumnos[0].nombres = resEstudiante.nombres;
  crearSolicitudForm.value.alumnos[0].cedula = resEstudiante.cedula;
}

async function buscarTutor() {
  const resTutor = await api.obtenerProfesorByCedula(
    crearSolicitudForm.value.tutor.cedula
  );
  crearSolicitudForm.value.tutor.apellidos = resTutor.apellidos;
  crearSolicitudForm.value.tutor.nombres = resTutor.nombres;
  crearSolicitudForm.value.tutor.cedula = resTutor.cedula;
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

crearSolicitudForm.value.empresa.idEmpresa = computed(() => {
  if (idEmpresaSeleccionada.value != null) {
    let arregloEmpresa = dataEmpresas.filter(
      (t) => t.id_empresa == idEmpresaSeleccionada.value
    );

    crearSolicitudForm.value.empresa.nombre = arregloEmpresa[0].nombre;
    crearSolicitudForm.value.empresa.rif = arregloEmpresa[0].rif;
    crearSolicitudForm.value.empresa.direccion = arregloEmpresa[0].direccion;
    crearSolicitudForm.value.empresa.telefono = arregloEmpresa[0].telefono;

    return arregloEmpresa[0].id_empresa;
  }
  return "";
});

async function insertarPlanilla() {
  let planillaGenerada;
  if (crearSolicitudForm.value.trabajoDeGrado.modalidad == "E") {
    await api.crearTrabajoGradoExperimental(crearSolicitudForm.value.trabajoDeGrado, crearSolicitudForm.value.alumnos[0].cedula,crearSolicitudForm.value.tutor.cedula);
    planillaGenerada = new PlanillaPropuestaTEG(
      crearSolicitudForm.value.trabajoDeGrado.titulo,
      crearSolicitudForm.value.empresa.nombre,
      crearSolicitudForm.value.empresa,
      {
        nombre: `${crearSolicitudForm.value.tutor.nombres} ${crearSolicitudForm.value.tutor.apellidos}`,
        cedula: crearSolicitudForm.value.tutor.cedula,
        email: "franklinBelloBellisimo@ucab.edu.ve",
        telefono: "04121598764",
        profesion: "Ingeniero Informatico",
        fecha_entrega: new Date(),
      }
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
      {
        nombre: `${crearSolicitudForm.value.tutorEmpresarial.nombres} ${crearSolicitudForm.value.tutorEmpresarial.apellidos}`,
        cedula: crearSolicitudForm.value.tutorEmpresarial.cedula,
        email: "franklinBelloBellisimo@ucab.edu.ve",
        telefono: "04121598764",
        profesion: "Ingeniero Informatico",
        fecha_entrega: new Date(),
      }
    );
  }
  planillaGenerada.a??adirAlumno({
    nombre: `${crearSolicitudForm.value.alumnos[0].nombres} ${crearSolicitudForm.value.alumnos[0].apellidos}`,
    cedula: crearSolicitudForm.value.alumnos[0].cedula,
    telefono: "04147723811",
    email: "wladimirSanvicente@wlachoCorp C.A",
    oficina: "#33",
    habitacion: "Marte, calle 4, al lado del detective marciano",
    fecha_inicio: "02/14/2053",
    horario_propuesto: "2 min al dia",
  });

  planillaGenerada.imprimir();
  //crearSolicitudForm.value.progressbarState += crearSolicitudForm.value.progressValue;
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
              style="
                resize: none;
                padding: 10px;
                width: 80%;
                height: 70px;
                line-height: 1.5;
                border-radius: 5px;
                border: 1px solid #ccc;
                box-shadow: 1px 1px 1px #999;
              "
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
            <p for="">C??dula del Posible Tutor Acad??mico</p>
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
            <!--<p for="">A??os de Experienci a</p>-->
            <input disabled type="number" placeholder="4 a??os" />
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
            <!--<p for="">A??os de Experienci a</p>-->
            <input disabled type="number" placeholder="4 a??os" />
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
            <select name="Empresa" id="" v-model="idEmpresaSeleccionada">
              <option
                v-for="t in dataEmpresas"
                :key="t.id_empresa"
                :value="t.id_empresa"
              >
                {{ t.nombre }}
              </option>
            </select>
            <input
              type="text"
              disabled
              v-model="crearSolicitudForm.empresa.rif"
              placeholder="rif"
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
                crearSolicitudForm.empresa.idEmpresa == -1 ? true : false
              "
              @click="insertarPlanilla()"
            >
              Completado!
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>