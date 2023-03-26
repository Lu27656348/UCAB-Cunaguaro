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

export const crearJuradosPorUno = async (jurado,id_tg,index) => {
  console.log("jurado,",jurado)
  console.log("id", id_tg)
  let tipo = null;
  if(index == 3 || index == 2){
    tipo = 'S'
  }else{
    tipo = 'J'
  }
  const resJurado = await fetch('http://localhost:3000/crearJurado',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cedula_profesor: jurado,
      id_tg: id_tg,
      tipo: tipo
    })
  })
  console.log(resJurado)
};

export const crearJurados = async (array,id_tg) => {
  console.log("crearJurados()")
  array.forEach( async (element,index) => {
   await crearJuradosPorUno(element,id_tg,index);
 })

 return;
};