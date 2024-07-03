(async () => {

  const fs = require('fs/promises')

  try {
    
    let properties = await fs.readFile('../data/inside-airbnb.json', 'utf-8')
    let owners = await fs.readFile('../data/airbnb-owner-accumulation-property.json', 'utf-8')

    properties = JSON.parse(properties)
    owners = JSON.parse(owners)

    const ownersIds = owners.map(owner => owner.hostId)

    const propertiesOwners = properties.filter(property => ownersIds.includes(property.host_id))

    const geolocatations = propertiesOwners.map(property => {
      return {
        hostId: property.hostId,
        hostName: property.host_name,
        town: property.neighbourhood_cleansed,
        latitude: property.latitude,
        longitude: property.longitude
      }
    })

    await fs.writeFile('../data/airbnb-owner-accumulation-property-geolocatation.json', JSON.stringify(geolocatations, null, 2))

  } catch (error) {
    console.log(error)
  }
})()