(async () => {

  const fs = require('fs/promises')
  const file = await fs.readFile('../airbnb/data/airbnb-owner-ranking-last-year.json', 'utf8')
  const data = JSON.parse(file);

  const spanishOwners = data.filter(element => element.hostLocation && element.hostLocation.includes('Spain'))

  const foreignOwners = data.filter(element => element.hostLocation && !element.hostLocation.includes('Spain'))

  let foreignOwnersByCountry = foreignOwners.reduce((acc, owner) => {
    let country = owner.hostLocation.split(', ')[1]
    if (!acc[country]){
      acc[country] = parseFloat(owner.percentatgePlaces);
    } else {
      acc[country] += parseFloat(owner.percentatgePlaces);
    }
    return acc;
  }, {})

  console.log(spanishOwners)

})()