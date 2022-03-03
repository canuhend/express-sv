const fs = require('fs')

module.exports = class Contenedor {
    constructor(name) {
        this.name = name
        this.actualID = 1
    }
    async save(object) {
        try {
            if (!fs.existsSync(this.name)) {
                object.id = this.actualID
                await fs.promises.writeFile(this.name, `${JSON.stringify([object],null,2)}${'\n'}`)
            }
            else {
                this.actualID ++
                object.id = this.actualID
                let newFile = JSON.parse(await(fs.promises.readFile(this.name,'utf-8')))
                newFile.push(object)
                await fs.promises.writeFile(this.name, JSON.stringify(newFile,null,2))
            }
        }
        catch (err) {
            return(err)
        }
        return object.id
    }
    
    async getById(number) {
        try {
            return(JSON.parse(await fs.promises.readFile(this.name, 'utf-8')).find((elem) => elem.id === number))
        }
        catch (err) {
            return(err)
        }
    }

    async getAll() {
        try {
            return(JSON.parse(await fs.promises.readFile(this.name, 'utf-8')))
        }
        catch (err) {
            return(err)
        }
    }

    async deleteById(number) {
        try {
            let toPush = JSON.parse(await fs.promises.readFile(this.name, 'utf-8')).filter((elem) => elem.id !== number)
            await fs.promises.writeFile(this.name, JSON.stringify(toPush,null,2))

        }
        catch (err) {
            return(err)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.name, JSON.stringify([],null,2))
        }
        catch (err) {
            return(err)
        }
    }
}

//let nuevaCarpeta = new Contenedor('text.txt')

//PRUEBAS.
//async function test() {
    //await nuevaCarpeta.save({title: 'Samsung S10', price: 50000, thumbnail: 'https://ejemplo.com'})
    //await nuevaCarpeta.save({title: 'Motorola X', price: 30000, thumbnail: 'https://ejemplo.com'})
    //await nuevaCarpeta.getById(1)
    //await nuevaCarpeta.deleteById(1)
    //await nuevaCarpeta.getAll()
//}

//test()