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
  //console.log("obtenerEstudianteByCedula()");
  //console.log(estudiante);
  return estudiante;
};