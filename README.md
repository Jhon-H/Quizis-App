# Quizis

App que permite crear preguntas con respuestas de opción múltiple, recuperar preguntas de forma aleatoria o por categorías y validar la respuesta de cada pregunta.

## Iniciar

1. Crear archivo .env basado en .env.template
2. Agregar valores a las variables de entorno
3. Instalar las dependencias `yarn`
4. Levantar la base de datos con docker `docker compose up -d`
5. Ejecutar proyecto `yarn run build`

## TODO

- 💯 Crear documentación con swagger
- 💯 Crear Question, Answer y User Entity
- 💯 Crear Dtos
- 💯 Agregar Repository pattern 
- 💯 Crear estrategia de errores
- 💯 Crear servicios
- 💯 Agregar Criteria/Especification pattern para los filtros
- 👍 Investigar sobre buenas practicas de paginaciones
- 👍 Investigar sobre estrategias para definir una estructura de respuestas
- 💯 Desarrollar controlador para editar preguntas y retornar todas las respuestas de forma paginada
- 🥷 Agregar filtro de preguntas por categoria.
- 🥷 Agregar preguntas con IA (indicar la categoria y una descripción, y usar openIA para generar la pregunta)
- 🧑‍💻 "Investigar": Cómo identificar que ids en Mongo no tiene relación y automatizar su elimincación
