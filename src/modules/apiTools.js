export const hola = async () => {
  console.log("Hola desde la api");
}

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
}

export const obtenerEstudiantes = async () => {
  const resEstudiantes = await fetch('http://localhost:3000/Estudiantes');
  const estudiantes = await resEstudiantes.json();
  console.log("obtenerEstudiantes()");
  console.log(estudiantes);
  return estudiantes;
}

export const obtenerEstudianteByCedula = async (cedulaEstudiante) =>{
  const resEstudiante = await fetch('http://localhost:3000/Estudiantes/'+cedulaEstudiante);
  const estudiante = await resEstudiante.json();
  console.log("obtenerEstudianteByCedula()");
  console.log(estudiante);
  return estudiante;
}

export const obtenerProfesores = async () => {
  const resProfesores = await fetch('http://localhost:3000/Profesores');
  const profesores = await resProfesores.json();
  console.log("obtenerProfesores()");
  console.log(profesores);
  return profesores;
}

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  const resProfesor = await fetch('http://localhost:3000/Profesores/' + cedulaProfesor );
  const profesor = await resProfesor.json();
  console.log("obtenerProfesorByCedula()");
  console.log(profesor);
  return profesor;
}
export const obtenerExternos = async () => {
  const resExternos = await fetch('http://localhost:3000/Externos/');
  const externos = await resExternos.json();
  console.log("obtenerExternos()");
  console.log(externos);
  return externos;
}
export const obtenerExternoByCedula = async (cedulaExterno) => {
  const resExterno = await fetch('http://localhost:3000/Externos/cedula/' + cedulaExterno );
  const externo = await resExterno.json();
  console.log("obtenerExternoByCedula()");
  console.log(externo);
  return externo;
}

export const obtenerEmpresas = async () => {
  const resEmpresas = await fetch('http://localhost:3000/Empresas/' );
  const empresas = await resEmpresas.json();
  console.log("obtenerEmpresas()");
  console.log(empresas);
  return empresas;
}
export const obtenerEmpresaById = async (idEmpresa) => {
  const resEmpresa = await fetch('http://localhost:3000/Empresas/' + idEmpresa );
  const empresa = await resEmpresa.json();
  console.log("obtenerEmpresaById()");
  console.log(empresa);
  return empresa;
}

export const obtenerTG = async () => {
  const resTG = await fetch('http://localhost:3000/TG/');
  const tg = await resTG.json();
  console.log("obtenerTG()");
  console.log(tg);
  return tg;
}

export const obtenerTGById = async (idTG) => {
  const resTG = await fetch('http://localhost:3000/TG/' + idTG);
  const tg = await resTG.json();
  console.log("obtenerTGById()");
  console.log(tg);
  return tg;
}

export const crearTrabajoGrado = async ( TG, cedulaEstudiante ) => {
  console.log("crearTrabajoGrado")
  fetch('http://localhost:3000/TG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(TG)
  })
  .then( (response) =>{
    console.log(response)
    return response.json()
  })
  .then( (data) => {
    console.log(data)
    fetch('http://localhost:3000/realiza_TG',{
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cedula_estudiante: cedulaEstudiante,
        id_tg: data.id_tg
      })
    })
    .then( (response) => {
      return response.json()
    })
    .then( (data) => {
      console.log(data)
    })
  })
}

export const obtenerPropuestas = async ( estatus ) => {
  const resTG = await fetch('http://localhost:3000/TG/estatus/'+estatus);
  const tg = await resTG.json();
  console.log("obtenerTG()");
  console.log(tg);
  return tg;

}
