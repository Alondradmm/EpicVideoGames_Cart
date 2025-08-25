// Modelo de usuario (simulado sin base de datos)
const users = [
    { id: 1, username: 'admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin'},
    { id: 2, username: 'cliente', email: 'cliente@gmail.com', password: 'cliente123', role: 'user'},
    { id: 3, username: 'Méndez Méndez Alondra Daniela', email: 'dalon0904@gmail.com', role: 'user'}
];

// Modelo de usuario
class UserModel {
    // Buscar usuario por credenciales
    static findByCredentials(username, password) {
        // Usuarios de prueba (en producción usar base de datos)
        // Buscar usuario que coincida
        return users.find(user => 
            user.username === username && 
            user.password === password
        );
    };

    // Buscar usuario por su email (para aquellos que se autentiquen con Google)
    static findByEmail(email) {
        return users.find(user => 
            user.email === email
        );
    };

    // Añadir nuevo usuario
    static addUserByEmail(username, email) {
        // Generar nuevo ID para el nuevo usuario
        const nuevoId=users.length>0?Math.max(...users.map(user=>user.id))+1:1;
        // Crear objeto de nuevo usuario
        const nuevoUser={
            id:nuevoId,
            username:username,
            email: email,
            role: 'user'
        };
        // Añadir usuario a la BD de usuarios
        users.push(nuevoUser)
        return nuevoUser
    };

    // Añadir nuevo usuario
    static createUser(username, password) {
        // Generar nuevo ID para el nuevo usuario
        const nuevoId=users.length>0?Math.max(...users.map(user=>user.id))+1:1;
        // Crear objeto de nuevo usuario
        const nuevoUser={
            id:nuevoId,
            username:username,
            password: password,
            role: 'user'
        };
        // Añadir usuario a la BD de usuarios
        users.push(nuevoUser)
        return nuevoUser
    };
}

module.exports = UserModel;