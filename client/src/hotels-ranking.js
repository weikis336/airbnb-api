(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/hotels.json', 'utf-8')
    const towns = JSON.parse(file)

    const totalPlaces = towns.reduce((acum, town) => acum + town.plazas, 0);

    const results = towns.map(town => {
      const placesPercentage = (town.plazas / totalPlaces) * 100;
      const placesByEstablishment = town.plazas / town.establecimientos;

      return {
        town: town.poblacion,
        establishments: town.establecimientos,
        places: town.plazas,
        placesPercentage: placesPercentage.toFixed(2), 
        placesByEstablishment: placesByEstablishment.toFixed(2) 
      };
    });

    const sortedData = results.sort((a, b) => parseFloat(b.placesPercentage) - parseFloat(a.placesPercentage));
    
    await fs.writeFile('../data/hotels-ranking.json', JSON.stringify(sortedData, null, 2))

  } catch (error) {
    console.log(error)
  }
})()