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

export const designarRevisor = async ( id_tg, id_profesor_revisor) => {
  return comites.designarRevisor(id_tg, id_profesor_revisor);
};

export const obtenerEstudianteDeTG = async ( id_tg ) => {
  return tgs.obtenerEstudianteDeTG(id_tg);
};

export const obtenerPropuestaConRevisorAsignado = async ( ) => {
  return tgs.obtenerPropuestaConRevisorAsignado();
};

export const aprobarPropuestaRevisor = async ( id_tg ) => {
  return revisores.aprobarPropuestaRevisor(id_tg);
};

export const rechazarPropuestaRevisor = async ( id_tg ) => {
  return revisores.rechazarPropuestaRevisor(id_tg);
};

export const rechazarPropuestaCDE = async ( id_tg ) => {
  return cde.rechazarPropuestaCDE(id_tg);
};

export const aprobarPropuestaCDE = async ( id_tg ) => {
  return cde.aprobarPropuestaCDE(id_tg);
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
/*
export const descargarPlanilla = async ( id_tg, nombre_planilla) => {
  const resPlanilla = await fetch('http://localhost:3000/descargarPlanilla/',{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg,
      nombre_planilla: nombre_planilla
    })
  });
  console.log(resPlanilla)
  const planilla = await resPlanilla.json()
  return planilla;
}
*/
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

export const asignarNota = async (id_tg,cedula_estudiante,nota) =>{
  return tgs.asignarNota(id_tg, cedula_estudiante, nota);
};