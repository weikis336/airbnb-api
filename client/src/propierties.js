(async () => {

    try{

        const fs = require('fs/promises')
        const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
        const properties = JSON.parse(file)

        const data = properties.map(property => {

           Object.keys(property).forEach(key => {
                property[key] = property[key].trim() === '' ? null : property[key]
           })

           property.price = property.price ? property.price.replace('$','').replace(',','') : null

           return property
        })

        const response = await fetch('http://127.0.0.1:8080/api/admin/properties', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(data)
        })

        const result = await response.json()

        console.log(result)
    }catch(err){
        console.log(err)
    }
})()