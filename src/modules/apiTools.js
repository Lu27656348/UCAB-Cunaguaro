import * as docx from 'docx';
import file_saver from 'file-saver';

import * as estudiantes from './api/estudiantes.js';
import * as profesores from './api/profesores.js';
import * as externos from './api/externos.js';
import * as empresas from './api/empresas.js';
import * as tgs from './api/tg.js';
import * as comites from './api/comite.js';
import * as revisores from './api/revisor.js';
import * as cde from './api/cde.js';

const { saveAs } = file_saver;
const { HeadingLevel,Packer } = docx;

export const insertarEstudiantes = async (estudiante) =>{
  return estudiantes.insertarEstudiantes(estudiante);
};

export const obtenerEstudiantes = async () => {
  return estudiantes.obtenerEstudiantes();
};

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  return estudiantes.obtenerEstudianteByCedula(cedulaEstudiante);
};

export const obtenerProfesores = async () => {
  return profesores.obtenerProfesores();
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  return profesores.obtenerProfesorByCedula(cedulaProfesor);
};

export const obtenerExternos = async () => {
  return externos.obtenerExternos();
};

export const obtenerExternosById = async ( idExterno) => {
  return externos.obtenerExternosById(idExterno);
};

export const obtenerExternoByCedula = async (cedulaExterno) => {
  return externos.obtenerExternoByCedula(cedulaExterno);
};

export const obtenerEmpresas = async () => {
  return empresas.obtenerEmpresas();
};

export const obtenerEmpresaById = async (idEmpresa) => {
  return empresas.obtenerEmpresaById(idEmpresa);
};

export const crearEmpresa = async (empresa) => {
  empresas.crearEmpresa(empresa);
};

export const obtenerTG = async () => {
  return tgs.obtenerTG();
};

export const obtenerTGById = async (idTG) => {
  return tgs.obtenerTGById(idTG);
};

export const crearTrabajoGradoExperimental = async ( TG, cedulaEstudiante,cedulaTutorAcademico) => {
  tgs.crearTrabajoGradoExperimental(TG, cedulaEstudiante, cedulaTutorAcademico);
};

export const crearTrabajoGradoInstrumental = async ( TG, cedulaEstudiante,cedulaTutorExperimental ) => {
  tgs.crearTrabajoGradoInstrumental(TG, cedulaEstudiante, cedulaTutorExperimental);
};

export const obtenerPropuestas = async ( estatus ) => {
  return tgs.obtenerPropuestas(estatus);
};

export const eliminarPlanilla = async ( idTg ) => {
  tgs.eliminarPlanilla(idTg);
};

export const actualizarPlanilla = async ( planilla ) => {
  tgs.actualizarPlanilla(planilla);
};

export const obtenerPropuestaSinRevisor = async ( ) => {
  return tgs.obtenerPropuestaSinRevisor();
};

export const obtenerComites = async ( estatus ) => {
  return comites.obtenerComites(estatus);
};

export const rechazarPropuestaComite = async ( id_tg ) => {
  comites.rechazarPropuestaComite(id_tg);
};

export const aprobarPropuestaComite = async ( id_tg ) => {
  comites.aprobarPropuestaComite(id_tg);
};

export const obtenerCTG = async ( ) => {
  return comites.obtenerCTG();
};

export const aprobarPropuestaCTG = async ( id_tg,id_ctg,decision_ctg) => {
  fetch('http://localhost:3000/revisa_CTG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_ctg: id_ctg,
        id_tg: id_tg,
        decision_ctg: decision_ctg,
        comentario: null
      })
  })
  .then((response) =>{
    return response.json()
  })
  .then( (data)  => {
    console.log(data)
  })
};
export const rechazarPropuestaCTG = async ( id_tg,id_ctg,decision_ctg ) => {
  fetch('http://localhost:3000/revisa_CTG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_ctg: id_ctg,
        id_tg: id_tg,
        decision_ctg: decision_ctg,
        comentario: null
      })
  })
  .then((response) =>{
    return response.json()
  })
  .then( (data)  => {
    console.log(data)
  })
};
export const designarRevisor = async ( id_tg, id_profesor_revisor) => {
  return comites.designarRevisor(id_tg, id_profesor_revisor);
};

export const obtenerEstudianteDeTG = async ( id_tg ) => {
  return tgs.obtenerEstudianteDeTG(id_tg);
};

export const obtenerPropuestaConRevisorAsignado = async ( ) => {
  return tgs.obtenerPropuestaConRevisorAsignado();
};

export const aprobarPropuestaRevisor = async ( id_tg, observaciones_revisor) => {
  return revisores.aprobarPropuestaRevisor(id_tg,observaciones_revisor);
};

export const rechazarPropuestaRevisor = async ( id_tg, observaciones_revisor) => {
  return revisores.rechazarPropuestaRevisor(id_tg,observaciones_revisor);
};

export const rechazarPropuestaCDE = async ( id_tg ) => {
  return cde.rechazarPropuestaCDE(id_tg);
};

export const aprobarPropuestaCDE = async ( id_tg,id_cde ) => {
  return cde.aprobarPropuestaCDE(id_tg,id_cde);
};

export const asignarTutorAcademico = async ( id_tg, id_tutor_academico ) => {
  return cde.asignarTutorAcademico(id_tg, id_tutor_academico);
};

export const obtenerCDE = async ( ) => {
  return cde.obtenerCDE();
};

export const obtenerCDEById = async ( id_cde ) => {
  return cde.obtenerCDEById(id_cde);
};

export const anexarPlanilla = async ( id_tg, nombre_planilla, documento) => {
  return tgs.anexarPlanilla(id_tg, nombre_planilla, documento);
};

export const crearCDE = async (id_cde) =>{
  return cde.crearCDE(id_cde);
};

export const obtenerTGsinJurado = async () =>{
  return tgs.obtenerTGsinJurado();
};

export const obtenerTGconJurado = async () =>{
  return tgs.obtenerTGconJurado();
};

export const crearJuradosPorUno = async (jurado, id_tg) => {
  return cde.crearJuradosPorUno(jurado, id_tg);
};

export const crearJurados = async (array, id_tg) => {
  cde.crearJurados(array, id_tg);
  return;
};

export const designarCDEJurado = async (id_tg , id_cde) => {
  fetch('',{
    
  })
  return;
};