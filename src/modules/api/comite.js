export const obtenerCTG = async ( ) => {
  const resCTG = await fetch('http://localhost:3000/CTG');
  const ctg = await resCTG.json();
  console.log("obtenerCTG()");
  console.log(ctg);
  return ctg;
}
export const buscarCTG = async ( id ) => {
  const resCTG = await fetch('http://localhost:3000/CTG/'+id);
  const ctg = await resCTG.json();
  console.log("buscarCTG()");
  console.log(ctg);
  return ctg;
}
export const revisionCTG = ( id_ctg, id_tg,desicion_comite ) => {
  fetch('http://localhost:3000/revisa_CTG',{
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      id_ctg: id_ctg,
      id_tg: id_tg,
      desicion_comite: desicion_comite
    })
  })
  .then( (response) => {
    return response.json()
  })
  .then( (data) => {
    console.log(data)
    return data;
  })
  .catch( (error) => {
    console.log(error)
  })
}

export const obtenerComites = async ( estatus ) => {
  const resCDE = await fetch('http://localhost:3000/CDE');
  const cde = await resCDE.json();
  console.log("obtenerComites()");
  console.log(cde);
  return cde;
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