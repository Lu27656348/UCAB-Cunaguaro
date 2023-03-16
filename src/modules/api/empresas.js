export const obtenerEmpresas = async () => {
  const resEmpresas = await fetch('http://localhost:3000/Empresas/' );
  const empresas = await resEmpresas.json();
  //console.log("obtenerEmpresas()");
  //console.log(empresas);
  return empresas;
};

export const obtenerEmpresaById = async (idEmpresa) => {
  const resEmpresa = await fetch('http://localhost:3000/Empresas/' + idEmpresa );
  const empresa = await resEmpresa.json();
  //console.log("obtenerEmpresaById()");
  //console.log(empresa);
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