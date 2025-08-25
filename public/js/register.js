const errorMessageRegister = document.getElementById('errorMessageRegister');
const loginMessage = document.getElementById('errorMessage');
// Abrir modal de Registro
function openRegisterModal(){
    document.getElementById("login-modal").style.display='none'
    document.getElementById("register-modal").style.display='flex'
}

// Cerrar modal de Registro
function closeRegisterModal(){
    document.getElementById("register-modal").style.display='none'
    errorMessageRegister.textContent = ''
}

const btnRegister = document.getElementById('btnRegister');
// Función para la petición de Login
btnRegister.addEventListener('click', async () => {
    const username = document.getElementById('reg_username').value;
    const password = document.getElementById('reg_password').value;
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById("login-modal").style.display='flex'
            document.getElementById("register-modal").style.display='none'
            loginMessage.style.color = "#FFFFFF"
            loginMessage.textContent = data.message          
        } else {
            errorMessageRegister.textContent = data.error
        }
    } catch (error) {
        errorMessageRegister.textContent = 'Error en credenciales'
    }
});