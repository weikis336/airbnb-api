(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/airbnb-location-bedrooms.json', 'utf-8')
    const data = JSON.parse(file)

    const totals = {};

    for (const town in data) {
      const entries = data[town];
      for (const key in entries) {
        if (totals[key]) {
          totals[key] += entries[key];
        } else {
          totals[key] = entries[key];
        }
      }
    }
  
    await fs.writeFile('../data/airbnb-bedrooms.json', JSON.stringify(totals, null, 2))

  } catch (error) {
    console.log(error)
  }
})()