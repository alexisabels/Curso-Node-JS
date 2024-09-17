const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()
app.disable('x-powered-by')

// este middleware afecta a todas las acciones
// en todas las rutas
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   // AQUÍ solo llegan request que son POST y que tienen el header Content-Type application/json
//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)

//     data.timestamp = Date.now()
//     // no vamos a responder sino mutar la request y meter la info en req.body
//     req.body = data
//     next()
//   })
// })
// PERO hay una forma más facil:
app.use(express.json())

const PORT = process.env.PORT ?? 1234

app.get('/pokemon', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body) // la logica de aquí la hemos extraído a un middleware (arriba)
  // para poder reutilizarlo en cualquier sitio
})

// use: para todas las acciones (post, get...)
app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening con port http://localhost:${PORT}`)
})
