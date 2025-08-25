
// Abrir carrito
function openCart(){
    document.getElementById("cart-menu").classList.add('active');
}

// Cerrar carrito
function closeCart(){
    document.getElementById("cart-menu").classList.remove('active');
}

// Abrir formulario de Login
function openLoginModal(){
    document.getElementById("login-modal").style.display='flex'
}


const btnCart = document.getElementById('btnCart');
const cartContent = document.getElementById('cartContent');
const cartTotal = document.getElementById('cartTotal');
const cartOpt = document.getElementById('cartOpt');
// Función para cargar el carrito de usuario
btnCart.addEventListener('click', async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        openCart()
        cartContent.innerHTML = `<p>Inicia Sesión para añadir ítems al carrito</p>`
        return;
    }

    // Petición a la API /api/carrito enviando el token
    try {
        const response = await fetch('/api/carrito', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            //Actualizar vista del carrito
            updateCartView(data)
            cartTotal.style.display = 'block'
            cartOpt.style.display = 'flex'
            openCart()
        } else {
            // Mostrar mensaje de error en el carrito
            cartContent.innerHTML = `<p>${data.error}</p>`
            cartTotal.style.display = 'none'
            cartOpt.style.display = 'none'
            openCart()
        }
    } catch (error) {
        // Mostrar mensaje de error en el carrito
        openCart()
        cartContent.innerHTML = `<p>Error al cargar perfil</p>`
        cartTotal.style.display = 'none'
        cartOpt.style.display = 'none'
    }
});

// Función para añadir producto al carrito por su ID
async function addItemToCart(productId){
    const token = localStorage.getItem('jwtToken');
    // En caso de no enviar token, abrir el modal de login
    if (!token) {
        openLoginModal()
        return;
    }

    // Petición POST /api/carrito/add/:id
    const response = await fetch('/api/carrito/add/'+productId, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Actualizar vista de carrito
    const data = await response.json();
    if (response.ok) {
        updateCartView(data)
        console.log("Item agregado al carrito")
    } else {
        alert(data.error)
    }
}

// Aumentar la cantidad de producto en el carrito
async function increaseItemCartCount(productId){
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        openLoginModal()
        return;
    }

    // Petición PUT /api/carrito/update/:id
    const response = await fetch('/api/carrito/update/'+productId, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Actualizar vista de carrito
    const data = await response.json();
    if (response.ok) {
        updateCartView(data)
    } else {
        alert(data.error)
    }
}

// Eliminar item del carrito
async function removeItemFromCart(productId){
    const token = localStorage.getItem('jwtToken');
    // Petición DELETE /api/carrito/remove/:id
    const response = await fetch('/api/carrito/remove/'+productId, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Actualizar vista de carrito
    const data = await response.json();
    if (response.ok) {
        updateCartView(data)
    } else {
        alert(data.error)
    }
}

// Borrar carrito de usuario
async function clearCart(){
    const token = localStorage.getItem('jwtToken');
    // Petición DELETE /api/carrito/clear/
    const response = await fetch('/api/carrito/clear/', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Actualizar vista de carrito
    const data = await response.json();
    if (response.ok) {
        updateCartView(data)
    } else {
        alert(data.error)
    }
}

// Confirmar compra
async function confirmCartPayment(){
    const token = localStorage.getItem('jwtToken');

    // Petición PUT /api/carrito/confirm/
    const response = await fetch('/api/carrito/confirm/', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Recarga la página para actualizar la vista de los productos con su stock actualizado
    if (response.ok) {
        window.location.reload()
    }

}

//Actualizar vista del carrito (general)
function updateCartView(data){
    cartTotal.innerHTML = `Total: <span>$${data.cart.total}</span>`
    cartContent.innerHTML = `
        ${data.cart.items.map(item => 
            `
            <div class="cart-item">
                <a href="#" class="delete-btn" onclick="removeItemFromCart(${item.productId})"><i class='bx bx-x'></i></a>
                <img src="${item.productInfo.img}" class="card-img">
                <div class="cart-detail">
                    <div class="cart-info">
                        <p class="card-title">(${item.count}) ${item.productInfo.nombre}</p>
                        <p class="card-price">$${item.subtotal}</p>
                    </div>
                    <div class="cart-count">
                        <a href="#" class="cart-add" onclick="increaseItemCartCount(${item.productId})"><i class='bx bxs-plus-square'></i> </a>
                    </div>
                </div>
            </div>
            `
        ).join('')}
    `;
}