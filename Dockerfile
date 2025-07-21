#Imagen base
FROM node:18

#Creamos el directorio de trabajo en el contenedor
WORKDIR /app

#Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

#Instalamos las dependencias
RUN npm install

#Copiamos el resto de los archivos del proyecto
COPY . .

#Exponemos el puerto que usa nuestra API
EXPOSE 3000

#Comando para ejecutar nuestra aplicacion
CMD [ "npm", "start" ]