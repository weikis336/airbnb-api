(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    const places = {};

    data.reduce((acum, curr) => {
      let neighburhood = curr.neighburhood;
      neighburhood = neighburhood?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const bedrooms = curr.bedrooms ? parseInt(curr.bedrooms) : 0;

      if (places[neighburhood]) {
        if (places[neighburhood][bedrooms]) {
          places[neighburhood][bedrooms] += 1;
        }else{
          places[neighburhood][bedrooms] = 1;
        }
      } else {
        places[neighburhood] = { [bedrooms]: 1 };
      }
    }, {});

    await fs.writeFile('../data/airbnb-location-bedrooms.json', JSON.stringify(places, null, 2))

  } catch (error) {
    console.log(error)
  }
})()