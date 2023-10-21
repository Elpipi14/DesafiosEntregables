import fs from 'fs';
import express from 'express';

const app = express();
const port = 8080;

app.listen(port, () => console.log(`Puerto Ok ${port}`))

// Traemos el archivo a json y parseamos para que se pueda leer..

let listProducts = [];  // Inicializamos listaProductos como un array vacío

fs.readFile('./products.json', 'utf8', (error, data) => {
    if (error) {
        console.error(`Error al leer el archivo JSON: ${error}`);
        return;
    }
    try {
        listProducts = JSON.parse(data); // Asignamos los datos del archivo JSON a listaProductos
        console.log(listProducts);
    } catch (error) {
        console.error('Error al analizar el archivo JSON:', error);
    }
});

// prueba de servidor...
// app.get('/products', (req, res) => {
//     res.json(listProducts); // Devolvemos la lista completa de productos
// });

//endpoints para obtener la cantidad de productos con query // http://localhost:8080/products?limit=6
app.get('/products', (req, res) => {
    const { limit } = req.query;

    if (limit) {
        const limitedProducts = listProducts.slice(0, parseInt(limit));
        res.json(limitedProducts);
    } else {
        res.json(listProducts);
    }
});


// Bucar por id de productos con parms // http://localhost:8080/products/3
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = listProducts.find(p => p.id === Number(id));
    if (!product) {
        res.status(404).send("No encontrado");
    } else {
        res.status(400).json(product);
    }
});









