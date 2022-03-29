const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');
const { request } = require('http');
const { response } = require('express');

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err)
    }else {
        products = JSON.parse(data);
    }
});

/**
 * GET      -> Searsh one or more data.
 * POST     -> Insert a data
 * PUT      -> Edit a data
 * DELETE   -> Delete a data
 */

/**
 * Body     -> Contenct of requision
 * Params   -> /products/:param
 * Query    -> /products/query=42131123
 */
app.post('/products', (request, response) => {
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    createProductFile();

    return response.json(product);

});

app.get('/products', (request, response) => {
    return response.json(products)
});

app.get('/products/:id', (request, response) => {
    const { id } = request.params;
    console.log(id);
    const product = products.find(product => product.id === id);
    return response.json(product);
});

app.put('/products/:id', (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const index = products.findIndex(product => product.id === id);
    products[index] = {
        ...products[index],
        name,
        price,
    }

    createProductFile();

    return response.json({message: 'Product successfully changed'});
});

app.delete('/products/:id', (request, response) => {
    const { id } = request.params;

    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1);

    return response.json({message: 'Product successfully delete'});
});

const createProductFile = () => {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if(err) {
            console.log(err);
        }else {
            console.log('Product insert')
        }
    })
}

app.get('/', (request, response) => {
    return response.json({message: 'Welcome to http server with node and express'});
});

app.listen(4001, () => console.log('Server on in port 4001'));

