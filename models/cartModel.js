// Carrito de usuarios
const carts = [
    {userId: 1, items: [], total: 0},
    {userId: 2, items: [], total: 0},
    {userId: 3, items: [], total: 0}
];

const ProductModel = require('../models/productModel');

// Modelo de carrito (simulado sin base de datos)
class CartModel {
    // Obtener el carrito del usuario por su ID
    static getCartByUserId(userId) {
        // Obtener el carrito del usuario cuyo userId coincida
        const userCart = carts.find(cart => 
            cart.userId === userId
        );

        // En caso de que haya productos en el carrito
        // Assjunta la información del producto
        userCart.items.forEach(item => {
            item.productInfo = ProductModel.getProductById(item.productId)
        });

        return userCart;
    };

    // Crear carrito de usuario (para nuevos usuarios)
    static createUserCart(userId){
        const nuevoCart = {
            userId: userId,
            items: [],
            total: 0
        }
        // Añadir al modelo de carritos
        carts.push(nuevoCart)
    }
}

module.exports = CartModel;