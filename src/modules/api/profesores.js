export const obtenerProfesores = async () => {
  const resProfesores = await fetch('http://localhost:3000/Profesores');
  const profesores = await resProfesores.json();
  //console.log("obtenerProfesores()");
  //console.log(profesores);
  return profesores;
};

export const obtenerProfesorByCedula = async (cedulaProfesor) => {
  const resProfesor = await fetch('http://localhost:3000/Profesores/' + cedulaProfesor );
  const profesor = await resProfesor.json();
  //console.log("obtenerProfesorByCedula()");
  //console.log(cedulaProfesor)
  //console.log(profesor);
  return profesor;
};