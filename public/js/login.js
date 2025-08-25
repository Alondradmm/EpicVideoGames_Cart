const errorMessage = document.getElementById('errorMessage');
// Abrir modal de Login
function openLoginModal(){
    document.getElementById("login-modal").style.display='flex'
}

// Cerrar modal de Login
function closeLoginModal(){
    document.getElementById("login-modal").style.display='none'
    errorMessage.textContent = ''
}

// Cerrar sesión (borrar token del localStorage)
function logOut(){
    localStorage.clear()
}

const btnLogin = document.getElementById('btnLogin');
// Función para la petición de Login
btnLogin.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Guardar token en localStorage
            localStorage.setItem('jwtToken', data.token);
            closeLoginModal()
            window.location.reload()
        } else {
            errorMessage.textContent = 'Error en credenciales'
        }
    } catch (error) {
        errorMessage.textContent = 'Error en credenciales'
    }
});


// Login con Google
const urlParams = new URLSearchParams(window.location.search);
// Token recibido tras el callback de Google
const token = urlParams.get('token');
const error = urlParams.get('error');

// Guarda el token recibido y recarga la página para no mostrarlo en la URL
if (token) {
    localStorage.setItem("jwtToken", token);
    window.location.href = "/";
}

if (error) {
    alert(error);
    window.location.href = "/";
}