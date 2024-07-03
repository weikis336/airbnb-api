(async () => {

  const response = await fetch('https://catalegdades.caib.cat/api/views/3q3t-usfm/rows.json?accessType=DOWNLOAD');
  const json = await response.json();
  const caibData =  json.data;
  const fs = require('fs/promises')
  const file = await fs.readFile('../airbnb/data/inside-airbnb.json', 'utf8')
  const data = JSON.parse(file);

  // let exploiters = associations.data.map(([data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27]) =>
  //   (
  //     {
  //       license: data9,
  //       exploiter: data27,
  //     })
  //   )

  // const newArray = data.map(element => {
  //   return {
  //     licencia: element.license,
  //     latitud: element.latitude,
  //     longitude: element.longitude,
  //     vecindario: element.neighbourhood_cleansed,
  //     propietario: element.host_name
  //   }
  // })

  // console.log(exploiters)

  const coincidencias = data.filter(item1 => {
    const coincidencia = caibData.find(item2 => item1.license === item2[8]);
    const propietario = caibData.find(item3 => item3[26])
    return {...item1, propietario: coincidencia ? coincidencia.propietario : null}
  });

  const explotadores = coincidencias.filter(item1 => {
    return "prueba"
  })

  console.log(explotadores)

})()