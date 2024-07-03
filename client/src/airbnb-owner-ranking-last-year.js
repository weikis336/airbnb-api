(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    const places = {};

    data.forEach(element => {

      if(element.availability365 == "0") return

      let hostId = element.hostId;
      let neighburhood = element.neighburhood;
      neighburhood = neighburhood?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const beds = element.beds ? parseInt(element.beds) : 0;

      if (places[hostId]) {
        places[hostId].hostName = element.hostName;
        places[hostId].hostLocation = element.hostLocation;
        places[hostId].places += beds;
        places[hostId].stablishments += 1;

        if (!places[hostId].neighburhood.includes(element.neighburhood)) {
          places[hostId].neighburhood.push(element.neighburhood);
        }
      } else {
        places[hostId] = {
          hostName: element.hostName,
          hostLocation: element.hostLocation,
          places: beds,
          stablishments: 1,
          neighburhood: [element.neighburhood]
        };
      }
    });

    const totalPlaces = Object.values(places).reduce((acum, curr) => acum + curr.places, 0);

    const results = Object.entries(places).map(([key, owner]) => {
      const percentatgePlaces = (owner.places / totalPlaces) * 100;
      const placesByStablishments = owner.places / owner.stablishments;

      return {
        hostId: key,
        name: owner.hostName,
        stablishments: owner.stablishments,
        places: owner.places,
        percentatgePlaces: percentatgePlaces.toFixed(3), 
        placesByStablishments: placesByStablishments.toFixed(2),
        hostLocation: owner.hostLocation,
        towns: owner.neighburhood,
      };
    });

    const sortedData = results.sort((a, b) => parseFloat(b.percentatgePlaces) - parseFloat(a.percentatgePlaces));
    
    await fs.writeFile('../data/airbnb-owner-ranking-last-year.json', JSON.stringify(sortedData, null, 2))

  } catch (error) {
    console.log(error)
  }
})()