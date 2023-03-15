import * as docx from 'docx';
import file_saver from 'file-saver'
const { saveAs } = file_saver
const { HeadingLevel,Packer } = docx;

export const hola = async () => {
  console.log("Hola desde la api");
};

export const insertarEstudiantes = async (estudiante) =>{
  const insertar = await fetch('http://localhost:3000/Estudiantes',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudiante)
  });
  const respuesta = await insertar.json();
  console.log("insertarEstudiantes()");
  console.log(respuesta)
  return respuesta;
};

export const obtenerEstudiantes = async () => {
  const resEstudiantes = await fetch('http://localhost:3000/Estudiantes');
  const estudiantes = await resEstudiantes.json();
  //console.log("obtenerEstudiantes()");
  //console.log(estudiantes);
  return estudiantes;
};

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  const resEstudiante = await fetch('http://localhost:3000/Estudiantes/'+cedulaEstudiante);
  const estudiante = await resEstudiante.json();
  console.log("obtenerEstudianteByCedula()");
  console.log(estudiante);
  return estudiante;
};

export const obtenerProfesores = async () => {
  const resProfesores = await fetch('http://localhost:3000/Profesores');
  const profesores = await resProfesores.json();
  console.log("obtenerProfesores()");
  console.log(profesores);
  return profesores;
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  const resProfesor = await fetch('http://localhost:3000/Profesores/' + cedulaProfesor );
  const profesor = await resProfesor.json();
  console.log("obtenerProfesorByCedula()");
  console.log(cedulaProfesor)
  console.log(profesor);
  return profesor;
};

export const obtenerExternos = async () => {
  const resExternos = await fetch('http://localhost:3000/Externos/');
  const externos = await resExternos.json();
  console.log("obtenerExternos()");
  console.log(externos);
  return externos;
};

export const obtenerExternosById = async ( idExterno) => {
  const resExternos = await fetch('http://localhost:3000/Externos/' + idExterno);
  const externos = await resExternos.json();
  console.log("obtenerExternosById()");
  console.log(externos);
  return externos;
};

export const obtenerExternoByCedula = async (cedulaExterno) => {
  const resExterno = await fetch('http://localhost:3000/Externos/cedula/' + cedulaExterno );
  const externo = await resExterno.json();
  console.log("obtenerExternoByCedula()");
  console.log(externo);
  return externo;
};

export const obtenerEmpresas = async () => {
  const resEmpresas = await fetch('http://localhost:3000/Empresas/' );
  const empresas = await resEmpresas.json();
  console.log("obtenerEmpresas()");
  console.log(empresas);
  return empresas;
};

export const obtenerEmpresaById = async (idEmpresa) => {
  const resEmpresa = await fetch('http://localhost:3000/Empresas/' + idEmpresa );
  const empresa = await resEmpresa.json();
  console.log("obtenerEmpresaById()");
  console.log(empresa);
  return empresa;
};

export const crearEmpresa = async (empresa) => {
  const resEmpresa = await fetch('http://localhost:3000/Empresas/',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(empresa)
  });
};

export const obtenerTG = async () => {
  const resTG = await fetch('http://localhost:3000/TG/');
  const tg = await resTG.json();
  console.log("obtenerTG()");
  console.log(tg);
  return tg;
};

export const obtenerTGById = async (idTG) => {
  const resTG = await fetch('http://localhost:3000/TG/' + idTG);
  const tg = await resTG.json();
  console.log("obtenerTGById()");
  console.log(tg);
  return tg;
};

export const crearTrabajoGradoExperimental = async ( TG, cedulaEstudiante,cedulaTutorAcademico) => {
  console.log("crearTrabajoGrado")
  fetch('http://localhost:3000/TG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: TG.titulo,
      modalidad: TG.modalidad,
      id_tutor_academico: cedulaTutorAcademico,
      id_tutor_empresarial: null
    })
  })
  .then( (response) =>{
    console.log("response")
    console.log(response)
    return response.json()
  })
  .then( (data) => {
    console.log("data")
    console.log(data)
    console.log(data.id_tg)
    const objeto = {
      cedula_estudiante: cedulaEstudiante,
      id_tg: data.id_tg
    }
    fetch('http://localhost:3000/realiza_TG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
    })
    .then( (response) => {
      console.log(response)
      return response.json()
    })
    .then( (data) => {
      console.log(data)
    })
    .catch( (error) => {
      console.log("Error en creacion de realiza");
      console.log(error);
    })
  })
  .catch( (error) => {
    console.log("Error en creacion de TG desde la api");
    console.log(error)
  })
};

export const crearTrabajoGradoInstrumental = async ( TG, cedulaEstudiante,cedulaTutorExperimental ) => {
  console.log("crearTrabajoGrado")
  fetch('http://localhost:3000/TG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: TG.titulo,
      modalidad: TG.modalidad,
      id_tutor_academico: null,
      id_tutor_empresarial: cedulaTutorExperimental
    })
  })
  .then( (response) =>{
    console.log("response")
    console.log(response)
    return response.json()
  })
  .then( (data) => {
    console.log("data")
    console.log(data)
    console.log(data.id_tg)
    const objeto = {
      cedula_estudiante: cedulaEstudiante,
      id_tg: data.id_tg
    }
    fetch('http://localhost:3000/realiza_TG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
    })
    .then( (response) => {
      console.log(response)
      return response.json()
    })
    .then( (data) => {
      console.log(data)
    })
    .catch( (error) => {
      console.log("Error en creacion de realiza");
      console.log(error);
    })
  })
  .catch( (error) => {
    console.log("Error en creacion de TG desde la api");
    console.log(error)
  })
};

export const obtenerPropuestas = async ( estatus ) => {
  const resTG = await fetch('http://localhost:3000/TG/estatus/'+estatus);
  const tg = await resTG.json();
  //console.log("obtenerTG()");
  //console.log(tg);
  return tg;

};

export const obtenerComites = async ( estatus ) => {
  const resCDE = await fetch('http://localhost:3000/CDE');
  const cde = await resCDE.json();
  console.log("obtenerComites()");
  console.log(cde);
  return cde;

};

export const eliminarPlanilla = async ( idTg ) => {
  await fetch('http://localhost:3000/TG/' + idTg,{method: 'DELETE'});
};

export const actualizarPlanilla = async ( planilla ) => {
  await fetch('http://localhost:3000/TG/' + planilla.id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: planilla.titulo,
      modalidad: planilla.modalidad,
    })
  });
};

export const rechazarPropuestaComite = async ( id_tg ) => {
  console.log(id_tg);
  await fetch('http://localhost:3000/TG/evaluacionComite/' + id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_comite: 'R'
    })
  });
};

export const aprobarPropuestaComite = async ( id_tg ) => {
  console.log(id_tg);
  await fetch('http://localhost:3000/TG/evaluacionComite/' + id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_comite: 'PR'
  })
  })
};

export const obtenerPropuestaSinRevisor = async ( ) => {
  const resTG = await fetch('http://localhost:3000/sin_revisor/');
  const tg_sin_revisor = await resTG.json();
  return tg_sin_revisor
};

export const designarRevisor = async ( id_tg, id_profesor_revisor) => {
  const resTG = await fetch('http://localhost:3000/asignarRevisor/'+id_tg,{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_profesor_revisor: id_profesor_revisor
    })
  });
  
  const tg_revisor = await resTG.json();
  return tg_revisor
};

export const obtenerEstudianteDeTG = async ( id_tg ) => {
   const resEstudiantes = await fetch("http://localhost:3000/alumnosTG/" + id_tg);
   const estudiantes = await resEstudiantes.json();
   console.log("estudiantes")
   console.log(estudiantes)
   let lista = [];
   estudiantes.forEach(element => {
    if(element.realiza_tg!=null){
      lista.push(element.realiza_tg.estudiante)
    }else{
      console.log("No se puede agregar alumno")
    }
   });
   console.log("lista");
   return lista;
};

export const obtenerPropuestaConRevisorAsignado = async ( ) => {
  const resTG = await fetch('http://localhost:3000/con_revisor/');
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor

};

export const aprobarPropuestaRevisor = async ( id_tg ) => {
  const resTG = await fetch('http://localhost:3000/TG/evaluacionRevisor/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_revisor: 'PE'
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor

};

export const rechazarPropuestaRevisor = async ( id_tg ) => {
  const resTG = await fetch('http://localhost:3000/TG/evaluacionRevisor/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_revisor: 'R'
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const rechazarPropuestaCDE = async ( id_tg ) => {
  const resTG = await fetch('http://localhost:3000/TG/evaluacionCDE/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_cde: 'R'
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const aprobarPropuestaCDE = async ( id_tg ) => {
  const resTG = await fetch('http://localhost:3000/TG/evaluacionCDE/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_cde: 'A'
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const asignarTutorAcademico = async ( id_tg, id_tutor_academico ) => {
  const resTG = await fetch('http://localhost:3000/TG/asignarTutorAcademico/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tutor_academico: id_tutor_academico
    })
  });
  const tg_con_revisor = await resTG.json();
  return tg_con_revisor
};

export const obtenerCDE = async ( ) => {
  const resCDE = await fetch('http://localhost:3000/CDE');
  const CDE = await resCDE.json()
  return CDE;
};

export const obtenerCDEById = async ( id_cde ) => {
  const resCDE = await fetch('http://localhost:3000/CDE/'+id_cde);
  const CDE = await resCDE.json()
  return CDE;
};

export const anexarPlanilla = async ( id_tg, nombre_planilla, documento) => {
  const resPlanilla = await fetch('http://localhost:3000/anexarPlanilla/',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg,
      nombre_planilla: nombre_planilla,
      documento: documento
    })
  });
  const planilla = await resPlanilla.json()
  return planilla;
}
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
  const insertar = await fetch('http://localhost:3000/CDE',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_cde: id_cde
      })
  });
  const respuesta = await insertar.json();
  console.log("crearCDE()");
  console.log(respuesta)
  return respuesta;
};