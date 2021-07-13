# sara-backend

API General que gestiona el proyecto sara y establece una comunicación con un microservicio con IA

## Información básica

Esta API es una de arquitectura RESTfull, hecha con Node.js y su objetivo principal es ser un canal de comunicación entre una aplicación web SPA y el microservicio que contiene un modelo de Deep Learning que es capaz de interpretar una pregunta sobre sun documento de tesis y brindar una respuesta.

## Entidades

Existen 3 entidades que son mapeadas en la Base de Datos (Proyecto, Usuario, Rol)

### Proyecto

Es la entidad que representa un proyecto de tesis que almacena documentos de tesis para que puedan ser analizados por un usuario con rol Profesor o Coordinador.
Sus atributos son: Codigo, Nombre y Documentos.

### User

Es la entidad que representa un usuario, almacena su nombre de usuario, contraseña, nombre real, roles y proyectos asignados.

### rol

Almacena el codigo y nombre de los roles existentes para la app

## Endpoints

El conjunto de rutas y la estructura del objeto JSON en caso sea requerido. NOTA: Todas las rutas comienzan con "host/api/". Para todas las peticiones es necesario estar autenticado, para ello es necesario que en cada petición se incluya un Header de tipo x-access-token que incluya el valor del Token generado cuando se incia sesión.

## Authenticación

Ruta "/auth"

### Login

POST "/login" JSON body: {usuario, password}

## Proyecto

Ruta "/proyecto"

### Obtener todos los proyectos

GET "/"
Permisos: Director, Coordinador

### Obtener proyecto por ID

GET "/:id"
Permisos: Director, Coordinador

### Agregar proyecto

POST "/" JSON body: {codigo, nombre}
Permisos: Director

### Modificar proyecto

PUT "/:id" JSON body: {codigo, nombre}
Permisos: Director

### Borrar proyecto

DELETE "/:id"
Permisos: Director

### Asignar documento

POST "/:id/doc" JSON body: {nombre, texto}
Permisos: Director, Profesor, Coordinador

### Borrar docuemnto

DELETE "/:id/doc"
Permisos: Director, Coordinador, Profesor

## Usuario

Ruta "/user"

### Obtener todos los usuarios

GET "/"
Permisos: Director

### Obtener usuario por id

GET "/:id"
Permisos: Director

### Agregar un usuario

POST "/" JSON body: {nombre, usuario, password, roles}
Permisos: Director

### Modificar un usuario

PUT "/" JSON body: {nombre, usuario,password, roles}
Permisos: Director

### Eliminar un usuario

DELETE "/:id"
Permisos: Director

## Analisis

Ruta "/analisis"

### Preguntar

POST "/" JSON body: {pregunta}
