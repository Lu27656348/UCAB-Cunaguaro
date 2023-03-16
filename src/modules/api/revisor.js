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