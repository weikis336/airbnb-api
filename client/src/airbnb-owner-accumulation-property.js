(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/airbnb-owner-ranking-last-year.json', 'utf-8')
    const data = JSON.parse(file)
    const owners = []

    const properties = data.reduce((acum, owner) => {
      const total = acum + parseFloat(owner.stablishments)

      return total
    }, 0)

    data.reduce((acum, owner) => {
      const total = acum + parseFloat(owner.stablishments)

      if(total < parseInt(properties / 2)) {
        owners.push(owner)
      }

      return total
    }, 0)

    
    await fs.writeFile('../data/airbnb-owner-accumulation-property.json', JSON.stringify(owners, null, 2))

  } catch (error) {
    console.log(error)
  }
})()