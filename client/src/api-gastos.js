(async () => {

  const response = await fetch('https://catalegdades.caib.cat/resource/a8xp-nn78.json');
  const json = await response.json();

  const imports = json.reduce((acumulador, item) => {
    const tipus = item.tipus_de_despesa;
    const importValue = parseFloat(item.import);
  
    if (!acumulador[tipus]) {
      acumulador[tipus] = 0;
    }
  
    acumulador[tipus] += importValue;
  
    return acumulador;
  }, {});

  console.log(imports);
})()