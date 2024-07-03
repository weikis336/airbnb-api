(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    const places = {};

    data.forEach(element => {
      let neighburhood = element.neighburhood;
      neighburhood = neighburhood?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const beds = element.beds ? parseInt(element.beds) : 0;

      if (places[neighburhood]) {
        places[neighburhood].places += beds;
        places[neighburhood].establishments += 1;
      } else {
        places[neighburhood] = {
          places: beds,
          establishments: 1
        };
      }
    });

    const totalPlaces = Object.values(places).reduce((acum, curr) => acum + curr.places, 0);

    const results = Object.entries(places).map(([key, town]) => {
      const porcentatgePlaces = (town.places / totalPlaces) * 100;
      const placesByStablishments = town.places / town.establishments;

      return {
        town: key,
        stablishments: town.establishments,
        places: town.places,
        percentatgePlaces: porcentatgePlaces.toFixed(2), 
        placesByStablishments: placesByStablishments.toFixed(2) 
      };
    });

    const sortedData = results.sort((a, b) => parseFloat(b.percentatgePlaces) - parseFloat(a.percentatgePlaces));
    
    await fs.writeFile('../data/airbnb-ranking.json', JSON.stringify(sortedData, null, 2))

  } catch (error) {
    console.log(error)
  }
})()