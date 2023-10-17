
const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products.json'; // Ruta del archivo JSON
        this.cargarProducts();
    }

    static id = 0;

    addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !img || !code || !stock) {
            console.log(`Campos obligatorios incompletos, hay productos que no se pueden agregar.`);
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log(`El código ${code} está repetido y no se puede agregar.`);
            return;
        } else {
            ProductManager.id++;
            this.products.push({
                title,
                description,
                price,
                img,
                code,
                stock,
                id: ProductManager.id
            });
            this.saveProducts(); // Guarda los productos después de agregar uno
        }
    }

    // Devuelve todos los productos
    getProduct() {
        return this.products;
    }

    ver(id) {
        return this.products.find(producto => producto.id === id);
    }

    // Se agrega un a id a cada producto creado
    getProductById(id) {
        const product = this.ver(id);
        if (!product) {
            console.log("Producto no encontrado.");
        } else {
            return product;
        }
    }

    // Carga productos desde el archivo JSON
    cargarProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productJSON = fs.readFileSync(this.path, 'utf-8');
                this.products = JSON.parse(productJSON);
            }
        } catch (error) {
            console.log("Error al cargar productos desde el archivo JSON:", error);
        }
    }

    // Guarda productos en el archivo JSON
    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log("Productos guardados en el archivo JSON.");
        } catch (error) {
            console.log("Error al guardar productos en el archivo JSON:", error);
        }
    }
}

const productos = new ProductManager();

// Agregar productos
productos.addProduct('TV', 'LED TV', 200, 'img', 'Ab208', 20);
productos.addProduct('iPhone', '15pro', 2100, 'img', 'Ab209', 20);
productos.addProduct('PC', 'Pc Intel pro', 1200, 'img', 'Ab210', 20);
productos.addProduct('Tablet', 'Tablet 12" noblex', 2100, 'img', 'Ab209', 20);
productos.addProduct('Auriculares', 'Skull Max', 1100, 'Ab209', 20);


// Mostrar productos
console.log(productos.getProduct());

// Buscar productos por ID
console.log(productos.getProductById(2)); // Existe
console.log(productos.getProductById(6)); // No encontrado
