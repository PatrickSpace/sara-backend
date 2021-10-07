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
### Login

**Usan la ruta `/api/auth`**

| Nombre | Metodo | Endpoint | Body | Permisos |
|---|---|---|---|---|
| Login | POST | /auth/login | JSON {usuario, password} | Profesor,Coordinador, Director |

## Proyecto

**Usa la ruta `/api/proyecto`**

| Nombre | Metodo | Endpoint | Body | Permisos |
|---|---|---|---|---|
| Obtener todos los proyectos | GET | / | none | Coordinador, Director |
| Obtener proyecto por id | GET | /:id | none | Coordinador, Director |
| Obtener proyectos no asignados | GET | /free | none | Coordinador, Director |
| Agregar Proyecto | POST | / | JSON {codigo,nombre} | Director |
| Asignar documento | POST | /upload/:pid | FORM-DATA [document:file] | Profesor, Coordinador, Director |
| Modificar Proyecto | PUT | /:id | JSON {codigo,nombre} | Director |
| Borrar Proyecto | DELETE | /:id | none | Director |
| Borrar documento | DELETE | /doc/:pid/:did | none | Profesor, Coordinador, Director |

## Usuario

**Usa la ruta `/api/user`**

| Nombre | Metodo | Endpoint | Body | Permisos |
|---|---|---|---|---|
| Obtener todos los usuarios | GET | / | none | Director |
| Obtener todos los Profesores | GET | /profesores | none | Director |
| Obtener todos los Coordinadores | GET | /coordinadores | none | Director |
| Obtener todos los Directores | GET | /directores | none | Director |
| Obtener usuario por id | GET | /:id | none | Director |
| Agregar un Usuario | POST | / | JSON {nombre,usuario,password,roles} | Director |
| Modificar Usuario | PUT | /:id | JSON {nombre,usuario,roles} | Director |
| Asignar Proyecto a un Usuario | PUT | /asignar/:userid | JSON {id:[userid,...]} | Director |
| Borrar Usuario | DELETE | /:id | none | Director |

## Analisis

**Usa la ruta `/api/analisis`**

| Nombre | Metodo | Endpoint | Body | Permisos |
|---|---|---|---|---|
| Realizar Pregunta | POST | /:docid | JSON {Pregunta} | Profesor, Coordinador, Director |
