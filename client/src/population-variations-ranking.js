(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/population.json', 'utf-8')
    const population = JSON.parse(file)
    const populationVariations = {}
    const populationVariationsRanking = {}
    populationVariationsRanking.balear = {}
    populationVariationsRanking.province = {}
    populationVariationsRanking.foreign = {}

    Object.entries(population).forEach(([key, value]) => {
      populationVariations[key] = {
        balearVariation: (parseFloat(value['Nascuts a Illes Balears']['2022'].replace(',','.')) - parseFloat(value['Nascuts a Illes Balears']['2016'].replace(',','.'))).toFixed(2),
        otherProvinceVariation: (parseFloat(value['Nascuts en una altra CA']['2022'].replace(',','.')) - parseFloat(value['Nascuts en una altra CA']['2016'].replace(',','.'))).toFixed(2),
        foreignVariation: (parseFloat(value['Nascuts a l\'estranger']['2022'].replace(',','.')) - parseFloat(value['Nascuts a l\'estranger']['2016'].replace(',','.'))).toFixed(2),
      }
    })

    const sortedBalearData = Object.fromEntries(
      Object.entries(populationVariations).sort((a, b) => parseFloat(a[1].balearVariation) - parseFloat(b[1].balearVariation))
    );

    Object.entries(sortedBalearData).forEach(([key, value]) => {
      let town = key.split(' ')
      town.shift()

      if(town.length > 1) {
        town = town.join(' ')
      } else {
        town = town[0]
      }
    
      populationVariationsRanking.balear[town] = value.balearVariation
    })

    const sortedProvinceData = Object.fromEntries(
      Object.entries(populationVariations).sort((a, b) => parseFloat(a[1].otherProvinceVariation) - parseFloat(b[1].otherProvinceVariation))
    );

    Object.entries(sortedProvinceData).forEach(([key, value]) => {
      let town = key.split(' ')
      town.shift()

      if(town.length > 1) {
        town = town.join(' ')
      } else {
        town = town[0]
      }

      populationVariationsRanking.province[town] = value.otherProvinceVariation
    })

    const sortedForeignData = Object.fromEntries(
      Object.entries(populationVariations).sort((a, b) => parseFloat(a[1].foreignVariation) - parseFloat(b[1].foreignVariation))
    );

    Object.entries(sortedForeignData).forEach(([key, value]) => {
      let town = key.split(' ')
      town.shift()

      if(town.length > 1) {
        town = town.join(' ')
      } else {
        town = town[0]
      }
      
      populationVariationsRanking.foreign[town] = value.foreignVariation
    })
    
    await fs.writeFile('../data/population-variations-ranking.json', JSON.stringify(populationVariationsRanking, null, 2))

  } catch (error) {
    console.log(error)
  }
})()