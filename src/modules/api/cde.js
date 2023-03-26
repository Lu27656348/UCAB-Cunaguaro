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

export const aprobarPropuestaCDE = async ( id_tg,id_cde ) => {
  console.log("aprobarPropuestaCDE()")
  console.log(id_cde)
  const resTG = await fetch('http://localhost:3000/TG/evaluacionCDE/' + id_tg, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desicion_cde: 'A',
      id_cde: id_cde
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

export const crearJuradosPorUno = async (jurado,id_tg) => {
  console.log("jurado,",jurado)
  console.log("id", id_tg)
  const resJurado = await fetch('http://localhost:3000/crearJurado',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cedula_profesor: jurado,
      id_tg: id_tg
    })
  })
  console.log(resJurado)
  return respuesta;
};

export const crearJurados = async (array,id_tg) => {
  console.log("crearJurados()")
  console.log("array")
  console.log(array)
  console.log("id_tg")
  console.log(id_tg)
  array.forEach( async (element,index) => {
   console.log("element")
   console.log(element)
   const respuesta = await crearJuradosPorUno(element,id_tg);
   const hola = await respuesta.json()
   console.log(hola)
 })

 return;
};