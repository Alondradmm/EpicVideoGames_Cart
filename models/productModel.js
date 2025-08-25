// Modelo de productos (simulado sin base de datos)
let products = [
    {
        id: 1,
        nombre: "Minecraft",
        plataforma: "bx bx-desktop",
        precio: 1000.00,
        img: "productImg/minecraft.png",
        stock: 10
    },
    {
        id: 2,
        nombre: "Hollow Knight",
        plataforma: "bxl bx-steam",
        precio: 500.00,
        img: "productImg/hollow_knight.png",
        stock: 60
    },
    {
        id: 3,
        nombre: "Stardew Valley",
        plataforma: "bxl bx-steam",
        precio: 700.00,
        img: "productImg/stardew_valley.jpg",
        stock: 30
    },
    {
        id: 4,
        nombre: "It Takes Two",
        plataforma: "bxl bx-steam",
        precio: 400.00,
        img: "productImg/it_takes_two.jpg",
        stock: 60
    },
    {
        id: 5,
        nombre: "Mario Kart 8 Deluxe",
        plataforma: "bx bxs-joystick-alt",
        precio: 500.00,
        img: "productImg/mario_kart_deluxe.webp",
        stock: 60
    },
];

class ProductModel {
    // Cargar productos
    static loadProducts() {
        return products;
    }

    // Obtener producto por su ID
    static getProductById(productId){
        return products.find((product) => product.id === productId);
    }

    // Borrar producto (para los casos de sin stock)
    static deleteProductById(productId){
        products = products.filter((product) => product.id !== productId)
        return products;
    }
}

module.exports = ProductModel;