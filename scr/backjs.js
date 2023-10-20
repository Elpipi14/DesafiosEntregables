import fs from 'fs';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products.json'; // Ruta del archivo JSON
        this.loadProducts();
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

    view(id) {
        return this.products.find(producto => producto.id === id);
    }

    // Se agrega un a id a cada producto creado
    getProductById(id) {
        const product = this.view(id);
        if (!product) {
            console.log("Producto no encontrado.");
        } else {
            return product;
        }
    }

    // Carga productos desde el archivo JSON
    loadProducts() {
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

const products = new ProductManager();

// Agregar productos
products.addProduct('TV', 'LED TV', 200, 'img', 'Ab208', 20);
products.addProduct('iPhone', '15pro', 2100, 'img', 'Ab209', 20);
products.addProduct('PC', 'Pc Intel pro', 1200, 'img', 'Ab210', 20);
products.addProduct('Tablet', 'Tablet 12" noblex', 2100, 'img', 'Ab211', 20);
products.addProduct('Placa de video', 'Nvidia RTX', 2500, 'img', 'Ab212', 20);
products.addProduct('Tv led', '32" Max', 1300, 'img', 'Ab213', 20);
products.addProduct('Samsung Galaxi', '23 ultra', 1600, 'img', 'Ab214', 20);
products.addProduct('NoteBook Lenovo', 'Lengion 4', 6500, 'img', 'Ab215', 20);
products.addProduct('Mac 14', 'Simple', 100, 'img', 'Ab216', 20);
products.addProduct('Mouse Gamer', 'Dragons 3', 1500, 'img', 'Ab217', 20);


// al agregar productos:
// no agrega ya esta repetido
// products.addProduct('TV', 'LED TV', 200, 'img', 'Ab208', 20);
// los campos son obligatorios
// products.addProduct('Mouse Gamer', 'Dragons 3', 1500, 'Ab217', 20);

// Mostrar productos
// console.log(products.getProduct());

// Buscar productos por ID
// console.log(products.getProductById(2)); // Existe
// console.log(products.getProductById(12)); // No encontrado



