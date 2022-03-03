const Contenedor = require('./classes/Contenedor-class')

let cont1 = new Contenedor('productos.txt')

const express = require('express')
const app = express()

const server = app.listen(8080, () => {
    console.log(`Server is up and listening on port ${server.address().port}`)
})
server.on('error', error => console.log(error))

let products = cont1.getAll()

app.get('/productos', async (request , response) => {
    response.json(await products)
})

app.get('/productoRandom', async (request , response) => {
    const productList = await products
    let randomIndex = Math.floor(Math.random() * productList.length)
    response.json(productList[randomIndex])
})