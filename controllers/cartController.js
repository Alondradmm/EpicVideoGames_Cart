const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

// Controlador para gestionar el carrito de compra
const cartController = {
    // Obtener el carrito de compra
    getCart: (req, res) => {
        try {
            // Obtener el carrito del usuario en sesión
            const cart = CartModel.getCartByUserId(req.user.id);
            res.json({
                message: 'Acceso autorizado a carrito de compra',
                cart: cart
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el carrito de compra' });
        }
    },

    // Añadir producto al carrito de compra
    addItemToCart: (req, res) => {
        try {
            // ID del producto
            const productId = parseInt(req.params.id)
            // Carrito del usuario en sesión
            const userCart = CartModel.getCartByUserId(req.user.id);

            // Buscar si el producto ya se encuentra en el carrito
            let productInCart = userCart.items.find(item => item.productId === productId)
            // Obtener la información del producto
            let productData = ProductModel.getProductById(productId)

            // Condicional en caso de que no exista el producto
            if (!productData){
                res.status(404).json({ error: 'El producto no existe' });
            }

            // Si el producto ya se encuentra en el carrito
            if (productInCart){
                // Si la cantidad del producto es igual al stock, entonces ya no puede añadirse más
                if (productInCart.count == productData.stock){
                    return res.status(409).json({ error: 'El producto ya no tiene stock' });
                } else {
                    // Aumentar en 1 la cantidad del producto que lleva
                    productInCart.count += 1
                    // Actualizar el subtotal de los productos
                    productInCart.subtotal += productData.precio
                }
            } else {
                // Si el producto no está en el carrito del usuario, se crea y se inserta en el carrito
                let newItemInCart = {
                    productId: productId,
                    count: 1,
                    subtotal: productData.precio
                }
                userCart.items.push(newItemInCart)
            }
            // Calcular el total de todo el carrito (suma todos los subtotales)
            const total = userCart.items.reduce((acum, p) => acum + p.subtotal, 0);
            userCart.total = total

            // Recarga el carrito del usuario
            cartController.getCart(req, res)
        } catch (error) {
            res.status(500).json({ error: 'No se pudo añadir el producto al carrito' });
        }
    },

    // Incrementar la cantidad de producto en el carrito
    increaseItemCartCount: (req, res) => {
        try {
            // ID del producto
            const productId = parseInt(req.params.id)
            // Carrito del usuario
            const userCart = CartModel.getCartByUserId(req.user.id);

            // Obtener el status del producto en el carrito
            let productInCart = userCart.items.find(item => item.productId === productId)
            // Obtener la información del producto
            let productData = ProductModel.getProductById(productId)

            // Verificar si la cantidad no excede el stock
            if (productInCart.count == productData.stock){
                res.status(409).json({ error: 'El producto ya no tiene stock' });
            } else {
                // Incrementar en 1 la cantidad de producto en el carrito
                productInCart.count += 1
                productInCart.subtotal += productData.precio
                const total = userCart.items.reduce((acum, p) => acum + p.subtotal, 0);
                userCart.total = total

                // Recargar el carrito del usuario
                cartController.getCart(req, res)
            }
        } catch (error) {
            res.status(500).json({ error: 'No se pudo añadir el producto al carrito' });
        }
    },

    // Eliminar item del carrito
    removeItemFromCart: (req, res) => {
        // ID del producto
        const productId = parseInt(req.params.id)
        // Carrito del usuario 
        const userCart = CartModel.getCartByUserId(req.user.id);

        // Obtener el producto a eliminar
        let productInCart = userCart.items.find(item => item.productId === productId)
        // Condicional en caso de que no exista el producto
        if (!productInCart){
            res.status(404).json({ error: 'El producto no existe en el carrito' });
        }
        // Restar al total el subtotal del producto eliminado
        userCart.total -= productInCart.subtotal
        // Rehacer el arreglo de los productos del carrito del usuario sin el ítem eliminado
        userCart.items = userCart.items.filter(item => item.productId !== productId)
        // Recargar carrito
        cartController.getCart(req, res)
    },

    // Limpiar carrito
    clearCart: (req, res) => {
        // Carrito del usuario
        const userCart = CartModel.getCartByUserId(req.user.id);
        // Reiniciar atributos
        userCart.items = [],
        userCart.total = 0,
        // Recargar carrito
        cartController.getCart(req, res)
    },

    // Confirmar 'venta' de los productos en el carrito
    confirmCartPayment: (req, res) => {
        // Carrito del usuario
        const userCart = CartModel.getCartByUserId(req.user.id);
        // Obtener los ID de los productos en el carrito
        const cartProductIds = userCart.items.map(item => item.productId);

        // Obtener los productos en el carrito
        const productsInCart = ProductModel.loadProducts().filter(product => cartProductIds.includes(product.id))
        // Para cada producto en el carrito
        productsInCart.forEach(product => {
            // Obtener la información del item en el carrito
            const cartItem = userCart.items.find(cartProduct => cartProduct.productId === product.id);
            // Modificar el stock del producto
            product.stock -= cartItem.count
            // En caso de que el stock sea 0 ahora
            if (product.stock == 0){
                // Eliminar el producto de la BD
                ProductModel.deleteProductById(product.id)
            }
        });

        // Una vez confirmada la venta, se puede borrar el carrito del usuario
        cartController.clearCart(req, res)
    }
};

module.exports = cartController;
