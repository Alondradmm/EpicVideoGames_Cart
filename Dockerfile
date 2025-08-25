# Versión del entorno de Node
FROM node:22 
# Nombre del directorio donde se 
# crearán los archivos de código
WORKDIR /usr/src/app
# Se copia el archivo de dependencias
# node_modules
COPY package*.json ./
# Instalación de las dependencias
RUN npm install
# Copia los archivos locales
COPY . .
# Configura el puerto de ejecución
EXPOSE 3000
# Comando que inicializa la aplicación
CMD ["node", "server.js"]
