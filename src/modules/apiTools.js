const hola = async () => {
  console.log("Hola desde la api");
}

const obtenerEstudiantes = async () => {
  const resEstudiantes = await fetch('http://localhost:3000/Estudiantes');
  const estudiantes = await resEstudiantes.json();
  console.log("obtenerEstudiantes()");
  console.log(estudiantes);
  return estudiantes;
}