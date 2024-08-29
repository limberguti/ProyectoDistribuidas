# Etapa 1: Instalación de dependencias
FROM node:18.20.4-alpine3.19 as dev-deps
WORKDIR /frontend

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --force

# Etapa 2: Instalación de Angular CLI y construcción de la aplicación
FROM node:18.20.4-alpine3.19 as builder
WORKDIR /frontend

COPY --from=dev-deps /frontend/node_modules ./node_modules
COPY . .

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Construir la aplicación
#RUN ng build

# Exponer el puerto 4200 para ng serve
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]

