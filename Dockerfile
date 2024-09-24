# Fase 1: Build del frontend de Angular
FROM node:18 AS build-frontend
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build --prod

# Fase 2: Configuración del backend con TypeScript
FROM node:18
WORKDIR /app

# Copiamos el frontend build al contenedor backend
COPY --from=build-frontend /app/frontend/dist/frontend ./public

# Copiamos y configuramos el backend
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend ./

# Compilamos el backend TypeScript
RUN npm run build --prefix backend

# Exponer el puerto del backend
EXPOSE 3000

# Comando para iniciar el backend compilado
CMD ["npm", "run", "start:prod", "--prefix", "backend"]