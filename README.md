# Aplicación 🛒 Carrito de Compra de Videojuegos 🎮
### **Alumna:** Méndez Méndez Alondra Daniela IDSM31
Aplicación de ventas de videojuegos con diferentes rutas
- Ruta incial / - Carga de productos
- /api/carrito - Carga de carrito
- /api/carrito/add/:id - Añadir producto al carrito
- /api/carrito/update/:id - Aumentar la cantidad del producto en el carrito
- /api/carrito/remove/:id - Eliminar producto del carrito
- /api/carrito/clear - Eliminar todos los productos del carrito
- /api/carrito/confirm - Realiza la venta de los productos y modifica el stock

## Enlazado con Docker 🐋

**Dockerfile:** Incluye la configuración de la aplicación corriendo en el puerto 3000

**docker-compose.yml:** Configuración del servicio y archivo de variables de entorno

**.env.example:** Variables de entorno de la aplicación, clave secreta para generar los JWT y credenciales para acceso a la API de Google con oAuth2.0

