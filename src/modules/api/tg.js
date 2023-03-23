export const obtenerTG = async () => {
  const resTG = await fetch('http://localhost:3000/TG/');
  const tg = await resTG.json();
  //console.log("obtenerTG()");
  //console.log(tg);
  return tg;
};

export const obtenerTGById = async (idTG) => {
  const resTG = await fetch('http://localhost:3000/TG/' + idTG);
  const tg = await resTG.json();
  //console.log("obtenerTGById()");
  //console.log(tg);
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
  console.log("API/crearTrabajoGrado()");
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

export const obtenerPropuestaSinRevisor = async ( ) => {
  const resTG = await fetch('http://localhost:3000/sin_revisor/');
  const tg_sin_revisor = await resTG.json();
  return tg_sin_revisor
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
};

export const obtenerTGsinJurado = async () =>{
  console.log("obtenerTGsinJurado()");
  const resJurado = await fetch('http://localhost:3000/sinJurado/');
  const jurados = await resJurado.json()
  return jurados;
};

export const obtenerTGconJurado = async () =>{
  console.log("obtenerTGconJurado()");
  const resJurado = await fetch('http://localhost:3000/conJurado/');
  const jurados = await resJurado.json()
  return jurados;
};

export const obtenerJuradosDeTG = async (id_tg) =>{
  console.log("obtenerJuradosDeTG()");
  const resJurado = await fetch('http://localhost:3000/Jurado/buscar/',{
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_tg: id_tg
    })
  });
  const jurados = await resJurado.json()
  return jurados;
};