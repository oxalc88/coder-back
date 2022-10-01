const express = require('express');
const fs = require('fs');
const readline = require('readline');
const morgan = require('morgan')

const app = express();
let arrayProducts = [];

const txtToJson =(file) => {
    return new Promise((resolve,reject) => {
        let rd = readline.createInterface({
            input: fs.createReadStream(__dirname + file)
        });

        rd.on('line', line => {
            arrayProducts.push(JSON.parse(line));
        });

        rd.on('close', () => resolve(arrayProducts));
    })
}


txtToJson('/productos.txt')
    .then(res => console.log(res))
    .catch(err => console.error(err))


const PORT = 8080;

app.get('/', (req, res) => {
    res.send({msg: 'Hello from express'})
})

app.get("/productos", function(req, res) {
     res.send(arrayProducts);
});

app.get("/producto-random", function(req, res) {
    const randomID = (min,max) => Math.floor(Math.random()*(max - min + 1 ) + min)
    const idToSearch = randomID(1,3)
    const productToReturn = arrayProducts.filter(product => product.id === idToSearch)
    res.send(productToReturn);
});

app.use(morgan('tiny'))

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchandote en el puerto ${server.address().port}`)
})

server.on("error", err => console.log(`Error en servidor ${err}`) )