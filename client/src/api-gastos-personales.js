(async () => {

  const response = await fetch('https://catalegdades.caib.cat/resource/a8xp-nn78.json');
  const json = await response.json();
  const fs = require('fs');


  const responsables = json.reduce((acumulador, item) => {
    const responsable = item.responsable;
    const tipus = item.tipus_de_despesa;
    const importValue = parseFloat(item.import);
  
    if (!acumulador[responsable]) {
      acumulador[responsable] = {
        total: 0,
        gastos: {}
      };
    }
  
    if (!acumulador[responsable].gastos[tipus]) {
      acumulador[responsable].gastos[tipus] = 0;
    }
  
    acumulador[responsable].gastos[tipus] += importValue;

    acumulador[responsable].total += importValue;
  
    return acumulador;
  }, {});

  const resultado = Object.keys(responsables).map(responsable => {
    return {
      responsable: responsable,
      total: responsables[responsable].total,
      gastos: responsables[responsable].gastos
    };
  });

  resultado.sort((a, b) => b.total - a.total);

  console.log(resultado);

  const jsonOutput = JSON.stringify(resultado, null, 2);

  fs.writeFile('gastosPorResponsableOrdenados.json', jsonOutput, (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON:', err);
    } else {
      console.log('Archivo JSON guardado exitosamente.');
    }
  });

})()