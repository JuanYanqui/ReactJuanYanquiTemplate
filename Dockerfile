# Usa una imagen base de Node.js para construir ambas partes
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala las dependencias del servidor CORS Anywhere
COPY cors-anywhere-master/package*.json cors-anywhere-master/
RUN cd cors-anywhere-master && npm install

# Instala las dependencias de la aplicación React
COPY react-app/package*.json react-app/
RUN cd react-app && npm install

# Copia el resto de los archivos de tu servidor CORS Anywhere y la aplicación React
COPY . .

# Expón los puertos de ambas partes
EXPOSE 3000

# Comando para iniciar tanto el servidor CORS Anywhere como la aplicación React
CMD ["bash", "-c", "cd cors-anywhere-master && node server.js & cd react-app && npm start"]

# Definición de scripts en package.json